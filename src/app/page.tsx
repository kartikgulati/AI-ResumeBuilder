
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flrex-col items-center justify-center gap-6 bg-gray-100 px-5 py12 text-gray-900 text-center md:text-start md:flrxrow
     lg:gap-12">
      <div className="max-w-prose space-y-3">
        
        {/* <Image
          src={logo}
          alt="Logo"
          width={150}
          height = {150}
          className="mx-auto md:ms-0"
          

        /> */}
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl scroll-m-20">
          Create a{" "}
          <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent" >AI Resume</span> in seconds
        </h1>
        <p className="text-lg text-gray-500">
          Generate <span className="font-bold">professional resumes with AI</span> in seconds. Save time and effort by automating the process of creating resumes.
        </p>
        <Button asChild size="lg" className=" mt-4 md:ms-0">
          <Link href="/resumes">Get Started
          </Link></Button>
      </div>
      {/* <div>
        <Image
        src={}
        alt="preview image"
        width={600}
        className="shadow-md lg:rotate-[1.5deg]"></Image>
      </div> */}
     </main>
  );
}
