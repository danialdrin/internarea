import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectuser } from "@/Feature/Userslice";
import { toast } from "react-toastify";
import {
  addOrUpdatePublicUser,
  getPublicPosts,
  addPublicPost,
  likePost,
  commentPost,
  sharePost,
  updatePublicUserFriends,
} from "@/data/localData";

interface User {
  uid: string;
  name: string;
  email: string;
  photo: string;
}

interface MediaItem {
  url: string;
  type: "image" | "video";
}

interface Comment {
  user: User;
  text: string;
  createdAt: string;
}

interface Post {
  _id: string;
  author: User;
  caption: string;
  media: MediaItem[];
  likes: string[];
  comments: Comment[];
  shares: { user: User; createdAt: string }[];
  createdAt: string;
}

const PublicSpacePage = () => {
  const user = useSelector(selectuser) as User | null;
  const [posts, setPosts] = useState<Post[]>([]);
  const [caption, setCaption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [friendUid, setFriendUid] = useState("");
  const [friendCount, setFriendCount] = useState(0);
  const [postLimit, setPostLimit] = useState<number | null>(null);
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const currentUser = useMemo(
    () =>
      user
        ? {
            uid: user.uid,
            name: user.name,
            email: user.email,
            photo: user.photo,
          }
        : null,
    [user]
  );

  useEffect(() => {
    if (!currentUser) return;
    const storedUser = addOrUpdatePublicUser(currentUser);
    setFriendCount(storedUser.friends?.length || 0);
    setPostLimit(getPostLimit(storedUser.friends?.length || 0));
    setPosts(getPublicPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const getPostLimit = (friendCount: number) => {
    if (friendCount === 0) return 1;
    if (friendCount > 10) return Infinity;
    return friendCount;
  };

  const fetchPosts = () => {
    setPosts(getPublicPosts());
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setMediaUrl(result);
      setMediaType(file.type.startsWith("video") ? "video" : "image");
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = async () => {
    if (!currentUser) {
      toast.error("Please log in to post.");
      return;
    }
    if (!caption.trim()) {
      toast.error("Please write something before posting.");
      return;
    }
    setLoading(true);
    try {
      const media = mediaUrl ? [{ url: mediaUrl, type: mediaType }] : [];
      addPublicPost({
        author: currentUser,
        caption: caption.trim(),
        media,
      });
      toast.success("Post created successfully!");
      setCaption("");
      setMediaUrl("");
      setCommentText({});
      const storedUser = addOrUpdatePublicUser(currentUser);
      setFriendCount(storedUser.friends?.length || 0);
      setPostLimit(getPostLimit(storedUser.friends?.length || 0));
      fetchPosts();
    } catch (error: any) {
      console.error("Post creation error:", error);
      toast.error("Unable to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = () => {
    if (!currentUser) {
      toast.error("Please log in to add friends.");
      return;
    }
    if (!friendUid.trim()) {
      toast.error("Enter a friend UID to add.");
      return;
    }
    const updatedUser = updatePublicUserFriends(currentUser.uid, friendUid.trim());
    if (!updatedUser) {
      toast.error("Unable to add friend.");
      return;
    }
    setFriendCount(updatedUser.friends.length || 0);
    setPostLimit(getPostLimit(updatedUser.friends.length || 0));
    toast.success("Friend added.");
    setFriendUid("");
  };

  const handleLike = (postId: string) => {
    if (!currentUser) {
      toast.error("Login to like posts.");
      return;
    }
    likePost(postId, currentUser.uid);
    fetchPosts();
  };

  const handleComment = (postId: string) => {
    if (!currentUser) {
      toast.error("Login to comment.");
      return;
    }
    const text = commentText[postId]?.trim();
    if (!text) return;

    commentPost(postId, {
      user: currentUser,
      text,
      createdAt: new Date().toISOString(),
    });
    setCommentText((prev) => ({ ...prev, [postId]: "" }));
    fetchPosts();
  };

  const handleShare = (postId: string) => {
    if (!currentUser) {
      toast.error("Login to share posts.");
      return;
    }
    sharePost(postId, {
      user: currentUser,
      createdAt: new Date().toISOString(),
    });
    toast.success("Post shared.");
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Public Space</h1>
            <p className="mt-2 text-gray-600">
              Share photos, videos, like posts, comment, and connect with friends.
            </p>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Friends: {friendCount}</p>
            <p>
              Daily post limit: {postLimit === Infinity ? "Unlimited" : postLimit}
            </p>
            <p>
              <Link href="/profile" className="text-blue-600 hover:underline">
                View profile
              </Link>
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Create a post</h2>
              {!currentUser && (
                <p className="mt-3 text-sm text-gray-500">
                  Please log in with Google to write a post and connect with friends.
                </p>
              )}
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Caption</label>
                  <textarea
                    value={caption}
                    onChange={(event) => setCaption(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                    rows={4}
                    placeholder="Write something for your post..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Photo or video (optional)</label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="mt-2 w-full text-sm text-gray-700"
                  />
                </div>
                {mediaUrl && (
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    {mediaType === "image" ? (
                      <img src={mediaUrl} alt="preview" className="max-h-72 w-full object-contain rounded-2xl" />
                    ) : (
                      <video controls className="max-h-72 w-full rounded-2xl">
                        <source src={mediaUrl} />
                      </video>
                    )}
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleCreatePost}
                  disabled={loading || !caption.trim()}
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {loading ? "Posting..." : "Post to Public Space"}
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Friend system</h2>
              <p className="mt-2 text-sm text-gray-500">
                Add a friend by their UID to grow your network and increase your daily post limit.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  value={friendUid}
                  onChange={(event) => setFriendUid(event.target.value)}
                  placeholder="Friend UID"
                  className="flex-1 rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleAddFriend}
                  className="rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Add Friend
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">How posting works</h2>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>0 friends: 1 post per day.</li>
                <li>1 friend: 1 post per day.</li>
                <li>2 friends: 2 posts per day.</li>
                <li>3–10 friends: equal to friend count.</li>
                <li>More than 10 friends: unlimited posts.</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Quick tips</h2>
              <p className="mt-2 text-sm text-gray-500">
                Connect with people, create richer posts, and engage by liking or commenting on community content.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-10 space-y-6">
          {posts.map((post) => (
            <article key={post._id} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={post.author.photo || "/logo.png"}
                  alt={post.author.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{post.author.name}</p>
                  <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-800">{post.caption}</p>
              {post.media.length > 0 && (
                <div className="mt-4 rounded-3xl border border-gray-200 bg-gray-50 p-4">
                  {post.media[0].type === "image" ? (
                    <img src={post.media[0].url} alt="post media" className="w-full rounded-3xl object-contain" />
                  ) : (
                    <video controls className="w-full rounded-3xl">
                      <source src={post.media[0].url} type="video/mp4" />
                    </video>
                  )}
                </div>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <button
                  onClick={() => handleLike(post._id)}
                  className="rounded-full border border-gray-200 px-4 py-2 hover:border-blue-500 hover:text-blue-600"
                >
                  Like ({post.likes.length})
                </button>
                <button
                  onClick={() => handleShare(post._id)}
                  className="rounded-full border border-gray-200 px-4 py-2 hover:border-green-500 hover:text-green-600"
                >
                  Share ({post.shares.length})
                </button>
              </div>
              <div className="mt-4 space-y-3">
                <div className="space-y-3">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="rounded-3xl bg-gray-50 p-4">
                      <p className="font-semibold text-gray-900">{comment.user.name}</p>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    value={commentText[post._id] || ""}
                    onChange={(event) =>
                      setCommentText((prev) => ({ ...prev, [post._id]: event.target.value }))
                    }
                    placeholder="Write a comment..."
                    className="flex-1 rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={() => handleComment(post._id)}
                    className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </article>
          ))}
          {posts.length === 0 && (
            <div className="rounded-3xl bg-white p-8 text-center text-gray-600 shadow-sm">
              No public posts yet. Create the first post and start your community.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicSpacePage;
