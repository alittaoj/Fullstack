/*const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON in requests
app.use(express.json());

// In-memory data store (for demo)
let items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' }
];

// GET all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// GET single item by ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

// POST a new item
app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.status(201).json(newItem);
});
// Root route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});*/

const express = require('express');
const mongoose = require('mongoose');
const AddProject = require('./models/project');
const cors = require('cors');
const path = require('path');

const app = express();
//const port = 3000;
const port = process.env.port || 3000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Connect to MongoDB
mongoose.connect("mongodb+srv://alittaoj30:alitta@cluster0.q7b9z3s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// GET route - Get all projects
app.get('/api/services', async (req, res) => {
  try {
    const projects = await AddProject.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// POST route - Add a new project
app.post('/api/services', async (req, res) => {
  const { title, desc } = req.body;

  if (!title|| !desc) {
    return res.status(400).json({ error: 'Title and Description are required' });
  }

  const prjDetails = new AddProject({ id: Date.now(), title, desc });

  try {
    await prjDetails.save();
    res.status(200).json({ message: 'Project added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving project' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
