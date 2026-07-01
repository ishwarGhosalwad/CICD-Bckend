const express = require("express");

const app = express();
app.use(express.json());

let items = [];
let nextId = 1;

function resetItems() {
  items = [];
  nextId = 1;
}

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const { name, description } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Name is required" });
  }

  const newItem = {
    id: nextId++,
    name,
    description: description || ""
  };

  items.push(newItem);
  return res.status(201).json(newItem);
});

app.get("/items/:id", (req, res) => {
  const item = items.find((entry) => entry.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  return res.json(item);
});

app.put("/items/:id", (req, res) => {
  const item = items.find((entry) => entry.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  const { name, description } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Name is required" });
  }

  item.name = name;
  item.description = description || "";

  return res.json(item);
});

app.delete("/items/:id", (req, res) => {
  const index = items.findIndex((entry) => entry.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  const [deletedItem] = items.splice(index, 1);
  return res.json(deletedItem);
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = { app, resetItems };
