import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationButtonsProps {
    handlePreviousButton: () =>  void,
    handleNextButton: () =>  void,
    disableNextButton: boolean,
    page: number,
}

const PaginationButtons = ({
  handlePreviousButton,
  handleNextButton,
  disableNextButton,
  page,
}: PaginationButtonsProps) => {
  return (
    <div className="flex items-center justify-center lg:justify-end mt-6">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousButton}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium px-3 py-1 bg-primary text-primary-foreground rounded">
            {page}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextButton}
          disabled={disableNextButton}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default PaginationButtons;
