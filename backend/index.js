import express from "express";
import mysql from "mysql";

const app = new express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gian2000",
  database: "test",
});

app.use(express.json());

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
  const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json("Book added");
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
