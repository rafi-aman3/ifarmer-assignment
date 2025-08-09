import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Products
        </h1>
        <p className="text-muted-foreground">Manage your product catalog</p>
      </div>
      <Link href={"/assignment-2/create"}>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </Link>
    </div>
  );
};

export default Header;
