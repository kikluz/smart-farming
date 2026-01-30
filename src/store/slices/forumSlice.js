import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Best fertilizer for winter wheat?",
      content:
        "Looking for recommendations on the most effective fertilizer for winter wheat in the Midwest region. Has anyone tried the new slow-release nitrogen blends? I'm concerned about cost-effectiveness and environmental impact.",
      category: "Question",
      author: "John D.",
      avatar: "https://i.pravatar.cc/150?u=john",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      likes: 45,
      comments: [
        {
          id: 101,
          author: "Sarah M.",
          content: "I've had good results with Urea 46-0-0 applied in early spring.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
        },
      ],
    },
    {
      id: 2,
      title: "Tips for integrated pest management in tomato fields",
      content:
        "Here are some successful IPM strategies I've implemented this season to control tomato hornworms and aphids without relying heavily on chemical sprays. Companion planting with marigolds and using beneficial insects like ladybugs has shown great results!",
      category: "Tips",
      author: "Sarah M.",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      likes: 78,
      comments: [],
    },
    {
      id: 3,
      title: "Discussion: Regenerative Grazing Practices",
      content:
        "Let's talk about regenerative grazing! What rotational patterns have you found most beneficial for soil health and pasture recovery? Sharing my experience with high-density, short-duration grazing.",
      category: "Discussion",
      author: "OrganicDairy",
      avatar: "https://i.pravatar.cc/150?u=cow",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      likes: 112,
      comments: [],
    },
  ],
  categories: [
    "All Posts",
    "Crops & Soil",
    "Livestock",
    "Equipment & Machinery",
    "Market & Policy",
    "Weather & Climate",
    "Organic Farming",
    "Beginner's Corner",
  ],
  loading: false,
};

const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const newPost = {
        id: Date.now(),
        ...action.payload,
        author: "CurrentUser", // Mock current user
        avatar: "https://i.pravatar.cc/150?u=me",
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
      };
      state.posts.unshift(newPost);
    },
    likePost: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
    addComment: (state, action) => {
      const { postId, content } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.comments.push({
          id: Date.now(),
          author: "CurrentUser",
          content,
          timestamp: new Date().toISOString(),
        });
      }
    },
  },
});

export const { addPost, likePost, addComment } = forumSlice.actions;
export default forumSlice.reducer;
