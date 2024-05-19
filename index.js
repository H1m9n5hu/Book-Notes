import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Book Notes",
    password: "Lucifer",
    port: 5432
});
db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

async function getBooks() {
    const result = await db.query("Select * from books");
    let books = [];
    result.rows.forEach(book => {
        books.push(book);
    })
    return books;
}

app.get("/", async (req, res) => {
    const books = await getBooks();
    res.render("index.ejs", { books: books });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});