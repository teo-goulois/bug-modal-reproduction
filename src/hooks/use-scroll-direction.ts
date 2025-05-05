import { useEffect, useState } from "react";

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevOffset, setPrevOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 24;
      const currentOffset = window.scrollY;
      const direction = currentOffset > prevOffset ? "down" : "up";

      if (
        direction !== scrollDirection &&
        (currentOffset - prevOffset > threshold ||
          currentOffset - prevOffset < -threshold)
      ) {
        setScrollDirection(direction);
      }

      setPrevOffset(currentOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection, prevOffset]);

  return scrollDirection;
};
