import Messages from "@/components/Messages";
import { SettingsIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
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

      <form className="flex flex-col bg-black">
        {/* Messages */}
        <div className="flex-1 bg-gradient-to-b from-purple-500 to-black">
          <Messages />
        </div>

         {/* hidden fields */}
         <input type="file" />

         <div className="fixed bottom-0 w-full bg-black overflow-hidden text-white rounded-t-3xl">
          {/* recorder */}
          {/* Voice sysnthesis - output of the assistent voice */}
         </div>
      </form>
    </main>
  );
}
