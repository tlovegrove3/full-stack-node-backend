// //setup.. this is similar to how we do html tags

// const express = require("express");
// //we have to use cors in order to host a front end and back and on the same device
// var cors = require("cors");
// //activate or tell this app variable to be an express server
// const app = express();
// const Song = require("./models/songs");
// app.use(cors());
// app.use(express.json()); //to parse json data
// const router = express.Router();

// //grab all the songs in the db

// router.get("/songs", async (req, res) => {
//   try {
//     const songs = await Song.find();
//     res.json(songs);
//   } catch (error) {
//     console.error("Error fetching songs:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// //making an api using routes
// //routes are used to handle browser requests
// //they look like URLs, except when a browser requests a route, it is automatically handled by using a funciton.

// //GET or a regular request when someone goes to http://localhost:3000/hello
// //when using a function in a route we almost always have a parameter and handle a response and request
// // app.get("/hello", function(req, res){
// //     res.send("<h1>Hello Express</h1>")
// // })

// // app.get("/goodbye", function(req, res){
// //     res.send("<h1>Goodbye, Express!</h1>")
// // })

// // router.get("/songs", function (req, res) {
// //   const songs = [
// //     {
// //       title: "Uptown Funk",
// //       artist: "Bruno Mars",
// //       popularity: "10",
// //       releaseDate: new Date(2011, 9, 22),
// //       genre: ["funk", "boogie"],
// //     },
// //     {
// //       title: "Happy",
// //       artist: "Pharrell Williams",
// //       popularity: "10",
// //       releaseDate: new Date(2013, 11, 21),
// //       genre: ["soul", "new soul"],
// //     },
// //   ];

// //   res.json(songs);
// // });

// //all requests that usually use an api start with /api... so the url would be localhost:3000/api/songs
// app.use("/api", router);

// app.listen(3000);
