import { zodResolver } from "@hookform/resolvers/zod";
import Portal from "../portal/portal";
import { addLpSchema } from "../../utills/validate";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import {
  queryOptions,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import { postLP } from "../../apis/LP";
import { TPostLPRequest } from "../../types/lp";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import lp from "../../images/lp.png";
import { axiosInstance } from "../../apis/axios";
import { TOrder } from "../../constants/enum";
import { CommonResponse } from "../../types/common";
import useDebouce from "../../hooks/useDebounce.ts";
import { useInView } from "react-intersection-observer";
type TFormInput = z.infer<typeof addLpSchema>;
export type TTagList = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: TOrder;
};
type TTags = {
  id: number;
  name: string;
};
export type TTagsListResponse = CommonResponse<{
  data: TTags[];
  nextCursor: number;
  hasNext: boolean;
}>;
const postImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axiosInstance.post("v1/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

const getTags = async ({
  search,
  order,
  cursor,
  limit,
}: TTagList): Promise<TTagsListResponse> => {
  const { data } = await axiosInstance.get(`v1/tags`, {
    params: { cursor, limit, order, search },
  });
  return data;
};

const WriteModal = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<TFormInput>({
    resolver: zodResolver(addLpSchema),
  });
  const [addTag, setAddTag] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const tagListRef = useRef<HTMLDivElement | null>(null);
  const debouncedTagInput = useDebouce(tagInput, 5000);
  const [showTagList, setShowTagList] = useState(false);
  const { mutate: addLPMutate } = useMutation({
    mutationFn: ({
      title,
      content,
      thumbnail,
      tags,
      published,
    }: TPostLPRequest) =>
      postLP({ title, content, thumbnail, tags, published }),
    onSuccess: () => {
      console.log("LP 추가 성공");
    },
    onError: (error) => {
      console.error("LP 추가 실패:", error);
    },
  });

  const { mutate: uploadImage } = useMutation({
    mutationFn: (file: File) => postImage(file),
    onSuccess: (data) => {
      console.log("이미지 업로드 성공:", data);
      setImageUrl(data.data.imageUrl);
    },
  });

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["getTags", debouncedTagInput],
    queryFn: ({ pageParam = 0 }): Promise<TTagsListResponse> =>
      getTags({
        cursor: pageParam,
        limit: 10,
        search: debouncedTagInput,
        order: TOrder.NEWEST_FIRST,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
    ...queryOptions,
  });

  const handleAddTag = (value: string | null) => {
    const newTag = value || tagInput.trim();
    if (newTag && !addTag.includes(newTag)) {
      setAddTag([...addTag, newTag]);
    }
    setTagInput("");
  };

  const onChangeTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setShowTagList(true);
  };

  const onSubmit = (data: TFormInput) => {
    const { title, content } = data;
    const tags = addTag.map((tag) => tag.trim());
    const published = true;
    const thumbnail = imageUrl;
    addLPMutate({ title, content, thumbnail, tags, published });
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  useEffect(() => {
    console.log("imageUrl", imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tagListRef.current &&
        !tagListRef.current.contains(event.target as Node)
      ) {
        setShowTagList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);
  return (
    <Portal>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full overflow-hidden bg-black/50 z-100">
        <form
          className="flex flex-col items-center justify-start w-[500px] h-[700px] bg-gray-800 rounded-lg p-6 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* 이미지 업로드 영역 */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center w-full rounded-lg cursor-pointer overflow-hidden"
          >
            {imageUrl !== "" ? (
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-[300px] h-[300px] object-cover"
              />
            ) : (
              <img
                src={lp}
                alt="Default"
                className="w-[300px] h-[300px] object-cover"
              />
            )}
          </div>
          <div className="hidden">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          {/* 제목 입력 */}
          <input
            type="text"
            placeholder="LP Title"
            {...register("title")}
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />

          {/* 내용 입력 */}
          <input
            type="text"
            placeholder="LP Content"
            {...register("content")}
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />

          {/* 태그 입력 */}
          <div className="flex items-center justify-between w-full gap-2">
            <input
              type="text"
              placeholder="LP Tag"
              onClick={() => setShowTagList(true)}
              onChange={onChangeTagInput}
              value={tagInput}
              className="flex-1 p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            <button
              type="button"
              onClick={() => handleAddTag(null)}
              disabled={!tagInput.trim()}
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-500 disabled:bg-gray-500"
            >
              Add
            </button>
          </div>

          {/* 태그 추천 리스트 */}
          {showTagList && (
            <div className="flex flex-col items-start w-full bg-gray-700 rounded-md p-3 gap-2 max-h-[150px] overflow-y-auto">
              {data?.pages.map((page) =>
                page.data.data.map((tag) => (
                  <span
                    className="px-3 py-1 bg-gray-600 text-white rounded-md cursor-pointer hover:bg-gray-500"
                    onClick={() => {
                      setTagInput(tag.name);
                      setShowTagList(false);
                    }}
                    key={tag.id}
                  >
                    #{tag.name}
                  </span>
                ))
              )}
              <div ref={ref}></div>
            </div>
          )}

          {/* 추가된 태그 리스트 */}
          <div className="flex flex-wrap gap-2 w-full">
            {addTag.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-pink-600 text-white rounded-md flex items-center gap-2"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full py-3 bg-pink-600 text-white rounded-md hover:bg-pink-500"
            disabled={!isValid}
          >
            Add Lp
          </button>
        </form>
      </div>
    </Portal>
  );
};

export default WriteModal;
