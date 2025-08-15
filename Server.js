const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const MONGO_URI = "mongodb+srv://movies:kumar2002@cluster0.hne66h1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const MovieSchema  = mongoose.Schema({
    name: String,
    clue: [String]
})

const Movie = mongoose.model("Movie", MovieSchema);

mongoose.connect(MONGO_URI).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});


app.post("/movies", async (req, res) => {
    try {
        const { name, clue } = req.body;
        const movie = new Movie({ name, clue });
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        console.error("Error creating movie:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
