"use client";

import activeAssistantIcon from "@/img/active.gif";
import notActiveAssistantIcon from "@/img/notactive.png";
import Image from "next/image";
import { useEffect, useState } from "react";

function Recorder({ uploadAudio }: { uploadAudio: (blob: Blob) => void }) {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    getMicrophonePermission();
  }, []);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (error) {
        console.log(
          "The MediaRecorder API is not supported in your browser. >>> ",
          error
        );
      }
    }
  };
  return (
    <div className="flex items-center text-white justify-center">
      <Image
        src={activeAssistantIcon}
        width={350}
        height={350}
        alt="Recording"
        priority
      />
    </div>
  );
}

export default Recorder;
