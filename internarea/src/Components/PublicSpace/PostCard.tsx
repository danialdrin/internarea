import React, { useState } from "react";

const PostCard: React.FC<{ post: any }> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<number>(post?.likes?.length || 0);

  const toggleLike = () => {
    setLiked((v) => !v);
    setLikes((n) => (liked ? n - 1 : n + 1));
  };

  return (
    <div className="bg-gray-800 text-white rounded-xl p-4 shadow-md">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post?.author?.photo || "/logo.png"}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="font-semibold">{post?.author?.name || "Unknown"}</div>
          <div className="text-xs text-gray-400">
            {new Date(post?.createdAt || Date.now()).toLocaleString()}
          </div>
        </div>
      </div>
      <div className="mb-3 text-sm">{post?.caption}</div>
      {post?.media && post.media.length > 0 && (
        <div className="mb-3">
          <img
            src={post.media[0].url}
            className="w-full rounded-md max-h-80 object-cover"
          />
        </div>
      )}
      <div className="flex items-center justify-between text-sm text-gray-300">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLike}
            className={`px-2 py-1 rounded ${liked ? "bg-red-600" : "bg-gray-700"}`}
          >
            ❤️ {likes}
          </button>
          <button className="px-2 py-1 bg-gray-700 rounded">
            💬 {post?.comments?.length || 0}
          </button>
          <button className="px-2 py-1 bg-gray-700 rounded">
            🔁 {post?.shares?.length || 0}
          </button>
        </div>
        <button className="px-2 py-1 bg-gray-700 rounded">Save</button>
      </div>
    </div>
  );
};

export default PostCard;
