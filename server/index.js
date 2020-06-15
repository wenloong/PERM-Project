const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// Routes
var sha256 = function sha256(ascii) {
   function rightRotate(value, amount) {
      return (value>>>amount) | (value<<(32 - amount));
   };
   
   var mathPow = Math.pow;
   var maxWord = mathPow(2, 32);
   var lengthProperty = 'length'
   var i, j; // Used as a counter across the whole file
   var result = ''

   var words = [];
   var asciiBitLength = ascii[lengthProperty]*8;
   
   //* caching results is optional - remove/add slash from front of this line to toggle
   // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
   // (we actually calculate the first 64, but extra values are just ignored)
   var hash = sha256.h = sha256.h || [];
   // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
   var k = sha256.k = sha256.k || [];
   var primeCounter = k[lengthProperty];
   /*/
   var hash = [], k = [];
   var primeCounter = 0;
   //*/

   var isComposite = {};
   for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
         for (i = 0; i < 313; i += candidate) {
            isComposite[i] = candidate;
         }
         hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
         k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
      }
   }
   
   ascii += '\x80' // Append Ƈ' bit (plus zero padding)
   while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
   for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j>>8) return; // ASCII check: only accept characters in range 0-255
      words[i>>2] |= j << ((3 - i)%4)*8;
   }
   words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
   words[words[lengthProperty]] = (asciiBitLength)
   
   // process each chunk
   for (j = 0; j < words[lengthProperty];) {
      var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
      var oldHash = hash;
      // This is now the undefinedworking hash", often labelled as variables a...g
      // (we have to truncate as well, otherwise extra entries at the end accumulate
      hash = hash.slice(0, 8);
      
      for (i = 0; i < 64; i++) {
         var i2 = i + j;
         // Expand the message into 64 words
         // Used below if 
         var w15 = w[i - 15], w2 = w[i - 2];

         // Iterate
         var a = hash[0], e = hash[4];
         var temp1 = hash[7]
            + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
            + ((e&hash[5])^((~e)&hash[6])) // ch
            + k[i]
            // Expand the message schedule if needed
            + (w[i] = (i < 16) ? w[i] : (
                  w[i - 16]
                  + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                  + w[i - 7]
                  + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
               )|0
            );
         // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
         var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
            + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
         
         hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
         hash[4] = (hash[4] + temp1)|0;
      }
      
      for (i = 0; i < 8; i++) {
         hash[i] = (hash[i] + oldHash[i])|0;
      }
   }
   
   for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
         var b = (hash[i]>>(j*8))&255;
         result += ((b < 16) ? 0 : '') + b.toString(16);
      }
   }
   return result;
};

app.post("/add-users", async(req, res) => {
   try {
      const { email, lname, fname, phone, pwd } = req.body;

      const newUser = await pool.query(
         "INSERT INTO Users (email, lname, fname, phone, pwd) VALUES($1, $2, $3, $4, $5) RETURNING *",
         [email, lname, fname, phone, sha256(pwd)]
      );

      res.json(newUser.rows[0]);
   } catch (err) {
      console.error(err.message);
   }
});

app.post("/add-movie", async(req, res) => {
   try {
      const { nextMVID, title, rdate, country, description, duration, lang, genre } = req.body;

      const newMovie = await pool.query(
         "INSERT INTO movies (mvid, title, rdate, country, description, duration, lang, genre) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
         [nextMVID, title, rdate, country, description, duration, lang, genre]
      );

      res.json(newMovie.rows[0]);
   } catch (error) {
      console.error(error.message);
   }
});

app.post("/add-show", async(req, res) => {
   try {
      const { nextSID, nextMVID, showDate, startTime, endTime} = req.body;

      const newShow = await pool.query(
         "INSERT INTO shows (sid, mvid, sdate, sttime, edtime) VALUES($1, $2, $3, $4, $5)",
         [nextSID, nextMVID, showDate, startTime, endTime]
      );

      res.json(newShow.rows[0]);
   } catch (error) {
      console.error(error.message);
   }
});

app.post("/add-play", async(req, res) => {
   try {
      const { nextSID, tid } = req.body;

      const newPlay = await pool.query(
         "INSERT INTO plays (sid, tid) VALUES($1, $2)",
         [nextSID, tid]
      );

      res.json(newPlay.rows[0]);
   } catch (error) {
      console.error(error.message);
   }
});

// DELETE FOR TESTING
app.delete("/users/:email", async(req, res) => {
   try {
      const { email } = req.params;
      const deleteUser = await pool.query("DELETE FROM users WHERE email=$1", [email]);
      res.json("User Deleted");
   } catch (error) {
      console.log(error.message);
   }
});

/*
   SELECT * for all database
*/
app.get("/users", async(req, res) => {
   try {
      const allUsers = await pool.query("SELECT * FROM users");
      res.json(allUsers.rows);
   } catch (err) {
      console.error(err.message);
   }
});



app.get("/cities", async(req, res) => {
   try {
      const allCities = await pool.query("SELECT * FROM cities");
      res.json(allCities.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/movies", async(req, res) => {
   try {
      const allMovies = await pool.query("SELECT * FROM movies");
      res.json(allMovies.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/theaters", async(req, res) => {
   try {
      const allTheaters = await pool.query("SELECT * FROM theaters");
      res.json(allTheaters.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/max-mvid", async(req, res) => {
   try {
      const maxMVID = await pool.query("SELECT MAX(mvid) from movies");
      res.json(maxMVID.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/max-sid", async(req, res) => {
   try {
      const maxSID = await pool.query("SELECT MAX(sid) from shows");
      res.json(maxSID.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/max-bid", async(req, res) => {
   try {
      const maxBID = await pool.query("SELECT MAX(bid) from bookings");
      res.json(maxBID.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.post("/add-booking", async(req, res) => {
   try {
      const { nextBID, status, bdatetime, seats, sid, email } = req.body;

      const addBooking = await pool.query(
         "INSERT into bookings(bid,status,bdatetime,seats,sid,email) VALUES ($1,$2,$3,$4,$5,$6)",
         [`${nextBID}`, `${status}`, `${bdatetime}`, `${seats}`, `${sid}`, `${email}`]
      );
      res.json(addBooking.rows[0]);
   } catch (err) {
      console.error(err.message);
   }
});

app.put("/update-seats", async(req, res) => {
   try {
      const {nextBID, ssid} = req.body;

      const updateSeat = await pool.query(
         "UPDATE showseats SET bid=$1 WHERE ssid=$2",
         [`${nextBID}`, `${ssid}`]
      );
      res.json(updateSeat.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/cities-mvid/:mvid", async(req, res) => {
   var mvid = req.params.mvid;

   try {
      const allCities = await pool.query(
         "SELECT * FROM cities WHERE city_id IN (SELECT city_id FROM cinemas WHERE cid in (SELECT cid FROM theaters WHERE tid IN (SELECT tid FROM plays WHERE sid IN (SELECT sid FROM shows WHERE mvid IN (SELECT mvid FROM movies WHERE mvid=$1)))))",
         [`${mvid}`]
      );
      res.json(allCities.rows);
   } catch (err) {
      console.error(err.message);
   }
})

app.get("/theaters-cid/:cid", async(req, res) => {
   var cid = req.params.cid;

   try {
      const allTheaters = await pool.query(
         "SELECT * FROM theaters WHERE cid=$1",
         [`${cid}`]
      );
      res.json(allTheaters.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/shows-plays/:tid", async(req, res) => {
   var tid = req.params.tid;

   try {
      const allShows = await pool.query(
         "SELECT * FROM shows WHERE sid IN (SELECT sid FROM plays WHERE tid=$1)", 
         [`${tid}`]);
      res.json(allShows.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/cinemas/:city_id", async(req, res) => {
   try {
      var city_id = req.params.city_id;
      
      const allCinemas = await pool.query(
         "SELECT * FROM cinemas where city_id=$1", 
         [`${city_id}`]
      );
      res.json(allCinemas.rows);
   } catch (error) {
      console.log(error.message);
   }
});

app.get("/show-seats/:sid", async(req, res) => {
   var sid = req.params.sid;

   try {      
      const allSeats = await pool.query(
         "SELECT * FROM showseats WHERE bid is NULL AND sid=$1", 
         [`${sid}`]
      );
      res.json(allSeats.rows)
   } catch (error) {
      console.log(error.message);
   }
});

app.get("/show-date/:cid", async(req, res) => {
   var cid = req.params.cid;

   try {
      const allShows = await pool.query(
         "SELECT * FROM shows WHERE sid IN (SELECT sid FROM plays WHERE tid IN (SELECT tid FROM theaters WHERE cid IN (SELECT cid FROM cinemas WHERE cid=$1)))",
         [`${cid}`]
      );
      res.json(allShows.rows);
   } catch (error) {
      console.log(error.message);
   }
});

/*
   Updating Seats
*/
app.get("/booking-email", async(req, res) => {
   try {
      const allBooking = await pool.query("SELECT bid, email from bookings;");
      res.json(allBooking.rows);
   } catch (error) {
      console.log(error.message);
   }
});

app.get("booking-id/:email", async(req, res) => {
   var email = req.params.email;

   try {
      const allBooking = await pool.query(
         "SELECT * from bookings where email=$1",
         [`${email}`]
      )
      res.json(allBooking.rows);
   } catch (error) {
      console.log(error.message);
   }
});

app.get("/user-booking-old-seats/:bid", async(req, res) => {
   var bid = req.params.bid;

   try {
      const allSeats = await pool.query(
         "SELECT * FROM showseats S, cinemaseats C WHERE S.csid = C.csid AND bid=$1",
         [`${bid}`]
      );
      res.json(allSeats.rows);
   } catch (error) {
      console.log(error.message);
   }
});

app.get("/user-booking-seats/:bid/:price", async(req, res) => {
   var bid = req.params.bid;
   var price = req.params.price;

   try {
      const allSeats = await pool.query(
         "SELECT * FROM showseats S, cinemaseats C WHERE S.csid = C.csid AND bid=$1 AND price<=$2",
         [`${bid}`, `${price}`]
      );
      res.json(allSeats.rows);
   } catch (error) {
      console.log(error.message);
   }
});

app.put("/update-user-seats/:bid/:csid/:sid", async(req, res) => {
   var bid = req.params.bid;
   var csid = req.params.csid;
   var sid = req.params.sid;

   try {
      const allSeats = await pool.query(
         "UPDATE showseats S SET bid=$1 WHERE S.csid=$2 AND S.sid=$3",
         [`${bid}`, `${csid}`, `${sid}`]
      );
      res.json(allSeats.rows);
   } catch (error) {
      console.log(error.message);
   }
})

/*
   Remove / Delete Function for description
*/
app.put("/booking-pending", async(req, res) => {
   try {
      await pool.query("UPDATE bookings SET status='Cancelled' WHERE status='Pending'");
      res.json("Pending Bookings Cancelled!");
   } catch (err) {
      console.log(err.message);
   }
});

app.delete("/booking-cancelled", async(req, res) => {
   try {
      await pool.query("DELETE FROM bookings WHERE status='Cancelled'");
      res.json("Bookings Deleted!");
   } catch (err) {
      console.log(err.message);
   }
});

app.put(`/remove-payment-update/:bid`, async(req, res) => {
   try {
      var bid = req.params.bid;

      await pool.query("UPDATE bookings SET status = 'Cancelled' WHERE bid=$1", [`${bid}`]);
      await pool.query("UPDATE showseats SET bid = NULL WHERE bid=$1", [`${bid}`]);

      res.json("Payment Updated!");
   } catch (err) {
      console.log(err.message);
   }
});

app.delete(`/remove-payment-delete/:bid`, async(req, res) => {
   try {
      var bid = req.params.bid;

      await pool.query("DELETE FROM payments WHERE bid=$1", [`${bid}`]);

      res.json("Payment Deleted!");
   } catch (err) {
      console.log(err.message);
   }
});

app.delete("/remove-shows-date/:cid/:show_date", async(req, res) => {
   try {
      var cid = req.params.cid;
      var show_date = req.params.show_date;

      await pool.query(
         "DELETE FROM plays P USING shows S, theaters T, cinemas C WHERE S.sdate=$1 AND P.sid=S.sid AND P.tid=T.tid AND T.cid=$2",
         [`${show_date}`, `${cid}`]
      );
      res.json("Show Deleted!");
   } catch (err) {
      console.log(err.message);
   }
});

/*
   Get Functions for description
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

app.get("/movies-love", async(req, res) => {
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

app.get("/cinemas-mvid/:mvid", async(req, res) => {
   try {
      var mvid = req.params.mvid;
      const cinemaMovie = await pool.query(
         "SELECT * FROM cinemas WHERE cid IN (SELECT cid FROM theaters WHERE tid IN (SELECT tid FROM plays WHERE sid IN (SELECT sid FROM shows WHERE mvid IN (SELECT mvid FROM movies WHERE mvid=$1))))",
         [`${mvid}`]
      );
      res.json(cinemaMovie.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/list-shows-date-range/:cinema/:start_date/:end_date/:mvid", async(req, res) => {
   try {
      var cinema = req.params.cinema;
      var startDate = req.params.start_date;
      var endDate = req.params.end_date;
      var mvid = req.params.mvid;

      startDate += 'T08:00:00.000Z';
      endDate += 'T08:00:00.000Z';

      const allShows = await pool.query(
         "SELECT M.title, M.duration, S.sdate,S.sttime,S.edtime FROM theaters T, plays P, shows S, movies M WHERE T.cid=$1 AND S.mvid = M.mvid AND P.sid = S.sid AND T.tid = P.tid and S.sdate BETWEEN $2 AND $3 AND M.mvid=$4", 
         [`${cinema}`, `${startDate}`, `${endDate}`, `${mvid}`]
      );
      
      res.json(allShows.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/list-booking-info/:email", async(req, res) => {
   try {
      var email = req.params.email;

      const userBooking = await pool.query(
         "SELECT B.bid, S.sdate,S.sttime, S.edtime, M.title, T.tname FROM bookings B, shows S, movies M, theaters T,plays P WHERE S.sid=P.sid AND P.tid=T.tid AND B.sid=S.sid AND S.mvid=M.mvid AND B.email=$1",
         [`${email}`]
      );
      res.json(userBooking.rows);
   } catch (err) {
      console.error(err.message);
   }
});

app.get("/list-booking-seat-info/:bid", async(req, res) => {
   try {
      var bid = req.params.bid;

      const userBooking = await pool.query(
         "SELECT sno FROM showseats S, cinemaseats C WHERE S.csid = C.csid AND bid=$1 ORDER BY C.sno ASC",
         [`${bid}`]
      );
      res.json(userBooking.rows);
   } catch (err) {
      console.error(err.message);
   }
});


app.listen(5000, () => {
   console.log("Server started on port 5000");
});