import 'dotenv/config';
import express from 'express'
import pg from 'pg'

//Environmental Variables
const port = process.env.PORT || 3000;

const app = express()

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'travel-tracker',
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 5432,
});
db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let users = [];
let currentUserId = 1;


async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1",
    [currentUserId]
    );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getCurrentUser() {
    const result = await db.query("SELECT * FROM users");
    users = result.rows;
    return users.find((user)=> user.id == currentUserId);
}

app.get('/', async (req, res) => {
  const countries = await checkVisisted();
  const currentUser = await getCurrentUser();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})