import { Comment as CommentType } from "../../types/comment";

interface CommentProps {
  comment: CommentType;
}

export const Comment = ({ comment }: CommentProps) => {
  return (
    <div className="flex gap-3 p-3 border-b border-gray-700">
      <div className="flex-shrink-0">
        <img
          src={comment.author.avatar || "https://via.placeholder.com/32"}
          alt={comment.author.name}
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white text-sm">
            {comment.author.name}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="mt-1 text-gray-300 text-sm">{comment.content}</p>
      </div>
    </div>
  );
};
