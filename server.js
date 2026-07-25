const express = require('express');
const app = express();
const PORT = 3000;

// Middleware: Request body se JSON data read karne ke liye zaruri hai
app.use(express.json());

// Fake database (In-memory array)
const items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' }
];

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

// Server Listen
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});