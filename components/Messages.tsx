import { Message } from "@/app/page";
import { ChevronDownCircle } from "lucide-react";
import LoadingMessage from "./LoadingMessage";

type Props = {
  messages: Message[];
};

function Messages({ messages }: Props) {
  return (
    <div
      className={`flex flex-col min-h-screen p-5 pt-20 ${
        messages.length > 0 ? "pb-96" : "pb-52"
      }`}
    >
      <LoadingMessage />
      {!messages.length && (
        <div className="flex flex-col flex-1 justify-end items-center text-gray-500 space-y-10">
          <p className=" animate-pulse">Start a Convercation</p>
          <ChevronDownCircle size={64} className="animate-bounce" />
        </div>
      )}

      <div className="p-5 space-y-5">
        {messages.map((message) => (
          <div key={message.id} className=" space-y-5">
            {/* sender */}
            <div className="pl-10 md:pl-40">
              <p className="message text-left rounded-xl ml-auto rounded-br-none shadow-sm">
                {message.sender}
              </p>
            </div>
            {/* reciever */}
            <div className="pr-10 md:pr-40">
              <p className="message bg-gray-800 rounded-xl rounded-bl-none shadow-sm">
                {message.response}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
