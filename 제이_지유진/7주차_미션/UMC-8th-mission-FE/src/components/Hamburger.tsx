interface HamburgerButtonProps {
  onToggle: () => void;
  isOpen: boolean;
}

export default function HamburgerButton({
  onToggle,
  isOpen,
}: HamburgerButtonProps) {
  return (
    <button
      className="relative w-10 h-10 flex flex-col justify-center items-center gap-[6px] bg-transparent cursor-pointer focus:outline-none"
      onClick={onToggle}
      aria-label="Toggle menu"
    >
      <span
        className={`w-6 h-[2px] bg-gray-200 rounded transition-all duration-300 ${
          isOpen ? "rotate-45 translate-y-[8px]" : ""
        }`}
      ></span>
      <span
        className={`w-6 h-[2px] bg-gray-200 rounded transition-all duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      ></span>
      <span
        className={`w-6 h-[2px] bg-gray-200 rounded transition-all duration-300 ${
          isOpen ? "-rotate-45 -translate-y-[8px]" : ""
        }`}
      ></span>
    </button>
  );
}
