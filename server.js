const express = require('express');
const cors = require('cors'); // CORS add kiya hai taaki Frontend easily connect ho sake
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Cross-Origin Requests allow karne ke liye
app.use(express.json()); // Request body se JSON data read karne ke liye

// Fake database (In-memory array for Items)
const items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' }
];

// Fake database (In-memory array for Blog Posts)
const blogPosts = [
  // Sample Data (Testing ke liye ki Home Page par shuru me hi blogs dikhein)
  {
    id: 1,
    title: 'First Welcome Blog',
    content: 'Welcome to our blog platform! Day 7 View Blogs task completed.',
    author: 'Admin',
    createdAt: new Date().toISOString()
  }
];

// 1. Root route
app.get('/', (req, res) => {
  res.send('Hello World! Blog API is running.');
});

// 2. GET Route: Sare items retrieve karne ke liye
app.get('/api/items', (req, res) => {
  res.status(200).json({
    success: true,
    data: items
  });
});

// 3. GET Route (By ID): Kisi ek specific item ko mangwane ke liye
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item nahi mila!'
    });
  }

  res.status(200).json({
    success: true,
    data: item
  });
});

// 4. POST Route: Naya item add karne ke liye
app.post('/api/items', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Please item ka name zaroor bhejein.'
    });
  }

  const newItem = {
    id: items.length + 1,
    name: name
  };

  items.push(newItem);

  res.status(201).json({
    success: true,
    message: 'Item successfully add ho gaya!',
    data: newItem
  });
});

// ==========================================
// DAY 6 & DAY 7: BLOG POSTS API ENDPOINTS
// ==========================================

// 5. GET Route: Saare Blog Posts dekhne ke liye (DAY 7 CORE TASK)
// Home page par Display/View karne ke liye yehi API call hogi
app.get('/api/posts', (req, res) => {
  res.status(200).json({
    success: true,
    count: blogPosts.length,
    data: blogPosts
  });
});

// 6. POST Route: Naya Blog Post create karne ke liye (DAY 6 CORE TASK)
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Please title aur content zaroor bhejein.'
    });
  }

  const newPost = {
    id: blogPosts.length + 1,
    title: title,
    content: content,
    author: author || 'Anonymous',
    createdAt: new Date().toISOString()
  };

  blogPosts.push(newPost);

  res.status(201).json({
    success: true,
    message: 'Blog post successfully add ho gaya!',
    data: newPost
  });
});

// Server Listen
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});