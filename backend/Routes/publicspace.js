const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const Post = require("../Model/Post");

const getPostLimit = (friendCount) => {
  if (friendCount === 0) return 1;
  if (friendCount > 10) return Infinity;
  return friendCount;
};

const getTodayStart = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

router.post("/user", async (req, res) => {
  const { uid, name, email, photo } = req.body;
  if (!uid) {
    return res.status(400).json({ error: "uid is required" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { uid },
      { $set: { name, email, photo } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(user);
  } catch (error) {
    console.error("publicspace /user", error);
    res.status(500).json({ error: "Unable to save user" });
  }
});

router.put("/user/:uid/friend", async (req, res) => {
  const { uid } = req.params;
  const { friendUid } = req.body;
  if (!friendUid) {
    return res.status(400).json({ error: "friendUid is required" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { uid },
      { $addToSet: { friends: friendUid } },
      { new: true, upsert: true }
    );
    const friend = await User.findOneAndUpdate(
      { uid: friendUid },
      { $addToSet: { friends: uid } },
      { new: true, upsert: true }
    );
    res.json({ user, friend });
  } catch (error) {
    console.error("publicspace /user/:uid/friend", error);
    res.status(500).json({ error: "Unable to add friend" });
  }
});

router.get("/user/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const limit = getPostLimit(user.friends.length);
    res.json({ ...user.toObject(), postLimit: limit });
  } catch (error) {
    console.error("publicspace /user/:uid", error);
    res.status(500).json({ error: "Unable to read user" });
  }
});

router.post("/post", async (req, res) => {
  const { author, caption, media } = req.body;
  if (!author?.uid) {
    return res.status(400).json({ error: "author.uid is required" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { uid: author.uid },
      { $setOnInsert: { name: author.name, email: author.email, photo: author.photo } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    const todayStart = getTodayStart();
    const todaysPosts = await Post.countDocuments({
      "author.uid": author.uid,
      createdAt: { $gte: todayStart },
    });

    const limit = getPostLimit(user.friends.length);
    if (todaysPosts >= limit) {
      return res.status(403).json({ error: `Daily limit reached. You can post ${limit} times today.` });
    }

    const post = new Post({
      author: {
        uid: author.uid,
        name: author.name,
        photo: author.photo,
      },
      caption,
      media: Array.isArray(media) ? media : [],
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error("publicspace /post", error);
    res.status(500).json({ error: "Unable to create post" });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(100);
    res.json(posts);
  } catch (error) {
    console.error("publicspace /posts", error);
    res.status(500).json({ error: "Unable to load posts" });
  }
});

router.post("/posts/:id/like", async (req, res) => {
  const { id } = req.params;
  const { uid } = req.body;
  if (!uid) return res.status(400).json({ error: "uid is required" });

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const hasLiked = post.likes.includes(uid);
    if (hasLiked) {
      post.likes = post.likes.filter((likeUid) => likeUid !== uid);
    } else {
      post.likes.push(uid);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    console.error("publicspace /posts/:id/like", error);
    res.status(500).json({ error: "Unable to toggle like" });
  }
});

router.post("/posts/:id/comment", async (req, res) => {
  const { id } = req.params;
  const { uid, name, photo, text } = req.body;
  if (!uid || !text) {
    return res.status(400).json({ error: "uid and text are required" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.comments.push({
      user: { uid, name, photo },
      text,
      createdAt: new Date(),
    });
    await post.save();
    res.json(post);
  } catch (error) {
    console.error("publicspace /posts/:id/comment", error);
    res.status(500).json({ error: "Unable to add comment" });
  }
});

router.post("/posts/:id/share", async (req, res) => {
  const { id } = req.params;
  const { uid, name, photo } = req.body;
  if (!uid) return res.status(400).json({ error: "uid is required" });

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const existingShare = post.shares.find((share) => share.user.uid === uid);
    if (!existingShare) {
      post.shares.push({ user: { uid, name, photo }, createdAt: new Date() });
      await post.save();
    }

    res.json(post);
  } catch (error) {
    console.error("publicspace /posts/:id/share", error);
    res.status(500).json({ error: "Unable to share post" });
  }
});

module.exports = router;
