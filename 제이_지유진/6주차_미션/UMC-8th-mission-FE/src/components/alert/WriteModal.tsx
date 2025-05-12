import { zodResolver } from "@hookform/resolvers/zod";
import Portal from "../portal/portal";
import { addLpSchema } from "../../utills/validate";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postLP } from "../../apis/LP";
import { TPostLPRequest } from "../../types/lp";
import { useState } from "react";
const WriteModal = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(addLpSchema),
  });
  const [addTag, setAddTag] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

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

  const handleAddTag = (value: string | null) => {
    const newTag = value || tagInput.trim();
    if (newTag && !addTag.includes(newTag)) {
      setAddTag([...addTag, newTag]);
    }
    setTagInput("");
  };

  const onChangeTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const onSubmit = (data: TPostLPRequest) => {
    const { title, content, thumbnail } = data;
    const tags = addTag.map((tag) => tag.trim());
    const published = true; // or false, depending on your logic
    addLPMutate({ title, content, thumbnail, tags, published });
    onClose();
  };

  return (
    <Portal>
      <div className="bg-black/50 absolute top-0 left-0 bottom-0 items-center justify-center overflow-hidden w-full h-full">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <input type="file" accept="image/*" />
          </div>
          <input type="text" placeholder="LP Title" {...register("title")} />
          <input
            type="text"
            placeholder="LP Content"
            {...register("content")}
          />
          <input type="text" placeholder="LP Tag" />
        </form>
      </div>
    </Portal>
  );
};

export default WriteModal;
