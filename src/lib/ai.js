import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

/**
 * Extract data from a single image file.
 * @param {File} file - Image file.
 * @returns {Promise<Object>} Extracted JSON data.
 */
export async function extractData(file) {
  if (!file) throw new Error("No file provided.");

  try {
    // Upload single image to Gemini
    const uploaded = await ai.files.upload({
      file,
      displayName: file.name,
    });

    const fileUri = uploaded.uri || (uploaded.file && uploaded.file.uri);
    if (!fileUri) throw new Error("File upload failed — no URI returned.");

    // Generate structured data from the uploaded image
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: "Extract attendance data from this time card image." },
            { fileData: { mimeType: file.type, fileUri } },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        systemInstruction: `
You are an OCR and data extraction assistant.

Extract information from the provided image of a time card or attendance record.
Return the output strictly in valid JSON format with the following structure:

{
  "employee_information": {
    "employee_number": "",
    "name": "",
    "department": "",
    "payroll_type": "",
    "period": ""
  },
  "attendance_records": [
    {
      "date": "",
      "morning_in": "",
      "morning_out": "",
      "afternoon_in": "",
      "afternoon_out": "",
      "overtime_in": "",
      "overtime_out": "",
      "total_hours" ** calculate total hours **
    }
  ],
  "overall_total_hours": ** calculate the overall total hours **
}

Rules:
- Do NOT include any entries that have completely empty time fields.
- Time values must be in valid HH:MM 24-hour format.
- Keep JSON clean and properly formatted (no markdown, no explanations).
- Preserve exact text values from the image.
- All missing values should be empty strings.
- Output must be valid JSON only.
`,
      },
    });

    let parsed;
    try {
      parsed = JSON.parse(response.text);

      console.log(parsed);
    } catch {
      throw new Error("Model returned invalid JSON.");
    }

    return {
      fileName: file.name,
      data: parsed,
    };
  } catch (err) {
    return {
      fileName: file.name,
      error: err.message,
    };
  }
}
