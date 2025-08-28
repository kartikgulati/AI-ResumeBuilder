"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import personWithDesk from "@/assets/person-w-desk.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main
        className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 py-12 text-gray-900 text-center md:text-start md:flex-row lg:gap-12"
      >
        {/* Animated Background */}
        <div className="bg bg1"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <div className="max-w-prose space-y-3 z-10">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl scroll-m-20 text-white">
            Create a{" "}
            <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI Resume
            </span>{" "}
            in seconds
          </h1>
          <p className="text-lg text-white ">
            Generate{" "}
            <span className="font-bold text-white">professional resumes with AI</span> in
            seconds. Save time and effort by automating the process of creating
            resumes.
          </p>
          <Button variant={"secondary"} asChild size="lg" className=" mt-4 md:ms-0">
            <Link href="/resumes">Get Started</Link>
          </Button>
        </div>

        <Image
          src={personWithDesk}
          alt="preview image"
          width={600}
          className=""
        />
      </main>

      {/* ✅ Inline CSS for animation */}
      <style jsx global>{`
        .bg {
          animation: slide 3s ease-in-out infinite alternate;
          background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
          bottom: 0;
          left: -50%;
          opacity: 0.5;
          position: fixed;
          right: -50%;
          top: 0;
          z-index: -1;
        }

        .bg2 {
          animation-direction: alternate-reverse;
          animation-duration: 4s;
        }

        .bg3 {
          animation-duration: 5s;
        }

        @keyframes slide {
          0% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(25%);
          }
        }
      `}</style>
    </>
  );
}