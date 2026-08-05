const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON request bodies
app.use(express.static(__dirname)); // Serve static files (HTML, CSS, JS)

// Handle Favicon Requests directly to avoid 404 logging
app.get('/favicon.ico', (req, res) => res.status(204).end());

// In-memory Database for Blog Posts
let blogPosts = [
  {
    id: 1,
    title: 'First Welcome Blog',
    content: 'Welcome to our blog platform! Day 10 Integration task in progress.',
    author: 'Admin',
    createdAt: new Date().toISOString()
  }
];

// 1. Root Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ==========================================
// BLOG API ENDPOINTS
// ==========================================

// 2. GET Route: Fetch all blog posts
app.get('/api/posts', (req, res) => {
  res.status(200).json({
    success: true,
    count: blogPosts.length,
    data: blogPosts
  });
});

// 3. GET Route (By ID): Fetch a single blog post
app.get('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: 'Blog post not found!'
    });
  }

  res.status(200).json({
    success: true,
    data: post
  });
});

// 4. POST Route: Create a new blog post
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Title and content are required!'
    });
  }

  const newPost = {
    id: blogPosts.length > 0 ? blogPosts[blogPosts.length - 1].id + 1 : 1,
    title: title,
    content: content,
    author: author || 'Anonymous',
    createdAt: new Date().toISOString()
  };

  blogPosts.push(newPost);

  res.status(201).json({
    success: true,
    message: 'Blog post created successfully!',
    data: newPost
  });
});

// 5. PUT Route: Update an existing blog post
app.put('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author } = req.body;

  const postIndex = blogPosts.findIndex((p) => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Blog post not found for update!'
    });
  }

  blogPosts[postIndex] = {
    ...blogPosts[postIndex],
    title: title !== undefined ? title : blogPosts[postIndex].title,
    content: content !== undefined ? content : blogPosts[postIndex].content,
    author: author !== undefined ? author : blogPosts[postIndex].author,
    updatedAt: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    message: 'Blog post updated successfully!',
    data: blogPosts[postIndex]
  });
});

// 6. DELETE Route: Delete a blog post
app.delete('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const postExists = blogPosts.some((p) => p.id === id);

  if (!postExists) {
    return res.status(404).json({
      success: false,
      message: 'Blog post not found for deletion!'
    });
  }

  blogPosts = blogPosts.filter((p) => p.id !== id);

  res.status(200).json({
    success: true,
    message: 'Blog post deleted successfully!'
  });
});

// Server Listen
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});