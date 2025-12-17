# React AI OCR

This project demonstrates how to build a web application that uses AI for Optical Character Recognition (OCR). The application allows users to upload images, extracts text from them using a powerful AI model, and displays the results in a user-friendly interface built with React and styled with Tailwind CSS.

## How it Works

The core of this project is the interaction between the React frontend and an AI model that performs OCR. Here's a breakdown of the process:

### 1. Image Upload and Processing

- The user selects one or more images through the web interface.
- The React application iterates through the selected images and sends them one by one to the AI for processing.

### 2. AI-Powered OCR with Prompt Engineering

Instead of relying on traditional OCR libraries, we leverage a large language model with multimodal capabilities. This approach allows for more flexible and powerful text extraction.

- **System Instructions:** The AI is given a specific set of instructions to guide its behavior. This includes telling it to act as an OCR engine and to extract any and all text it sees in the image.

- **Prompt Engineering:** For each image, a carefully crafted prompt is sent to the AI. The prompt contains the image and a clear instruction, such as "Extract the text from this image."

- **Structured Output:** To ensure the AI's response is consistent and easy to parse, we instruct it to provide the extracted text in a specific format (e.g., a JSON object with a "text" field). This is a key technique in prompt engineering that makes the AI's output predictable and reliable.

### 3. Displaying the Results

- The React application receives the structured output from the AI.
- It then parses the response to get the extracted text.
- The text is displayed to the user in a clean and readable format, with the UI styled using Tailwind CSS for a modern look and feel.

## Key Technologies

- **Frontend:**
  - **React:** A JavaScript library for building user interfaces.
  - **JavaScript (JSX):** Used to write the React components.
  - **Tailwind CSS:** A utility-first CSS framework for rapid UI development.

- **Backend (AI):**
  - Google Gemini 2.5 Flash model

## Getting Started

To run this project locally, you will need to have Node.js and npm installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/react-ai-ocr.git
    cd react-ai-ocr
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    - Create a `.env` file in the root of the project.
    - Add your AI API key to the `.env` file:
      ```
      VITE_API_KEY=your_api_key_here
      ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`.