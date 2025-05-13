import { getMyInfo } from "../apis/auth.ts";
import Order from "../components/order.tsx";
import { useAuth } from "../context/AuthContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { IoIosSettings } from "react-icons/io";
export default function Mypage() {
  const { data } = useQuery({
    queryKey: ["myInfo"],
    queryFn: () => getMyInfo(),
    staleTime: 1000 * 60 * 5, // 5분
  });
  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await getMyInfo();
  //     console.log(response);

  //     setData(response);
  //   };
  //   getData();
  // }, []);

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login"; //로그아웃하면 로그인 페이지로 이동
  };
  return (
    <div className="flex justify-center text-white mt-30">
      <div className="text-white flex flex-col gap-5">
        <div className="flex flex-wrap gap-4">
          <img
            src={
              (data?.data?.avatar as string) ||
              "https://www.studiopeople.kr/common/img/default_profile.png"
            }
            alt={"구글 로고"}
            className="rounded-full w-30 h-30"
          />
          <div>
            <div className="flex justify-between gap-4">
              <h1 className="text-[20px]">{data?.data?.name}</h1>
              <IoIosSettings className="cursor-pointer" />
            </div>
            <h1>{data?.data?.email}</h1>
            <h1>{data?.data?.bio}</h1>

            <button
              className="cursor-pointer bg-pink-500 rounded-sm p-2"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
