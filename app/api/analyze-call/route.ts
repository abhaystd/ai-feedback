import { NextRequest, NextResponse } from "next/server";
import { evaluationParamsPrompt } from "@/lib/evaluationParamsPrompt";
import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  console.log(
    "[INFO] AssemblyAI client initialized",
    process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY
  );
  try {
    console.log("[INFO] Receiving request...");
    const formData = await req.formData();
    const file = formData.get("file") as Blob;
    const buffer = Buffer.from(await file.arrayBuffer());

    console.log("[INFO] Uploading to AssemblyAI...");
    const uploadRes = await client.files.upload(buffer);
    console.log("[INFO] Upload complete:", uploadRes);

    // const audioUrl = uploadRes.upload_url;
    // console.log('[INFO] Audio URL:', audioUrl);

    // const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

    console.log("[INFO] Transcribing...");
    const transcript = await client.transcripts.transcribe({
      audio: uploadRes,
      speech_model: "universal",
    });
    console.log("transcript", transcript);

    console.log("[INFO] Transcription complete. Sending to OpenRouter...");
    const prompt = `You are a JSON generator. Return only JSON.\n\nTranscript: ${transcript.text}\n\nEvaluate:\n${evaluationParamsPrompt}`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const result = await response.json();
    console.log("[INFO] OpenRouter response:", result);

    const text = result?.choices?.[0]?.message?.content || "";
    if (!text) {
      console.error("[ERROR] No content in OpenRouter response");
      return NextResponse.json(
        { error: "No content in OpenRouter response" },
        { status: 500 }
      );
    }

    let feedback;
    try {
      const jsonText = text.includes("```json")
        ? text.split("```json")[1]?.split("```")[0]?.trim()
        : text.trim();

      // Remove JS-style comments before parsing
      const cleanedJson = jsonText.replace(/\/\/.*$/gm, "");
      feedback = JSON.parse(cleanedJson);
    } catch (parseErr) {
      console.warn("[WARN] Failed to parse LLM output:", text);
      feedback = { scores: {}, overallFeedback: "", observation: "" };
    }

    console.log("[INFO] Feedback received from OpenRouter");
    console.log("[INFO] Feedback:", feedback);
    return NextResponse.json(feedback);
  } catch (err: any) {
    console.error("[ERROR]", err.message);
    return NextResponse.json(
      { error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
