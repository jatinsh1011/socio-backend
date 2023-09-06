import Post from "../models/post.js";
import User from "../models/user.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      location: user.location,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);

    const isliked = post.likes.get(userId);

    if (isliked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
  
     const updatedpost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(201).json(updatedpost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
