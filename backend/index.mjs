import express from "express";
import cors from 'cors';


const app = express();

const port = 4201

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }

  next();
});

app.get('/', (req, res) => {
  res.sendStatus(404)
})

app.get('/api/post', (req, res) => {
  if (!req.params) {
    res.sendStatus(404)
  }

  res.send(JSON.stringify({ "oke": "okeÏ" }))
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})