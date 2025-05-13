import { GiPenguin } from "react-icons/gi";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <GiPenguin className="text-7xl mb-4"></GiPenguin>{/* 펭귄 아이콘 */}
      <p className="text-3xl">환영합니다!</p>
    </div>
  );
}

export default HomePage;