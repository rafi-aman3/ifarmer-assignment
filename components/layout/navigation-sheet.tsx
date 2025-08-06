import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Hexagon, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader className=" flex flex-row">
          <Hexagon />
          <SheetTitle>iFarmer Assignments</SheetTitle>
        </SheetHeader>
        <div className="px-4 flex flex-col space-y-3">
          <Link
            href="/assignment1"
            className={cn(
              "px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors text-sm font-medium"
            )}
          >
            Assignment 1
          </Link>
          <Link
            href="/assignment2"
            className={cn(
              "px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors text-sm font-medium"
            )}
          >
            Assignment 2
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationSheet;
