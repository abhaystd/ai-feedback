# 🎷 AI Call Feedback Form

An AI-powered web app that evaluates audio calls by transcribing them using **AssemblyAI** and analyzing the content using **OpenRouter (LLM)**. Users can upload `.mp3` or `.wav` files to receive structured feedback and quality scores for customer service evaluation.

## 🚀 Features

* 🎤 Upload `.mp3` or `.wav` audio files
* ✨ Transcribe calls using AssemblyAI
* 🧠 Analyze transcripts using OpenRouter-compatible models (like GPT-3.5)
* 📊 Score 10 evaluation parameters with feedback and observations
* 🛠 Built with Next.js 14, TypeScript, TailwindCSS

## 🧹 Tech Stack

* **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS
* **api**: AssemblyAI SDK, OpenRouter API
* **AI Services**:

  * AssemblyAI for transcription
  * OpenRouter for evaluation with LLM

## 📁 Project Structure

```
/app
  /api/analyze-call       # API route for processing files
  /page.tsx               # Main page with Upload UI

/components
  /UploadSection.tsx      # File upload and feedback display

/lib
  /evaluationParamsPrompt.ts # Prompt used to guide LLM output
```

## 🔐 Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_ASSEMBLYAI_API_KEY=your_assemblyai_public_key
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key
```

## 🛠 Installation & Running

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Visit
http://localhost:3000
```

## 🧪 Evaluation Criteria (Scored)

Each audio is evaluated on:

| Parameter           | Weight | Type       |
| ------------------- | ------ | ---------- |
| Greeting            | 5      | PASS\_FAIL |
| Collection Urgency  | 15     | SCORE      |
| Rebuttal Handling   | 15     | SCORE      |
| Call Etiquette      | 15     | SCORE      |
| Call Disclaimer     | 5      | PASS\_FAIL |
| Correct Disposition | 10     | PASS\_FAIL |
| Call Closing        | 5      | PASS\_FAIL |
| Identification      | 5      | PASS\_FAIL |
| Tape Disclosure     | 10     | PASS\_FAIL |
| Tone & Language     | 15     | PASS\_FAIL |

## 📦 API Reference

* `POST /api/analyze-call`
  Accepts: FormData with audio file
  Returns: JSON with `scores`, `overallFeedback`, `observation`

## ✅ To Do

* Add speaker labels
* Support more audio formats
* Use alternative free LLMs if OpenRouter fails


Made with ❤️ by AB.

