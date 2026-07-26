const express = require('express');
const app = express();
const PORT = 3000;

// Middleware: Request body se JSON data read karne ke liye zaruri hai
app.use(express.json());

// Fake database (In-memory array for Items)
const items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' }
];

// Fake database (In-memory array for Blog Posts - DAY 6)
const blogPosts = [];

// 1. Root route (Aapka pehle se bana hua code)
app.get('/', (req, res) => {
  res.send('Hello World!');
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

  // Simple Validation: Agar name nahi bheja toh error de do
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
// DAY 6 TASK: BLOG POSTS API ENDPOINTS
// ==========================================

// 5. GET Route: Saare Blog Posts dekhne ke liye
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

  // Validation: Title aur Content dono zaroori hain
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

  // Array mein blog post save ho raha hai
  blogPosts.push(newPost);

  res.status(201).json({
    success: true,
    message: 'Blog post successfully add ho gaya!',
    data: newPost
  });
});

// Server Listen (Hamesha file ke end mein)
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});