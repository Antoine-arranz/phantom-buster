import { useEffect } from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  fn: () => void
): void => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      fn();
    }
  };

  const handlePressEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") fn();
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handlePressEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handlePressEsc);
    };
  }, [ref, fn]);
};
