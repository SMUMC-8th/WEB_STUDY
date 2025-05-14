import { useMutation } from "@tanstack/react-query";
import { PatchMyInfo } from "../../apis/auth";
import Portal from "../portal/portal";
import { Check } from "lucide-react";
import { useState } from "react";
import { queryClient } from "../../App";

type TMypageModalProps = {
  onClose: () => void;
  name: string;
  bio?: string;
  avatar: string;
  email: string;
};

function MypageModal({ onClose, name, bio, avatar, email }: TMypageModalProps) {
  const [nameValue, setNameValue] = useState(name);
  const [bioValue, setBioValue] = useState<string | null>(bio || null);
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 내부 클릭은 모달 닫힘 방지
    e.stopPropagation();
  };
  const { mutate: mutationPatchMyInfo } = useMutation({
    mutationFn: () => PatchMyInfo({ name: nameValue, bio: bioValue, avatar }),
    onSuccess: (data) => {
      console.log("프로필 수정 성공:", data);
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      onClose();
    },
  });
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const handleChangeBio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBioValue(e.target.value);
  };

  const PatchInfoHandler = () => {
    mutationPatchMyInfo();
  };

  return (
    <Portal>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
      >
        <div
          onClick={handleContainerClick}
          className="rounded-md bg-black text-white w-[1000px] h-[500px] flex flex-col items-center justify-center p-4 z-100"
        >
          <div className="flex items-center gap-4">
            <img
              src={avatar}
              alt="프로필사진"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={nameValue}
                onChange={handleChangeName}
                className="bg-white text-black px-2 py-1 rounded w-full"
              />
              <Check onClick={PatchInfoHandler}></Check>
              <input
                type="text"
                value={bioValue || ""}
                onChange={handleChangeBio}
                className="bg-white text-black px-2 py-1 rounded w-full"
              />
              <span className="text-sm text-gray-400">{email}</span>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default MypageModal;
