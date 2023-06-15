import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = new express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gian2000",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `price`,  `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json("Book added");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookID = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookID], (err, result) => {
    if (err) return res.json(err);
    return res.json("Book deleted");
  });
});

app.put("/books/:id", (req, res) => {
  const bookID = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookID], (err, result) => {
    if (err) return res.json(err);
    return res.json("Book updated");
  });
});

app.listen(3000, () => {
  console.log("Server running on port: 3000");
});
