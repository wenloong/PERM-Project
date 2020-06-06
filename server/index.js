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

app.get("/Users", async (req, res) => {
   try {
      const allUsers = await pool.query("SELECT * FROM Users");
      res.json(allUsers.rows);
   } catch (err) {
      console.error(err.message);
   }
});


app.listen(5000, () => {
   console.log("Server started on port 5000");
});