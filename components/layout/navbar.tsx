"use client";

import { Button } from "../ui/button";
import { Hexagon } from "lucide-react";
import NavigationSheet from "./navigation-sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModeSwitch from "./ModeSwitch";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-8">
          <Hexagon />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/assignment-1">
            <Button
              className="hidden md:inline-flex"
              variant={
                pathname.includes("/assignment-1") ? "default" : "outline"
              }
            >
              Assignment-1
            </Button>
          </Link>
          <Link href="/assignment-2">
            <Button
              className="hidden md:inline-flex"
              variant={
                pathname.includes("/assignment-2") ? "default" : "outline"
              }
            >
              Assignment-2
            </Button>
          </Link>
          <ModeSwitch />
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
