# 🌟 AccessMate AI

### Understand documents in your own language with AI

AccessMate AI is an AI-powered accessibility assistant that helps people understand notices, forms, signs, menus, and other documents easily. It uses artificial intelligence to simplify complex information, translate explanations into regional languages, and make important instructions easier to understand.

## 🎯 Problem Statement

Many people struggle to understand official documents because of complex language, difficult terminology, or language barriers. Important instructions, deadlines, and warnings can be missed.

## 💡 Our Solution

AccessMate AI allows users to upload an image of a document and receive a simple, easy-to-understand explanation in their preferred language.

## ✨ Key Features

- 📸 **Image Upload:** Upload document images in JPG, PNG, or WebP format.
- 🤖 **AI Document Analysis:** Analyze documents using Gemma 3 4B.
- 📝 **Simple Summaries:** Convert complex information into easy-to-understand language.
- 🌐 **Multilingual Support:** Support for 15 languages, including English, Kannada, Hindi, Tamil, Telugu, Malayalam, Bengali, Marathi, Gujarati, Punjabi, Odia, Urdu, Assamese, Nepali, and Sanskrit.
- 📌 **Important Information Extraction:** Identify instructions, dates, times, locations, warnings, and next steps.
- 🔊 **Audio Assistance:** Listen to explanations using browser text-to-speech when a suitable language voice is available.
- ⏰ **Reminder Creation:** Create reminders for important tasks after user confirmation.

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Frontend | React.js, Vite, CSS |
| Backend | Python, FastAPI |
| AI Model | Gemma 3 4B |
| AI Runtime | Ollama |
| API Communication | REST API |
| Audio | Browser Text-to-Speech |
| Language Support | Translation API |

## 🏗️ Project Architecture

1. The user selects a preferred language.
2. The user uploads an image of a document.
3. The React frontend sends the image to the FastAPI backend.
4. The backend uses Gemma 3 4B through Ollama to analyze the document.
5. The extracted information is translated into the selected language.
6. The frontend displays the explanation and offers audio assistance.
7. The user can create a reminder after confirming the details.

## 📂 Project Structure

```text
accessmate-ai/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── ai/
│   │   └── tools/
│   ├── .venv/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── index.html
├── .gitignore
└── README.md
```

*Note: The structure above is illustrative. Your actual folders and files may differ.*

## 🚀 Getting Started

### Prerequisites

Install the following:

- Python 3.11 or later
- Node.js and npm
- Git
- Ollama

### 1. Clone the Repository

```bash
git clone https://github.com/shrinidhi13-ai/hackerfest-accessmate-AI.git
cd hackerfest-accessmate-AI
```

### 2. Set Up the AI Model

Install Ollama from [https://ollama.com](https://ollama.com).

Download the model:

```bash
ollama pull gemma3:4b
```

Make sure Ollama is running before using AI analysis.

### 3. Set Up the Backend

Open a terminal in the project folder:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Start the backend:

```powershell
python -m uvicorn app.main:app --reload --port 8000
```

Backend health check:

[http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

API documentation:

[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### 4. Set Up the Frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

[http://localhost:5173](http://localhost:5173)

## 🔐 Security Notes

- Never upload API keys, passwords, or private credentials to GitHub.
- Keep secret configuration in a local `.env` file.
- Add `.env` and `.venv/` to `.gitignore`.
- Do not commit personal documents containing sensitive information.

## ⚠️ Current Limitations

- AI-generated summaries and extracted details may contain mistakes. Always verify important information against the original document.
- Translation quality and availability vary by language.
- Audio playback depends on the voices supported by the user's browser and operating system.
- Reminders are currently stored in backend memory and do not yet provide persistent storage or actual notifications.
- The application currently runs locally and requires setup of the frontend, backend, and AI model.

## 🔮 Future Enhancements

- Improve translation accuracy across all supported languages.
- Add more regional-language voices and accessible audio controls.
- Implement persistent reminders and notifications.
- Add OCR and document preprocessing improvements.
- Deploy the application online for broader access.
- Improve keyboard navigation and screen-reader compatibility.

## ❤️ Our Mission

Our mission is to make essential information easier to access and understand, regardless of language or reading ability.

**AccessMate AI — Making information accessible to everyone.**
