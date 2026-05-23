import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectuser } from "@/Feature/Userslice";

const CreatePostCard: React.FC = () => {
  const user: any = useSelector(selectuser);
  const [text, setText] = useState("");

  const remaining = 2; // placeholder; frontend should read from API

  const handlePost = () => {
    if (!text.trim()) return;
    console.log("Create post with:", text);
    setText("");
  };

  return (
    <div className="bg-gray-800 text-white rounded-xl p-4 shadow-md">
      <div className="flex gap-3">
        <img
          src={user?.photo || "/logo.png"}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening today?"
            className="w-full bg-transparent resize-none outline-none text-sm min-h-[60px]"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-700 rounded-lg text-sm">Upload Photo</button>
              <button className="px-3 py-1 bg-gray-700 rounded-lg text-sm">Upload Video</button>
              <button className="px-3 py-1 bg-gray-700 rounded-lg text-sm">Add Tags</button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">You can post {remaining} more times today</div>
              <button onClick={handlePost} className="bg-indigo-600 px-4 py-2 rounded-lg">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostCard;
