import { useEffect } from "react";
import { getMyInfo } from "../apis/auth.ts";
export default function Mypage() {
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
    };
    getData();
  }, []);
  return <div>Mypage</div>;
}
