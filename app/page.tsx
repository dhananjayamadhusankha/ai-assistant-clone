import { SettingsIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
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
    </main>
  );
}
