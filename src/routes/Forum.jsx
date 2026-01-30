import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost, likePost, addComment } from "../store/slices/forumSlice";
import {
  MessageSquare,
  Heart,
  Share2,
  Search,
  Plus,
  User,
  Tag,
  Hash,
  Send,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Forum = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.forum.posts);
  const categories = useSelector((state) => state.forum.categories);

  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentInputMap, setCommentInputMap] = useState({}); // Map postId to comment text

  // New Post State
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Question");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All Posts" || post.category === selectedCategory; // This mock category logic is simple, real app might link categories differently
    // Actually our mock posts have categories like "Question", "Tips".
    // Let's just filter by search for now + basic category if it matches.
    // For simplicity with the mock data provided:
    // If selectedCategory is "All Posts", show all.
    // Otherwise, try to match loosely (mock data categories are limited).
    // Let's implement robust filtering if we had better structured mock data categories.
    // For now, let's stick to Search filter primarily and maybe "Question"/"Tips"/"Discussion" if we aligned them.
    // To make the sidebar functional with the current mock data, let's assume filtering logic needs to match post.category.
    // But the sidebar has specific topics. Let's strictly filter only if the post.category matches one of the sidebar items OR keep it simple.
    // Actually, let's just use Search for now to keep it reliable with limited mock data.
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    dispatch(
      addPost({
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory,
      })
    );
    setNewPostTitle("");
    setNewPostContent("");
    setIsModalOpen(false);
  };

  const handleCommentSubmit = (postId) => {
      const content = commentInputMap[postId];
      if(!content?.trim()) return;
      
      dispatch(addComment({ postId, content }));
      setCommentInputMap(prev => ({ ...prev, [postId]: "" }));
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-6rem)]">
      {/* Sidebar - Categories */}
      <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
        <div className="card bg-base-100 shadow-xl h-full lg:h-auto overflow-y-auto">
          <div className="card-body p-4">
            <h2 className="font-bold text-lg mb-2">Categories</h2>
            <ul className="menu bg-base-100 w-full p-0 gap-1">
              {categories.map((cat) => (
                <li key={cat}>
                  <a
                    className={selectedCategory === cat ? "active" : ""}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === "All Posts" ? <Hash size={16} /> : <Tag size={16} />}
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        {/* Header & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-base-100 p-4 rounded-xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold">Community Hub</h1>
            <p className="text-sm opacity-70">Connect, Share, and Grow</p>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            <label className="input input-bordered flex items-center gap-2 flex-1">
              <Search size={16} />
              <input
                type="text"
                className="grow"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
            <button
              className="btn btn-primary btn-circle"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        {/* Posts List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-2">
          {filteredPosts.map((post) => (
            <div key={post.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {/* Author Info */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={post.avatar} alt={post.author} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{post.author}</h3>
                      <div className="text-xs opacity-60 flex items-center gap-1">
                        {formatDistanceToNow(new Date(post.timestamp))} ago
                      </div>
                    </div>
                  </div>
                  <div className="badge badge-outline">{post.category}</div>
                </div>

                {/* Post Content */}
                <h2 className="card-title mt-2">{post.title}</h2>
                <p className="opacity-80 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-base-200">
                  <button
                    className="btn btn-ghost btn-sm gap-2 hover:text-red-500"
                    onClick={() => dispatch(likePost(post.id))}
                  >
                    <Heart size={18} />
                    {post.likes} <span className="hidden sm:inline">Likes</span>
                  </button>
                  <button className="btn btn-ghost btn-sm gap-2"
                   onClick={() => document.getElementById(`comments-${post.id}`).toggleAttribute('hidden')}
                  >
                    <MessageSquare size={18} />
                    {post.comments.length}{" "}
                    <span className="hidden sm:inline">Comments</span>
                  </button>
                  <button className="btn btn-ghost btn-sm gap-2 ml-auto">
                    <Share2 size={18} />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>

                {/* Comments Section (Collapsible in a real app, simplified here) */}
                <div id={`comments-${post.id}`} hidden className="bg-base-200/50 p-4 rounded-lg mt-4 space-y-3">
                    {post.comments.map(comment => (
                        <div key={comment.id} className="chat chat-start">
                            <div className="chat-header text-xs opacity-70 mb-1">
                                {comment.author} <time className="text-[10px] ml-1">{formatDistanceToNow(new Date(comment.timestamp))} ago</time>
                            </div>
                            <div className="chat-bubble chat-bubble-secondary text-sm">{comment.content}</div>
                        </div>
                    ))}
                    
                    <div className="flex gap-2 mt-2">
                        <input 
                            type="text" 
                            className="input input-sm input-bordered w-full"
                            placeholder="Write a comment..."
                            value={commentInputMap[post.id] || ""}
                            onChange={(e) => setCommentInputMap(prev => ({...prev, [post.id]: e.target.value}))}
                            onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                        />
                         <button className="btn btn-sm btn-ghost btn-circle" onClick={() => handleCommentSubmit(post.id)}>
                            <Send size={16}/>
                         </button>
                    </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Create New Post</h3>
            <form onSubmit={handleCreatePost}>
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  className="select select-bordered"
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                >
                  <option>Question</option>
                  <option>mnTips</option>
                  <option>Discussion</option>
                </select>
              </div>

              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  className="input input-bordered w-full"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
              </div>

              <div className="form-control w-full mb-6">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32"
                  placeholder="Share your thoughts, tips, or questions..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                ></textarea>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Post
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
             <button onClick={() => setIsModalOpen(false)}>close</button>
        </form>
        </dialog>
      )}
    </div>
  );
};

export default Forum;
