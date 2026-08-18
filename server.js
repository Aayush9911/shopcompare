// ShopCompare backend: Day 4 starter API
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const products = [
  { id: 1, name: "Sony WH-1000XM5 Headphones", category: "headphones", rating: 4.6, stores: [{ name: "Flipkart", price: 24999, delivery: "Free delivery" }, { name: "Amazon", price: 25490, delivery: "Delivery tomorrow" }, { name: "Croma", price: 26990, delivery: "Free delivery" }] },
  { id: 2, name: "Apple iPhone 15 (128 GB)", category: "phone", rating: 4.5, stores: [{ name: "Flipkart", price: 66999, delivery: "Free delivery" }, { name: "Amazon", price: 68490, delivery: "Delivery tomorrow" }, { name: "Croma", price: 69900, delivery: "Store pickup" }] }
];
let orders = [{ id: 1, store: "Amazon", product: "boAt Rockerz 450 Headphones", status: "Arrives today", progress: 82 }, { id: 2, store: "Flipkart", product: "ASUS Vivobook Go 15", status: "Shipped - arrives 20 Aug", progress: 55 }];

app.get("/api/products", (req, res) => res.json(products));
app.get("/api/products/search", (req, res) => { const query = (req.query.q || "").toLowerCase(); res.json(products.filter(product => product.name.toLowerCase().includes(query))); });
app.get("/api/orders", (req, res) => res.json(orders));
app.post("/api/orders", (req, res) => { const { store, product, status, progress } = req.body; if (!store || !product || !status || progress === undefined) return res.status(400).json({ message: "store, product, status and progress are required" }); const order = { id: Date.now(), store, product, status, progress: Number(progress) }; orders.push(order); res.status(201).json(order); });
app.get("/{*splat}", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.listen(PORT, () => console.log(`ShopCompare is running at http://localhost:${PORT}`));
