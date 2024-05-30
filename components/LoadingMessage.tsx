"use client";

import { useFormStatus } from "react-dom";
import { BeatLoader } from "react-spinners";

function LoadingMessage() {
  const { pending } = useFormStatus();
  return (
    pending && (
      <div className="text-center">
        <BeatLoader color="white" />
      </div>
    )
  );
}

export default LoadingMessage;
