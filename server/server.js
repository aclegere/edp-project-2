import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { promises as fs } from "fs";
import pg from "pg";

dotenv.config();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionPlanets = process.env.COLLECTION_PLANETS;
const collectionFilms = process.env.COLLECTION_FILMS;
const collectionCharacters = process.env.COLLECTION_CHARACTERS;
const collectionFilmsCharacters = process.env.COLLECTION_FILMS_CHARACTERS;
const collectionFilmsPlanets = process.env.COLLECTION_FILMS_PLANETS;

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = 3000;

//get request for planets
app.get("/api/planets", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionPlanets);
    const planets = await collection.find({}).toArray();
    res.json(planets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("No planets found!");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});