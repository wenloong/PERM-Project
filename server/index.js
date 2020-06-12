const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// Routes

app.post("/Users", async(req, res) => {
   try {
      const { email, lname, fname, phone, pwd } = req.body;
      const newUser = await pool.query(
         "INSERT INTO Users (email, lname, fname, phone, pwd) VALUES($1, $2, $3, $4, $5) RETURNING *",
         [email, lname, fname, phone, pwd]
      );

      res.json(newUser);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/Users", async(req, res) => {
   try {
      const allUsers = await pool.query("SELECT * FROM Users");
      res.json(allUsers.rows);
   } catch (err) {
      console.error(err.message);
   }
});


/*
   Get Functions
*/
app.get("/theaters/:mvid", async(req, res) => {
   try {
      var mvid = req.params.mvid;

      const allTheaters = await pool.query(
         "SELECT tid, tname FROM theaters WHERE tid IN (SELECT tid FROM plays WHERE sid IN (SELECT sid FROM shows WHERE mvid=$1))",
         [`${mvid}`]
      );

      res.json(allTheaters.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/shows/:start_time/:show_date", async(req, res) => {
   // var start_time = req.body.start_time;
   // var show_date = req.body.show_date;

   try {
      var startTime = req.params.start_time;
      var showDate = req.params.show_date;

      showDate += 'T08:00:00.000Z';

      const allShows = await pool.query(
         "SELECT * FROM shows WHERE sttime=$1::time AND sdate=$2::date", 
         [`${startTime}`, `${showDate}`]
      );
      
      res.json(allShows.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/movies", async(req, res) => {
   try {
      const allMovies = await pool.query("SELECT * FROM movies WHERE title LIKE '%Love%' and rdate >= '2011-01-01'::date");
      res.json(allMovies.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/pending-booking", async(req, res) => {
   try {
      const pendingBooking = await pool.query("SELECT fname, lname, email FROM users WHERE email IN (SELECT email FROM bookings WHERE status='Pending')");
      res.json(pendingBooking.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.listen(5000, () => {
   console.log("Server started on port 5000");
});