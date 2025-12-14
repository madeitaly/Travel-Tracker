import 'dotenv/config';
import express from 'express'

//Environmental Variables
const port = process.env.PORT || 3000;

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})