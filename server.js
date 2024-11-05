import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import env from 'dotenv';
import pg from 'pg';

const app = express();
const port = 3001;
env.config();

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  db.connect();

  app.use(cors({ origin: '*' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));


  app.post("/current_weather", async (req, res) => {


    // console.log("Received POST request:", req.body);

    // const { latitude, longitude } = req.body;
    // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    console.log(req.body);

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    const result = response.data;
    console.log(result);

    res.send(result);
  });

  app.get('/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
  });

  // app.get("/", async (req, res) => {
  //   const result = await db.query("SELECT * FROM weather1"); // Selects mock record
  //   console.log(result);
  //   //res.send(`${result.rows[0].temperature}`);
  // });

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})