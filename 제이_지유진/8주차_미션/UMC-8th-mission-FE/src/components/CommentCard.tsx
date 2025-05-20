type CommentCardProps = {
  id: number;
  lpId?: number;
  content: string;
  authorId: number;
  createdAt: string;
  author?: {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
  };
};

function CommentCard({ content, author, createdAt }: CommentCardProps) {
  const avatarUrl =
    author?.avatar ??
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(author?.name ?? "Anonymous");

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow text-white flex items-start space-x-4">
      <img
        src={avatarUrl}
        alt={`${author?.name ?? "작성자"} 프로필`}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <p className="mb-2">{content}</p>
        <div className="text-xs text-gray-400">
          {author?.name ?? "익명"} • {new Date(createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
