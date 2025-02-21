"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import {dark} from "@clerk/themes";
import {useTheme } from "next-themes"; 



export default function Navbar() {
    const {theme} = useTheme();

  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-10 p-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full"
          />

          <span className="text-2xl font-bold tracking-tight">
            AI Resume Builder
          </span>
        </Link>
        <div className="flex items-center gap-3">
        <ThemeToggle />
        <UserButton
         
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
            elements: {
              
              signOut: true,
              avatarBox: {
                width: 35,
                height: 35,
                borderRadius: "full",
              },
            },
          }}
        >

            <UserButton.MenuItems>
                <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard className="size-5" />}
                href="/billing"
                />
            </UserButton.MenuItems>
        </UserButton>
        </div>
        </div>
    </header>
  );
}
