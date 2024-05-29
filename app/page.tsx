"use client";

import transcript from "@/actions/transcript";
import Messages from "@/components/Messages";
import Recorder, { mimeType } from "@/components/Recorder";
import { SettingsIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
  sender: "",
  response: "",
  id: "",
};

export type Message = {
  sender: string;
  response: string;
  id: string;
};

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const [state, formAction] = useFormState(transcript, initialState);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (state.response && state.sender) {
      setMessages((messages) => [
        {
          sender: state.sender || "",
          response: state.response || "",
          id: state.id || "",
        },
        ...messages,
      ]);
    }
  }, [state]);

  console.log("messages >>>", messages)

  const uploadAudio = (blob: Blob) => {
    const file = new File([blob], "audio/webm", { type: mimeType });

    // set the file as the value of the hidden file input field
    if (inputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      inputRef.current.files = dataTransfer.files;
    }

    // simulate a click & submit the form
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };
  return (
    <main className="bg-purple-500 h-screen overflow-y-auto">
      {/* header */}
      <header className="flex justify-between fixed top-0 text-white w-full p-5">
        <Image
          src="https://i.imgur.com/MCHWJZS.png"
          width={50}
          height={50}
          alt="logo"
          className="object-contain"
        />

        <SettingsIcon
          size={40}
          className="rounded-full cursor-pointer bg-purple-600 p-2 text-black transition-all ease-in-out duration-150 hover:bg-purple-700 hover:text-white"
        />
      </header>

      {/* form */}

      <form action={formAction} className="flex flex-col bg-black">
        {/* Messages */}
        <div className="flex-1 bg-gradient-to-b from-purple-500 to-black">
          <Messages messages={messages} />
        </div>

        {/* hidden fields */}
        <input type="file" name="audio" hidden ref={inputRef} />
        <button type="submit" hidden ref={submitButtonRef} />

        <div className="fixed bottom-0 w-full bg-black overflow-hidden text-white rounded-t-3xl">
          {/* recorder */}
          <Recorder uploadAudio={uploadAudio} />

          <div>{/* Voice sysnthesis - output of the assistent voice */}</div>
        </div>
      </form>
    </main>
  );
}
