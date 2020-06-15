import React, { Component, useState, useEffect } from "react";

import Circle from './../svgs/Circle';

export default class AdminDashboard extends Component {
   constructor(props) {
      super(props);
      this.state = { showComponent: "" };
   }

   toggleComponent = (name) => {
      if (name === "add-user") {
         this.setState({
            showComponent: "add-user"
         });
      } else if (name === "add-booking") {
         this.setState({
            showComponent: "add-booking"
         });
      } else if (name === "add-movie-showing") {
         this.setState({
            showComponent: "add-movie-showing"
         });
      } else if (name === "remove-payment") {
         this.setState({
            showComponent: "remove-payment"
         });
      } else if (name === "remove-booking") {
         this.setState({
            showComponent: "remove-booking"
         });
      } else if (name === "change-seats-booking") {
         this.setState({
            showComponent: "change-seats-booking"
         });
      } else if (name === "cancel-booking") {
         this.setState({
            showComponent: "cancel-booking"
         });
      } else if (name === "remove-shows") {
         this.setState({
            showComponent: "remove-shows"
         });
      } else {
         this.setState({
            showComponent: ""
         });
      }
   }

   render() {
      return(
         <React.Fragment>
            <div className="dashboard">
               <h3>Admin Dashboard</h3>
               <p>Here you can add, remove, or update the database.</p>

               <div className="dashboard-column">
                  <div className="component-wrapper">
                     <div className="component-inner">
                        <h4>Add Functions</h4>
                        <div className="item-wrapper" onClick={() => this.toggleComponent("add-user")}>
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>Add User</h5>
                              <p>Add a new user to the database.</p>
                           </div>
                        </div>
                        <div className="item-wrapper" onClick={() => this.toggleComponent("add-booking")}>
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>Add Booking</h5>
                              <p>Add a new booking to the database.</p>
                           </div>
                        </div>
                        <div className="item-wrapper" onClick={() => this.toggleComponent("add-movie-showing")}>
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>Add Movie Showing</h5>
                              <p>Add a new movie showing for an existing theater.</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="component-wrapper">
                     <div className="component-inner">
                        <h4>Remove Functions</h4>
                        <div className="item-wrapper" onClick={() => this.toggleComponent("remove-payment")}>
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>Remove a Payment</h5>
                              <p>Cancel booking and refund payment to user.</p>
                           </div>
                        </div>
                        <div className="item-wrapper" onClick={() => this.toggleComponent("remove-booking")}>
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>Remove Bookings</h5>
                              <p>Remove booking with all status cancelled.</p>
                           </div>
                        </div>
                        <div className="item-wrapper" onClick={() => this.toggleComponent("remove-shows")}>
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>Remove Shows</h5>
                              <p>Remove show on a given date at a Cinema.</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="component-wrapper">
                     <div className="component-inner">
                        <h4>Update Functions</h4>
                        
                        <div className="item-wrapper" onClick={() => this.toggleComponent("cancel-booking")}>
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>Cancel Booking</h5>
                              <p>Cancel booking with status pending.</p>
                           </div>
                        </div>
                        <div className="item-wrapper" onClick={() => this.toggleComponent("change-seats-booking")}>
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>Change seat for booking</h5>
                              <p>Change reserved seat for a user.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="dashboard-column">
                  {this.state.showComponent === "add-user" && <AddUser/>}
                  {this.state.showComponent === "add-booking" && <AddBooking/>}
                  {this.state.showComponent === "add-movie-showing" && <AddMovieShowing/>}

                  {this.state.showComponent === "remove-payment" && <RemovePayment/>}
                  {this.state.showComponent === "remove-booking" && <RemoveBooking/>}
                  {this.state.showComponent === "remove-shows" && <RemoveShows/>}

                  {this.state.showComponent === "cancel-booking" && <CancelBooking/>}
                  {this.state.showComponent === "change-seats-booking" && <ChangeSeatsBooking/>}
               </div>
            </div>
         </React.Fragment>
      );
   }
}

// DONE
const AddUser = () => {
   const [fname, setFName] = useState("");
   const [lname, setLName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [pwd, setPassword] = useState("");

   const onSubmitForm = async e => {
      e.preventDefault();
      try {
         const body = { email, lname, fname, phone, pwd };
         const response = fetch("http://localhost:5000/add-users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
         });

         console.log(response);
         
      } catch (error) {
         console.error(error.message);
      }
   }

   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>Add User</h4>
            <p>Add a user into the database. User’s password will be hashed.</p>

            <form onSubmit={onSubmitForm}>
               <div className="form-row">
                  <div className="form-column">
                     <label>First Name</label>
                     <input type="text" placeholder="ex: John" value={fname} onChange={e => setFName(e.target.value)}/>
                  </div>
                                 
                  <div className="form-column">
                     <label>Last Name</label>
                     <input type="text" placeholder="ex: Smith" value={lname} onChange={e => setLName(e.target.value)}/>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Email</label>
                     <input type="text" placeholder="ex: johnsmith@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                  </div>

                  <div className="form-column">
                     <label>Phone</label>
                     <input type="text" placeholder="ex: xxxxxxxxxx" value={phone} onChange={e => setPhone(e.target.value)}/>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Password</label>
                     <input type="password" value={pwd} onChange={e => setPassword(e.target.value)}/>
                  </div>
               </div>

               <button className="button-submit">Submit</button>
            </form>
         </div>
      </div>
   )
}

// DONE
const AddBooking = () => {
   const [users, setUsers] = useState([]);
   const [cities, setCities] = useState([]);
   const [cinemas, setCinemas] = useState([]);
   const [theaters, setTheaters] = useState([]);
   const [shows, setShows] = useState([]);
   const [movies, setMovies] = useState([]);
   const [seats, setSeats] = useState([]);

   // Booking
   const [bid, setBID] = useState([]);
   const [sid, setSID] = useState([]);
   const [email, setEmail] = useState([]);
   const [ssid, setSSID] = useState([]);

   const getUsers = async() => {
      try {
         const response = await fetch("http://localhost:5000/users");
         const jsonData = await response.json();

         setUsers(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getMovies = async() => {
      try {
         const response = await fetch("http://localhost:5000/movies");
         const jsonData = await response.json();

         setMovies(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }
   
   const getCities = async(mvid) => {
      try {
         const response = await fetch(`http://localhost:5000/cities-mvid/${mvid}`);
         const jsonData = await response.json();

         setCities(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getCinemas = async(city_id) => {
      try {
         const response = await fetch(`http://localhost:5000/cinemas/${city_id}`);
         const jsonData = await response.json();

         setCinemas(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getTheaters = async(cid) => {
      try {
         const response = await fetch(`http://localhost:5000/theaters-cid/${cid}`);
         const jsonData = await response.json();

         setTheaters(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getShows = async(tid) => {
      try {
         const response = await fetch(`http://localhost:5000/shows-plays/${tid}`);
         const jsonData = await response.json();

         setShows(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getCinemaSeats = async(sid) => {
      try {
         const response = await fetch(`http://localhost:5000/show-seats/${sid}`);
         const jsonData = await response.json();

         setSeats(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getBid = async() => {
      try {
         const response = await fetch(`http://localhost:5000/max-bid`);
         const jsonData = await response.json();

         setBID(jsonData[0].max);
      } catch (error) {
         console.log(error.message);
      }
   }

   const onSubmitForm = async e => {
      e.preventDefault();

      var nextBID = parseInt(bid) + 1;
      var status = 'Pending';
      var seats = 1;
      // Current Date
      var currentDate = new Date();
      var bdatetime = ("0" + currentDate.getFullYear()).slice(-4) + "-"
                     + ("0" + currentDate.getMonth()).slice(-2) + "-"
                     + ("0" + currentDate.getDate()).slice(-2) + " "
                     + ("0" + currentDate.getHours()).slice(-2) + ":"
                     + ("0" + currentDate.getMinutes()).slice(-2) + ":"
                     + ("0" + currentDate.getSeconds()).slice(-2) + "-"
                     + "08";
      console.log(bdatetime);
      try {
         const bookingBody = {nextBID, status, bdatetime, seats, sid, email};
         
         const seatBody = {nextBID, ssid};

         const bookingResponse = fetch("http://localhost:5000/add-booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingBody)
         });

         const seatResponse = fetch("http://localhost:5000/update-seats", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(seatBody)
         });

         window.location.reload(false);
         console.log(bookingResponse);
         console.log(seatResponse);
      } catch (error) {
         console.error(error.message);
      }
   }

   function selectedMovieValue(e) {
      getCities(e.currentTarget.value);
   }
   
   function selectedCityValue(e) {
      getCinemas(e.currentTarget.value);
   }

   function selectedCinemaValue(e) {
      getTheaters(e.currentTarget.value);
   }

   function selectedTheaterValue(e) {
      getShows(e.currentTarget.value);
   }

   function selectedShowValue(e) {
      getCinemaSeats(e.currentTarget.value);
      setSID(e.currentTarget.value);
   }

   function selectedSeatValue(e) {
      setSSID(e.currentTarget.value);
   }

   useEffect(() => {
      getUsers();
      getMovies();
      getBid();
   }, []);

   function displayDate(date) {
      var newDate = "";

      for (var i = 0; i < date.length; i++) {
         if (date[i] !== 'T') {
            newDate += date[i];
         } else {
            return newDate;
         }
      }
   }

   function displayTime(time) {
      var newTime = "";
      var countColon = 0;

      for (var i = 0; i < time.length; i++) {
         if (time[i] === ":") {
            countColon++;
            if (countColon === 2) { return newTime; }
            else { newTime += time[i]; }
         } else {
            newTime += time[i];
         }
      }
   }

   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>Add Booking</h4>
            <p>Add a new booking into the database. User, show, movie, seating, theater, and cinema must be valid.</p>

            <form onSubmit={onSubmitForm}>
               <div className="form-row">
                  <div className="form-column">
                     <label>User Email</label>
                     <div className="select-box">
                        <select value={users.email} onChange={e => setEmail(e.target.value)}>
                           <option key={null} value={null}>(Select a User Email)</option>
                           {users.map((user) => <option key={user.email} value={user.email}>{user.email}</option>)}
                        </select>
                     </div>
                  </div>
                                 
                  <div className="form-column">
                     <label>Movies</label>
                     <div className="select-box">
                        <select value={movies.mvid} onChange={selectedMovieValue}>
                           <option key={null} value={null}>(Select a Movie)</option>
                           {movies.map((movie) => <option key={movie.mvid} value={movie.mvid}>{movie.title}</option>)}
                        </select>
                     </div>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Cities</label>
                     <div className="select-box">
                        <select value={cities.city_id} onChange={selectedCityValue}>
                           <option key={null} value={null}>(Select an Available City)</option>
                           {cities.map((city) => <option key={city.city_id} value={city.city_id}>{city.city_name}</option>)}
                        </select>
                     </div>
                  </div>

                  <div className="form-column">
                     <label>Cinemas</label>
                     <div className="select-box">
                        <select value={cinemas.cid} onChange={selectedCinemaValue}>
                           <option key={null} value={null}>(Select a Cinema)</option>
                           {cinemas.map((cinema) => <option key={cinema.cid} value={cinema.cid}>{cinema.cname}</option>)}
                        </select>
                     </div>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Theater</label>
                     <div className="select-box">
                        <select value={theaters.tid} onChange={selectedTheaterValue}>
                           <option key={null} value={null}>(Select a Theater)</option>
                           {theaters.map((theater) => <option key={theater.tid} value={theater.tid}>{theater.tname}</option>)}
                        </select>
                     </div>
                  </div>

                  <div className="form-column">
                     <label>Show Date, Start Time, & End Time</label>
                     <div className="select-box">
                        <select value={shows.sid} onChange={selectedShowValue}>
                           <option key={null} value={null}>(Select a Show Time)</option>
                           {shows.map((show) => <option key={show.sid} value={show.sid}>{"Date: " + displayDate(show.sdate) + " | Start Time: " + displayTime(show.sttime) + " | End Time: " + displayTime(show.edtime)}</option>)}
                        </select>
                     </div>
                  </div>
               </div>
               <div className="form-row">
                  <div className="form-column">
                     <label>Seat</label>
                     <div className="select-box">
                        <select value={seats.ssid} onChange={selectedSeatValue}>
                           <option key={null} value={null}>(Select a Seat)</option>
                           {seats.map((seat) => <option key={seat.ssid} value={seat.ssid}>{"CSID: " + seat.csid + " | Price $" + seat.price}</option>)}
                        </select>
                     </div>
                  </div>
               </div>
               <button className="button-submit">Book</button>
            </form>
         </div>
      </div>
   )
}

// DONE
const AddMovieShowing = () => {
   const [theaters, setTheaters] = useState([]);
   const [shows, setShows] = useState([]);

   // Movie
   const [title, setTitle] = useState([]);
   const [rdate, setRdate] = useState([]);
   const [country, setCountry] = useState([]);
   const [description, setDescription] = useState([]);
   const [duration, setDuration] = useState([]);
   const [lang, setLang] = useState([]);
   const [genre, setGenre] = useState([]);

   // Show
   const [showDate, setShowDate] = useState([]);
   const [startTime, setStartTime] = useState([]);

   // Play
   const [tid, setTID] = useState([]);

   // MAX mvid and sid
   const [maxMVID, setMaxMVID] = useState([]);
   const [maxSID, setMaxSID] = useState([]);

   const getTheaters = async() => {
      try {
         const response = await fetch(`http://localhost:5000/theaters`);
         const jsonData = await response.json();

         setTheaters(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getShows = async(tid) => {
      try {
         const response = await fetch(`http://localhost:5000/shows-plays/${tid}`);
         const jsonData = await response.json();

         setShows(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getMaxMVID = async() => {
      try {
         const response = await fetch(`http://localhost:5000/max-mvid`);
         const jsonData = await response.json();

         setMaxMVID(jsonData[0].max);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getMaxSID = async() => {
      try {
         const response = await fetch(`http://localhost:5000/max-sid`);
         const jsonData = await response.json();

         setMaxSID(jsonData[0].max);
      } catch (error) {
         console.log(error.message);
      }
   }

   useEffect(() => {
      getTheaters();
      getMaxMVID();
      getMaxSID();
   }, []);

   function selectedTheaterValue(e) {
      getShows(e.currentTarget.value);
      setTID(e.currentTarget.value);
   }

   function getEndTime(startTime, duration) {
      var s_hour, s_min, s_sec;
      var d_hour, d_min, d_sec;
      var e_hour, e_min, e_sec;

      s_hour = startTime[0] + startTime[1];
      s_min = startTime[3] + startTime[4];
      s_sec = startTime[6] + startTime[7];
      
      if (duration.length === 6) {
         d_hour = duration[0] + duration[1];
         d_min = duration[2] + duration[3];
         d_sec = duration[4] + duration[5];
      } else if (duration.length === 4) {
         d_min = duration[0] + duration[1];
         d_sec = duration[2] + duration[3];
      } else {
         d_sec = duration[0] + duration[1];
      }

      var min_carry = 0, hour_carry = 0;

      e_sec = parseInt(s_sec) + parseInt(d_sec);
      if (e_sec >= 60) {
         e_sec = parseInt(e_sec) % 60;
         min_carry += 1;
      }

      if (d_min !== undefined) {
         e_min = parseInt(s_min) + parseInt(d_min);
      } else {
         e_min = s_min;
      }

      e_min = parseInt(e_min) + parseInt(min_carry);
      if (e_min >= 60) {
         e_min = parseInt(e_min) % 60;
         hour_carry += 1;
      }
      
      if (d_hour !== undefined) {
         e_hour = parseInt(s_hour) + parseInt(d_hour);
      } else {
         e_hour = s_hour;
      }

      e_hour = parseInt(e_hour) + parseInt(hour_carry);
      if (e_hour >= 24) {
         e_hour = parseInt(e_hour) % 24;
      }

      e_hour = e_hour.toString();
      e_min = e_min.toString();
      e_sec = e_sec.toString();

      if (e_hour[1] === undefined) {
         e_hour = 0 + e_hour[0];
      }

      if (e_min[1] === undefined) {
         e_min = 0 + e_min[0];
      }

      if (e_sec[1] === undefined) {
         e_sec = 0 + e_sec[0];
      }

      return e_hour + ":" + e_min + ":" + e_sec;
   }

   const onSubmitForm = async e => {
      e.preventDefault();

      if (startTime > shows.sttime && startTime < shows.sttime) {
         console.log("Schedule Conflict");
         return;
      }

      var nextMVID = parseInt(maxMVID) + 1;
      var nextSID = parseInt(maxSID) + 1;
      var endTime = getEndTime(startTime, duration);

      console.log(endTime);
      try {
         const movieBody = { nextMVID, title, rdate, country, description, duration, lang, genre};
         const showBody = { nextSID, nextMVID, showDate, startTime, endTime};

         const movieResponse = fetch("http://localhost:5000/add-movie", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movieBody)
         });

         const showResponse = fetch("http://localhost:5000/add-show", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(showBody)
         });


         console.log(movieResponse);
         console.log(showResponse);
         
      } catch (error) {
         console.error(error.message);
      }

      try {
         const playBody = { nextSID, tid };
         
         const playResponse = fetch("http://localhost:5000/add-play", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(playBody)
         });

         console.log(playResponse);
         window.location.reload(false);
      } catch (error) {
         console.error(error.message);
      }
   }

   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>Add Movie Showing</h4>
            <p>Add a showing of a new movie using the Shows, Plays, and Movie tables for a given theater.</p>

            <form onSubmit={onSubmitForm}>
               <div className="form-row">
                  <div className="form-column">
                     <label>Title</label>
                     <input placeholder="ex: Avengers: Batman... Wait What?" value={title} onChange={e => setTitle(e.target.value)}/>
                  </div>
                                 
                  <div className="form-column">
                     <label>Release Date</label>
                     <input placeholder="ex: 2019-01-01" value={rdate} onChange={e => setRdate(e.target.value)}/>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Country</label>
                     <input placeholder="ex: United States" value={country} onChange={e => setCountry(e.target.value)}/>
                  </div>

                  <div className="form-column">
                     <label>Description</label>
                     <input placeholder="ex: Questionable Movie?" value={description} onChange={e => setDescription(e.target.value)}/>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Duration</label>
                     <input placeholder="ex: 3900" value={duration} onChange={e => setDuration(e.target.value)}/>
                  </div>

                  <div className="form-column">
                     <label>Lang</label>
                     <input placeholder="ex: en" value={lang} onChange={e => setLang(e.target.value)}/>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Genre</label>
                     <input placeholder="ex: Meme" value={genre} onChange={e => setGenre(e.target.value)}/>
                  </div>
               </div>
               
               <div className="form-row">
                  <div className="form-column">
                     <label>Theater</label>
                     <div className="select-box">
                        <select value={theaters.tid} onChange={selectedTheaterValue}>
                           <option key={null} value={null}>(Select a Theater)</option>
                           {theaters.map((theater) => <option key={theater.tid} value={theater.tid}>{theater.tid + ": " + theater.tname}</option>)}
                        </select>
                     </div>
                  </div>

                  <div className="form-column">
                     <label>Show Date</label>
                     <input placeholder="ex: 2019-01-01" value={showDate} onChange={e => setShowDate(e.target.value)}/>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Start Time</label>
                     <input placeholder="ex: 18:25:00" value={startTime} onChange={e => setStartTime(e.target.value)}/>
                  </div>
               </div>

               <button className="button-submit">Submit</button>
            </form>
         </div>
      </div>
   )
}

// DONE
const RemovePayment = () => {
   const [bid, setBid] = useState("");

   const removePayment = async bid => {
      try {
         await fetch(`http://localhost:5000/remove-payment-update/${bid}`, {
            method: "PUT"
         });

         await fetch(`http://localhost:5000/remove-payment-delete/${bid}`, {
            method: "DELETE"
         });

      } catch (err) {
         console.error(err.message);
      }
   }
   
   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>Remove Payment</h4>
            <p>Cancel and refund user payment based on their booking id.</p>

            <form onSubmit={removePayment(bid)}>
               <div className="form-row">
                  <div className="form-column">
                     <label>Booking ID</label>
                     <input placeholder="ex: 23" value={bid} onChange={e => setBid(e.target.value)}/>
                  </div>
               </div>

               <button className="button-submit">Submit</button>
            </form>
         </div>
      </div>
   )
}

// DONE
const RemoveBooking = () => {
   const removeBooking = async () => {
      try {
         await fetch("http://localhost:5000/booking-pending", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
         });

         window.location.reload(false);
      } catch (err) {
         console.error(err.message);
      }
   };

   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>Remove Booking</h4>
            <p>Remove all bookings with status of pending and set it to cancelled.</p>

            <button className="button-submit" onClick={removeBooking}>Remove</button>
         </div>
      </div>
   )
}

// DONE
const RemoveShows = () => {
   const [cinemas, setCinemas] = useState([]);
   const [cities, setCities] = useState([]);
   const [shows, setShows] = useState([]);

   const [cid, setCid] = useState([]);
   const [sdate, setSdate] = useState([]);

   const getCities = async() => {
      try {
         const response = await fetch(`http://localhost:5000/cities`);
         const jsonData = await response.json();

         setCities(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getCinemas = async(city_id) => {
      try {
         const response = await fetch(`http://localhost:5000/cinemas/${city_id}`);
         const jsonData = await response.json();

         setCinemas(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getShows = async(cid) => {
      try {
         const response = await fetch(`http://localhost:5000/show-date/${cid}`);
         const jsonData = await response.json();

         setShows(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   function selectedCityValue(e) {
      getCinemas(e.currentTarget.value);
   }

   function selectedCinemaValue(e) {
      getShows(e.currentTarget.value);
      setCid(e.currentTarget.value);
   }

   function selectedShowValue(e) {
      setSdate(e.currentTarget.value);
   }

   useEffect(() => {
      getCities();
   }, []);

   function displayDate(date) {
      var newDate = "";

      for (var i = 0; i < date.length; i++) {
         if (date[i] !== 'T') {
            newDate += date[i];
         } else {
            return newDate;
         }
      }
   }

   const onSubmitForm = async e => {
      e.preventDefault();
      try {
         const response = fetch(`http://localhost:5000/remove-shows-date/${cid}/${sdate}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
         });

         console.log(response);
         window.location.reload(false);
      } catch (error) {
         console.error(error.message);
      }
   }

   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>Remove Shows</h4>
            <p>Remove all the shows on a given date. Any existing booking to the show will be refunded.</p>

            <form onSubmit={onSubmitForm}>
               <div className="form-row">
                  <div className="form-column">
                     <label>Cities</label>
                     <div className="select-box">
                        <select value={cities.city_id} onChange={selectedCityValue}>
                           <option key={null} value={null}>(Select a City)</option>
                           {cities.map((city) => <option key={city.city_id} value={city.city_id}>{city.city_name}</option>)}
                        </select>
                     </div>
                  </div>

                  <div className="form-column">
                     <label>Cinema</label>
                     <div className="select-box">
                        <select value={cinemas.cid} onChange={selectedCinemaValue}>
                           <option key={null} value={null}>(Select a Cinema)</option>
                           {cinemas.map((cinema) => <option key={cinema.cid} value={cinema.cid}>{cinema.cname}</option>)}
                        </select>
                     </div>
                  </div>

                  <div className="form-column">
                     <label>Date</label>
                     <div className="select-box">
                        <select value={shows.sdate} onChange={selectedShowValue}>
                           <option key={null} value={null}>(Select a Show Date)</option>
                           {shows.map((show) => <option key={show.sid} value={show.sdate}>{displayDate(show.sdate)}</option>)}
                        </select>
                     </div>
                  </div>
               </div>

               <button className="button-submit">Submit</button>
            </form>
         </div>
      </div>
   )
}

// DONE
const CancelBooking = () => {
   const cancelBooking = async () => {
      try {
         await fetch("http://localhost:5000/booking-cancelled", {
            method: "DELETE"
         });

         window.location.reload(false);
      } catch (err) {
         console.error(err.message);
      }
   };

   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>Cancel Booking</h4>
            <p>Cancel all booking that have a status of pending.</p>

            <button className="button-submit" onClick={cancelBooking}>Remove</button>
         </div>
      </div>
   )
}

// DOUBLE CHECK
const ChangeSeatsBooking = () => {
   const [emails, setEmail] = useState([]);
   const [bids, setBid] = useState([]);
   const [snos, setSno] = useState([]);
   const [osnos, setOsno] = useState([]);

   const [bid, setBookingID] = useState([]);
   const [csid, setCSID] = useState([]);
   const [sid, setSID] = useState([]);

   const getEmail = async() => {
      try {
         const response = await fetch(`http://localhost:5000/booking-email`);
         const jsonData = await response.json();

         setEmail(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getBid = async(email) => {
      try {
         const response = await fetch(`http://localhost:5000/booking-id/${email}`);
         const jsonData = await response.json();

         setBid(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getOsno = async(bid) => {
      try {
         const response = await fetch(`http://localhost:5000/user-booking-old-seats/${bid}`);
         const jsonData = await response.json();

         setOsno(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getSno = async(price) => {
      try {
         const response = await fetch(`http://localhost:5000/user-booking-seats/${bid}/${price}`);
         const jsonData = await response.json();

         setSno(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   function selectedEmailValue(e) {
      getBid(e.currentTarget.value);
   }

   function selectedBidValue(e) {
      getOsno(e.currentTarget.value);
      setBookingID(e.currentTarget.value);
      setSID(e.currentTarget.show);
   }

   function selectedOsnoValue(e) {
      getSno(e.currentTarget.value);
      setCSID(e.currentTarget.csid);
   }

   useEffect(() => {
      getEmail();
   }, []);

   const onSubmitForm = async e => {
      e.preventDefault();
      try {
         const response = fetch(`http://localhost:5000/update-user-seats/${bid}/${csid}/${sid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
         });

         console.log(response);
         window.location.reload(false);
      } catch (error) {
         console.error(error.message);
      }
   }

   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>Update User Seats</h4>
            <p>Replace the seats reserved for a given booking with different seats in the same theater.</p>

            <form onSubmit={onSubmitForm}>
               <div className="form-row">
                  <div className="form-column">
                     <label>User Email with Booking</label>
                     <div className="select-box">
                        <select value={emails.email} onChange={selectedEmailValue}>
                           <option key={null} value={null}>(Select an Email)</option>
                           {emails.map((email) => <option key={email.email} value={email.email}>{email.email}</option>)}
                        </select>
                     </div>
                  </div>

                  <div className="form-column">
                     <label>Bookings</label>
                     <div className="select-box">
                        <select value={bids.bid} onChange={selectedBidValue}>
                           <option key={null} value={null}>(Select a Booking ID)</option>
                           {bids.map((bid) => <option key={bid.bid} value={bid.bid} show={bid.sid}>{"BID: " + bid.bid + " | Num Seats: " + bid.seats}</option>)}
                        </select>
                     </div>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Old Seat Number</label>
                     <div className="select-box">
                        <select value={osnos.price} onChange={selectedOsnoValue}>
                           <option key={null} value={null}>(Select a Seat to Change)</option>
                           {osnos.map((sno) => <option key={sno.price} value={sno.price} csid={sno.csid}>{"CSID: " + sno.csid + " | stype: " + sno.stype}</option>)}
                        </select>
                     </div>
                  </div>

                  <div className="form-column">
                     <label>New Seat Number</label>
                     <div className="select-box">
                        <select value={snos.bid}>
                           <option key={null} value={null}>(Select a new Seat)</option>
                           {snos.map((sno) => <option key={sno.bid} value={sno.bid}>{"CSID: " + sno.csid + " | stype: " + sno.stype}</option>)}
                        </select>
                     </div>
                  </div>
               </div>

               <button className="button-submit">Submit</button>
            </form>
         </div>
      </div>
   )
}