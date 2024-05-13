import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { promises as fs } from "fs";
import pg from "pg";

dotenv.config();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionPlanets = process.env.COLLECTIONS_PLANETS;
const collectionCharacters = process.env.COLLECTION_CHARACTERS;
const collectionFilms = process.env.COLLECTION_FILMS;

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

//⦁	get /api/characters
app.get("/api/characters", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionCharacters);
    const characters = await collection.find({}).toArray();
    res.json(characters);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("No characters found!");
  }
});

//⦁	get /api/films
app.get("/api/films", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionFilms);
    const films = await collection.find({}).toArray();
    res.json(films);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("No films found!");
  }
});

//⦁ get	/api/characters/:id
app.get("/api/characters/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionCharacters);
    const character = await collection.find({ id: id }).toArray();
    res.json(character);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("No character found!");
  }
});
//⦁	/api/films/:id
app.get("/api/films/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionFilms);
    const film = await collection.find({ id: id }).toArray();
    res.json(film);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("No films found!");
  }
});
//⦁	/api/planets/:id
app.get("/api/planets/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionPlanets);
    const planet = await collection.find({ id: id }).toArray();
    res.json(planet);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("No planet found!");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
