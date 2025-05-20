import { useAuth } from "../context/AuthContext";
import { fecthUser } from "../utils/funcFetch";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import icon from "../assets/images/category.svg";

type HeaderProps = {
  isSideVisible: boolean;
  setIsSideVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ props }: { props: HeaderProps }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fecthUser,
  });
  const { logout } = useAuth();
  const { isSideVisible, setIsSideVisible } = props;

  // 정보를 아직 들고오는 중이라면 Loading
  if (isLoading) return <Loading />;

  return (
    <header className="w-full h-[10vh] p-5 flex justify-between items-center bg-zinc-900 text-white">
      <div className="flex justify-center items-center text-white text-sm sm:text-lg">
        <button
          onClick={() => {
            setIsSideVisible(!isSideVisible);
          }}
          className="mr-3 hover:bg-zinc-600"
        >
          <img src={icon} />
        </button>
        <p className="text-md sm:text-xl text-pink-500 font-bold">DOLIGO</p>
      </div>
      <div className="flex justify-center items-center text-white text-xs sm:text-sm">
        <p className="px-3">{data.data.name + "님 반갑습니다."}</p>
        <button onClick={logout} className="hover:text-pink-500">
          로그아웃
        </button>
      </div>
    </header>
  );
};

export default Header;
