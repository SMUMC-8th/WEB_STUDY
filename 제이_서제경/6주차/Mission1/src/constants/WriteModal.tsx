// LP post 추가하는 부분

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Portal from "../components/portal/portal";
import { useMutation } from "@tanstack/react-query";
import { TPostLP } from "../types/lp"; // LP 등록 시 필요한 타입 정의
import { postLP } from "../apis/lp"; // LP 등록 API
import addLpSchema from "../utils/vaildate"; // 유효성 검사 스키마 (Zod)
import { useState } from "react";
import { X } from "lucide-react";
import lpImage from "../assets/LP.png"; // 고정 LP 이미지

const WriteModal = ({ onClose }: { onClose: () => void }) => {
  // 태그 입력 input 상태 (실시간 입력값)
  const [tagInput, setTagInput] = useState("");

  // 파일 이미지 업로드(초기값은 null)
  const [preview, setPreview] = useState<string | null>(null);

  // form 관련 세팅 (react-hook-form + Zod 유효성 검사)
  const {
    register,
    handleSubmit,
    getValues, // 현재 form 내부 값 읽기
    setValue, // form 내부 특정 필드 값 변경
    formState: { isValid }, // 전체 form 유효성 여부 (Zod 기준)
  } = useForm<TPostLP>({
    mode: "onChange", // 값이 바뀔 때마다 유효성 검사
    resolver: zodResolver(addLpSchema), // Zod 스키마로 유효성 검사 연결
  });

  // LP 등록 요청 -> POST 요청을 보내는 로직을 선언
  const { mutate: addLpMutate } = useMutation({
    mutationFn: (data: TPostLP) => postLP(data),
    onSuccess: () => {
      console.log("LP 작성 성공");
    },
    onError: (error) => {
      console.error("LP 작성 실패: ", error);
    },
  });

  // Add LP 버튼을 눌렀을 때 실행됨
  const onSubmit: SubmitHandler<TPostLP> = (values) => {
    // form에서 받은 데이터로 등록 요청
    addLpMutate({
      title: values.title,
      content: values.content,
      tags: values.tags,
      thumbnail: values.thumbnail,
      published: values.published,
    });
  };

  //태그 추가 버튼 클릭 시 실행
  const handleAddTag = () => {
    // 1. tagInput이 공백이면 아무 작업도 하지 않고 리턴
    if (!tagInput.trim()) return;

    // 2. 현재 form 내부에 있는 tags 배열 값을 가져옴
    const currentTags = getValues("tags") || [];

    // 3. 새 태그를 기존 배열에 추가해서 새로운 배열 생성
    const updatedTags = [...currentTags, tagInput.trim()];

    // 4. form 내부의 tags 값을 이 새 배열로 업데이트
    setValue("tags", updatedTags);

    // 5. 입력창 비워주기
    setTagInput("");
  };

  // 태그 삭제 함수
  const handleRemoveTag = (index: number) => {
    const currentTags = getValues("tags") || [];
    const updatedTags = currentTags.filter((_, i) => i !== index);
    setValue("tags", updatedTags, { shouldValidate: true }); // 업데이트된 배열을 폼에 반영
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string); // 미리보기 설정
      setValue("thumbnail", reader.result as string); // form 필드에 반영
    };
    reader.readAsDataURL(file); // base64 변환(?)
  };

  return (
    <Portal>
      {/* 모달 배경 + 중앙 정렬 */}
      <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white text-black p-6 rounded-xl flex flex-col items-center gap-4 w-[350px]"
        >
          {/* 모달 배경 + 중앙 정렬 */}
          <div className="w-full flex justify-end">
            <X
              type="button"
              onClick={onClose}
              className="text-xs text-gray-400"
            />
          </div>

          {/* LP 썸네일 */}
          <div className="relative w-60 h-60 rounded overflow-hidden">
            {/* 기본 LP 이미지 (항상 표시) */}
            <img
              src={lpImage}
              alt="기본 LP"
              className="w-full h-full object-cover"
            />

            {/* 업로드된 썸네일이 있을 경우 위에 덮어쓰기 */}
            {preview && (
              <img
                src={preview}
                alt="업로드 썸네일"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            )}

            {/* 파일 input과 연결된 label */}
            <label
              htmlFor="upload-thumbnail"
              className="absolute inset-0 cursor-pointer"
            />
          </div>

          {/* 숨겨진 input */}
          <input
            type="file"
            accept="image/*"
            id="upload-thumbnail"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* 제목 */}
          <input
            type="text"
            placeholder="LP Name"
            {...register("title")}
            className="w-full p-2 border-gray-400 border rounded-lg text-sm mt-5"
          />

          {/* 내용 */}
          <input
            type="text"
            placeholder="LP Content"
            {...register("content")}
            className="w-full p-2 border-gray-400 border rounded-lg text-sm"
          />

          {/* 태그 입력 + Add 버튼 */}
          <div className="w-full flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="LP Tag"
              className="flex-1 p-2 border-gray-400 border rounded-lg text-sm"
            />

            {/* Add 버튼 */}
            <button
              type="button"
              onClick={handleAddTag}
              disabled={tagInput.trim().length === 0}
              className={`px-3 text-sm rounded-lg
                ${
                  tagInput.trim().length === 0
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : "bg-black text-white"
                }`}
            >
              Add
            </button>
          </div>

          {/* 태그 목록 렌더링 */}
          {(getValues("tags") || []).length > 0 && (
            <div className="flex gap-2 flex-wrap w-full text-xs">
              {getValues("tags")?.map((tag, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 border-bg-gray border rounded-lg px-2 py-1"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(i)}
                    className="text-gray-500 text-[10px] hover:text-black"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full  bg-black text-white py-2 rounded-lg mt-2 text-sm`}
          >
            Add LP
          </button>
        </form>
      </div>
    </Portal>
  );
};

export default WriteModal;

// Q. 파일 선택 핸들러
// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0]; -> 파일 배열을 가져오고 첫번째 파일만 가져옴
//   if (!file) return;

//   const reader = new FileReader(); -> 이미지를 읽어서 미리보기로 보여줌
//   reader.onloadend = () => {
//     setPreview(reader.result as string); // 미리보기 설정 : setPreview()는 이미지 미리보기를 위해 컴포넌트 상태를 변경하는 함수
//     setValue("thumbnail", reader.result as string); // form 필드에 반영
//   };
//   reader.readAsDataURL(file);
// base64 문자열로 변환함 -> 이미지를 서버에 파일로 보낼 수 없을 때 (서버 API 요구 형식에 따라 달라짐)
// 왜? -> 썸네일의 타입이 string이라서
// };
