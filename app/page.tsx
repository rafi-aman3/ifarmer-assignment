"use client";
import { Button } from "@/components/ui/button";
import { increment } from "@/store/counterSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {count}
      <Button onClick={() => dispatch(increment())}>Click me</Button>
    </div>
  );
}
