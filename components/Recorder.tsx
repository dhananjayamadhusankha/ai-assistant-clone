"use client";

import activeAssistantIcon from "@/img/active.gif";
import notActiveAssistantIcon from "@/img/notactive.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

export const mimeType = "audio/webm";

function Recorder({ uploadAudio }: { uploadAudio: (blob: Blob) => void }) {
  const { pending } = useFormStatus();
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

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

  const startRecording = async () => {
    if (stream === null) return;

    if (pending) return;
    setRecordingStatus("recording");

    // create new media recorder instance using the stream
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;

      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = async () => {
    if (mediaRecorder.current === null || pending) return;

    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      uploadAudio(audioBlob);
      setAudioChunks([]);
    };
  };

  return (
    <div className="flex items-center text-white justify-center">
      {!permission && (
        <button onClick={getMicrophonePermission}>Get Permission</button>
      )}

      {pending && (
        <Image
          src={activeAssistantIcon}
          alt="Recording"
          priority
          className="assistant grayscale"
        />
      )}

      {permission && recordingStatus === "inactive" && !pending && (
        <Image
          src={notActiveAssistantIcon}
          alt="Not Recording"
          priority={true}
          onClick={startRecording}
          className="assistant cursor-pointer hover:scale-110 transition-all duration-150 ease-in-out"
        />
      )}

      {recordingStatus === "recording" && (
        <Image
          src={activeAssistantIcon}
          alt="Recording"
          priority={true}
          onClick={stopRecording}
          className="assistant cursor-pointer hover:scale-110 transition-all duration-150 ease-in-out"
        />
      )}
    </div>
  );
}

export default Recorder;
