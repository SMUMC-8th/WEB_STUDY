export default function Navbar() {
  return (
    <div className="w-full bg-zinc-800 h-[80px] flex justify-between items-center text-center pl-5 pr-5">
      <p className="text-pink-600 font-bold text-3xl">돌려돌려LP판</p>
      <div className="flex gap-4">
        <button className="rounded-[5px] text-white text-m bg-gray-900 w-[70px] cursor-pointer">
          로그인
        </button>
        <button className="rounded-[5px] text-white text-m bg-pink-600  w-[70px] cursor-pointer">
          회원가입
        </button>
      </div>
    </div>
  );
}
