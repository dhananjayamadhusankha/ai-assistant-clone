"use client";

import { useFormStatus } from "react-dom";
import { BeatLoader } from "react-spinners";

function LoadingMessage() {
  const { pending } = useFormStatus();
  return (
    pending && (
      <div className="text-center">
        <BeatLoader />
      </div>
    )
  );
}

export default LoadingMessage;
