function PlusButton({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  return (
    <div onClick={() => setIsOpen(true)}>
      <button className="fixed bottom-5 right-5 bg-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-pink-500 transition duration-300">
        +
      </button>
    </div>
  );
}

export default PlusButton;
