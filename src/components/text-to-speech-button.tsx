"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  text: string;
};

export default function TextToSpeechButton({ text }: Props) {
  const [speaking, setSpeaking] = useState(false);

  const speakText = () => {
    if (!window.speechSynthesis) {
      toast.error("Sorry, your browser does not support text-to-speech.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice =
      speechSynthesis.getVoices().find((v) => v.lang.startsWith("en")) || null;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="my-6">
      <button
        onClick={speakText}
        disabled={speaking}
        className={`bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-600 transition ${
          speaking ? "hidden" : "block"
        }`}
      >
        🎧 Listen to this blog
      </button>
      {speaking && (
        <button
          onClick={stopSpeaking}
          className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          🎧 Stop to listen
        </button>
      )}
    </div>
  );
}
