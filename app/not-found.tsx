import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rabbit } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[67vh] flex items-center justify-center bg-muted/40 p-6">
      <Card className="max-w-md w-full text-center shadow-lg border border-border/50">
        <CardHeader className=" flex flex-col justify-center items-center">
            {/* <Rabbit className="size-60"/> */}
            <Rabbit size={240} strokeWidth={5} absoluteStrokeWidth />
          <CardTitle className="text-4xl font-bold text-primary">404</CardTitle>
          <p className="text-muted-foreground mt-2">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-sm text-muted-foreground">
            It might have been moved or deleted.
          </p>
          <Button asChild size="lg" className="w-full">
            <Link href="/">🏠 Go Back Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
