"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

export default function Autoscroll() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.pageYOffset > 100);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        setIsScrolled(window.pageYOffset > 100);
      });
    };
  }, []);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isScrolled && (
        <Button
          className="bg-custom-green hover:bg-custom-green/90 text-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-lg font-normal rounded-sm fixed bottom-10 right-10 z-50"
          size="lg"
          onClick={handleScrollUp}
        >
          <ChevronUp className="size-4 md:size-6" />
        </Button>
      )}
    </>
  );
}
