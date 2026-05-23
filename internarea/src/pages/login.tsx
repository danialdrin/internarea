import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/Feature/Userslice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("user@example.com");
  const [name, setName] = useState("John Doe");
  const [photo, setPhoto] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces");
  const [loading, setLoading] = useState(false);

  const dummyUsers = [
    {
      uid: "user-123",
      email: "user@example.com",
      name: "John Doe",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
    },
    {
      uid: "user-456",
      email: "jane@example.com",
      name: "Jane Smith",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
    },
    {
      uid: "user-789",
      email: "alex@example.com",
      name: "Alex Johnson",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
    },
  ];

  const handleDummyLogin = (user: typeof dummyUsers[0]) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          name: user.name,
          photo: user.photo,
          phoneNumber: "",
        })
      );
      toast.success(`Logged in as ${user.name}`);
      router.push("/");
      setLoading(false);
    }, 500);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const uid = `user-${Date.now()}`;
      dispatch(
        login({
          uid,
          email,
          name,
          photo: photo || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
          phoneNumber: "",
        })
      );
      toast.success(`Logged in as ${name}`);
      router.push("/");
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">InternArea</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Demo Login</h2>
          <p className="text-gray-600">Select a test user or create a custom one</p>
        </div>

        {/* Dummy Users */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 mb-3">Quick Login:</p>
          {dummyUsers.map((user) => (
            <button
              key={user.uid}
              onClick={() => handleDummyLogin(user)}
              disabled={loading}
              className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or create custom</span>
          </div>
        </div>

        {/* Custom Login */}
        <form onSubmit={handleCustomLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL (optional)</label>
            <input
              type="url"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            This is a demo login page. No credentials are validated against a server.
          </p>
        </div>
      </div>
    </div>
  );
}
