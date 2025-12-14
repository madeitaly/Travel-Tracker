import 'dotenv/config';
import express from 'express'

//Environmental Variables
const port = process.env.PORT || 3000;

const app = express()

app.use(express.urlencoded({ extended: true }));


let users = [
  { id: 1, name: "Matteo", color: "white" },
];


async function checkVisisted() {
  //const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  //result.rows.forEach((country) => {
  //  countries.push(country.country_code);
  //});
  return countries;
}

app.get('/', (req, res) => {
  const countries = checkVisisted();//await checkVisisted();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})