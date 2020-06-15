import React, { Component, useState, useEffect } from "react";

import Circle from './../svgs/Circle';

export default class UserDashboard extends Component {
   constructor(props) {
      super(props);
      this.state = { showComponent: "" };
   }

   toggleComponent = (name) => {
      if (name === "list-theaters") {
         this.setState({
            showComponent: "list-theaters"
         });
      } else if (name === "list-shows") {
         this.setState({
            showComponent: "list-shows"
         });
      } else if (name === "list-movies") {
         this.setState({
            showComponent: "list-movies"
         });
      } else if (name === "list-pending-booking") {
        this.setState({
           showComponent: "list-pending-booking"
        });
      } else if (name === "list-showsMT") {
         this.setState({
            showComponent: "list-showsMT"
         });
      } else if (name === "list-user-booking") {
         this.setState({
            showComponent: "list-user-booking"
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
            <div class="dashboard">
               <h3>User Dashboard</h3>
               <p>You are currently viewing the dashboard based on the user’s perspective.</p>

               <div className="dashboard-column">
                  <div className="component-wrapper">
                     <div className="component-inner">
                        <h4>List Functions</h4>
                        <div className="item-wrapper" onClick={() => this.toggleComponent("list-theaters")}>
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>List Theaters</h5>
                              <p>List all theaters in a cinema playing a given show.</p>
                           </div>
                        </div>
                        <div className="item-wrapper" onClick={() => this.toggleComponent("list-shows")}>
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>List Shows</h5>
                              <p>List all shows that start at a given time and date.</p>
                           </div>
                        </div>
                        <div className="item-wrapper" onClick={() => this.toggleComponent("list-movies")}>
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>List Movies</h5>
                              <p>List movie titles containing "love" released after 2010.</p>
                           </div>
                        </div>
                        <div className="item-wrapper" onClick={() => this.toggleComponent("list-pending-booking")}>
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>List Pending Booking</h5>
                              <p>List first name, last name, and email of users with a pending booking</p>
                           </div>
                        </div>
                        <div className="item-wrapper" onClick={() => this.toggleComponent("list-showsMT")}>
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>List Shows with Movie Title</h5>
                              <p>
                                 List the title, duration, date, and time of shows <br/>
                                 playing a given movie at a given cinema during a <br/>
                                 date range.
                              </p>
                           </div>
                        </div>
                        <div className="item-wrapper" onClick={() => this.toggleComponent("list-user-booking")}>
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>List User's Booking</h5>
                              <p>
                                 List the movie title, show date & start time, theater <br/>
                                 name, and cinema seat number for all bookings <br/>
                                 of a given user.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="dashboard-column">
                  {this.state.showComponent === "list-theaters" && <ListTheaters/>}
                  {this.state.showComponent === "list-shows" && <ListShows/>}
                  {this.state.showComponent === "list-movies" && <ListMovies/>}
                  {this.state.showComponent === "list-pending-booking" && <ListPendingBooking/>}
                  {this.state.showComponent === "list-showsMT" && <ListShowsMT/>}
                  {this.state.showComponent === "list-user-booking" && <ListUserBooking/>}
               </div>
            </div>
         </React.Fragment>
      );
   }
}

const ListTheaters = () => {
   const [theaters, setTheaters] = useState([]);
   const [show, setShow] = useState([]);

   const getShow = async() => {
      try {
         const response = await fetch("http://localhost:5000/theaters");
         const jsonData = await response.json();

         setShow(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   };

   const onSearchForm = async e => {
      e.preventDefault();
      try {
         const response = await fetch(`http://localhost:5000/theaters/${show}`);
         const jsonData = await response.json();

         setTheaters(jsonData);
      } catch (err) {
         console.error(err.message);
      }
   }

   useEffect(() => {
      getShow();
   });


   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>List Theaters</h4>
            <p>List all theaters in a cinema playing a given show.</p>

            <form onSubmit={onSearchForm}>
               <div className="form-row">
                  <div className="form-column">
                     <label>Show</label>
                     <input type="text" placeholder="ex: 2" value={show} onChange={e => setShow(e.target.value)}/>
                  </div>
               </div>
               <button className="button-search">Search</button>
            </form>

            <table>
               <thead>
                  <tr>
                     <th>tid</th>
                     <th>tname</th>
                  </tr>
               </thead>

               <tbody>
                  {theaters.map(theaters => (
                     <tr>
                        <td>{theaters.tid}</td>
                        <td>{theaters.tname}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}

const ListShows = () => {
   const [shows, setShows] = useState([]);
   const [start_time, setStartTime] = useState([]);
   const [show_date, setShowDate] = useState([]);

   const onSearchForm = async e => {
      e.preventDefault();
      try {
         const response = await fetch(`http://localhost:5000/shows/${start_time}/${show_date}`);
         const jsonData = await response.json();

         setShows(jsonData);
         console.log(jsonData);
      } catch (err) {
         console.error(err.message);
      }
   }

   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>List Shows</h4>
            <p>List all shows that start at a given time and date.</p>

            <form onSubmit={onSearchForm}>
               <div className="form-row">
                  <div className="form-column">
                     <label>Start Time</label>
                     <input type="text" placeholder="ex: 08:25:00" value={start_time} onChange={e => setStartTime(e.target.value)}/>
                  </div>
                                    
                  <div className="form-column">
                     <label>Date</label>
                     <input type="text" placeholder="ex: 2019-01-01" value={show_date} onChange={e => setShowDate(e.target.value)}/>
                  </div>
               </div>
               <button className="button-search">Search</button>
            </form>

            <table>
               <thead>
                  <tr>
                     <th>sid</th>
                     <th>mvid</th>
                     <th>sdate</th>
                     <th>sttime</th>
                     <th>edtime</th>
                  </tr>
               </thead>

               <tbody>
                  {shows.map(shows => (
                     <tr>
                        <td>{shows.sid}</td>
                        <td>{shows.mvid}</td>
                        <td>{shows.sdate}</td>
                        <td>{shows.sttime}</td>
                        <td>{shows.edtime}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}

const ListMovies = () => {
   const [movies, setMovies] = useState([]);


   const getMovies = async() => {
      try {
         const response = await fetch("http://localhost:5000/movies-love")
         const jsonData = await response.json()

         setMovies(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   };

   useEffect(() => {
      getMovies();
   }, []);

   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>List Movies</h4>
            <p>List movie titles containing "love" released after 2010.</p>

            <table>
               <thead>
                  <tr>
                     <th>mvid</th>
                     <th>title</th>
                     <th>rdate</th>
                     <th>country</th>
                     <th>description</th>
                     <th>duration</th>
                     <th>lang</th>
                     <th>genre</th>
                  </tr>
               </thead>

               <tbody>
                  {movies.map(movies => (
                     <tr>
                        <td>{movies.mvid}</td>
                        <td>{movies.title}</td>
                        <td>{movies.rdate}</td>
                        <td>{movies.country}</td>
                        <td>{movies.description}</td>
                        <td>{movies.duration}</td>
                        <td>{movies.lang}</td>
                        <td>{movies.genre}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}

const ListPendingBooking = () => {
   const [pendingBooking, setPendingBooking] = useState([]);

   const getPendingBooking = async() => {
      try {
         const response = await fetch("http://localhost:5000/pending-booking")
         const jsonData = await response.json()

         setPendingBooking(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   };

   useEffect(() => {
      getPendingBooking();
   },[]);

   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>List Pending Booking</h4>
            <p>List the first name, last name, and email of users with pending booking.</p>

            <table>
               <thead>
                  <tr>
                     <th>fname</th>
                     <th>lname</th>
                     <th>email</th>
                  </tr>
               </thead>

               <tbody>
                  {pendingBooking.map(pendingBooking => (
                     <tr>
                        <td>{pendingBooking.fname}</td>
                        <td>{pendingBooking.lname}</td>
                        <td>{pendingBooking.email}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}

const ListShowsMT = () => {
   const [movies, setMovies] = useState([]);
   const [cinemas, setCinemas] = useState([]);
   const [start_date, setStartDate] = useState([]);
   const [end_date, setEndDate] = useState([]);
   const [cid, setCid] = useState([]);
   const [mvid, setMvid] = useState([]);
   const [show, setShow] = useState([]);

   const getMovies = async() => {
      try {
         const response = await fetch("http://localhost:5000/movies");
         const jsonData = await response.json();

         setMovies(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const getCinemas = async(mvid) => {
      try {
         const response = await fetch(`http://localhost:5000/cinemas-mvid/${mvid}`);
         const jsonData = await response.json();

         setCinemas(jsonData);
      } catch (error) {
         console.log(error.message);
      }
   }

   const onSearchForm = async e => {
      e.preventDefault();
      try {
         const response = await fetch(`http://localhost:5000/list-shows-date-range/${cid}/${start_date}/${end_date}/${mvid}`);
         const jsonData = await response.json();

         setShow(jsonData);
         console.log(jsonData);
      } catch (err) {
         console.error(err.message);
      }
   }

   function selectedMovieValue(e) {
      getCinemas(e.currentTarget.value);
      setMvid(e.currentTarget.value);
   }

   function selectedCinemaValue(e) {
      setCid(e.currentTarget.value);
   }

   useEffect(() => {
      getMovies();
   }, []);

   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>List Shows with Movie Title</h4>
            <p>List the title, duration, date, and time of shows playing a given movie at a given cinema during a date range.</p>

            <form onSubmit={onSearchForm}>
               <div className="form-row">
                  <div className="form-column">
                     <label>Movie</label>
                     <div className="select-box">
                        <select value={movies.mvid} onChange={selectedMovieValue}>
                           <option key={null} value={null}>(Select a Movie)</option>
                           {movies.map((movie) => <option key={movie.mvid} value={movie.mvid}>{movie.title}</option>)}
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
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Start Date</label>
                     <input placeholder="ex: 2019-01-01" value={start_date} onChange={e => setStartDate(e.target.value)}/>
                  </div>

                  <div className="form-column">
                     <label>End Date</label>
                     <input placeholder="ex: 2019-02-01" value={end_date} onChange={e => setEndDate(e.target.value)}/>
                  </div>
               </div>
               <button className="button-search">Search</button>
            </form>

            <table>
               <thead>
                  <tr>
                     <th>Movie Title</th>
                     <th>Duration</th>
                     <th>Show Date</th>
                     <th>Start Time</th>
                     <th>End Time</th>
                  </tr>
               </thead>

               <tbody>
                  {show.map(shows => (
                     <tr>
                        <td>{shows.title}</td>
                        <td>{shows.duration}</td>
                        <td>{shows.sdate}</td>
                        <td>{shows.sttime}</td>
                        <td>{shows.edtime}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}

const ListUserBooking = () => {
   const [booking, setBooking] = useState([]);
   const [seatNumber, setSeatNumber] = useState([]);
   const [email, setEmail] = useState([]);

   const onSearchForm = async e => {
      e.preventDefault();
      try {
         const response = await fetch(`http://localhost:5000/list-booking-info/${email}`);
         const jsonData = await response.json();

         setBooking(jsonData);
         
         const responseSeat = await fetch(`http://localhost:5000/list-booking-seat-info/${jsonData[0].bid}`);
         const jsonDataSeat = await responseSeat.json();
         
         setSeatNumber(jsonDataSeat);
      } catch (err) {
         console.error(err.message);
      }
   }

   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>List User Booking</h4>
            <p>List the movie title, show date & start time, theather name, and cinema seat number for all booking of a given user.</p>

            <form onSubmit={onSearchForm}>
               <div className="form-row">
                  <div className="form-column">
                     <label>User Email</label>
                     <input placeholder="ex: johnsmith@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                  </div>
               </div>
               <button className="button-search">Search</button>
            </form>

            <table>
               <thead>
                  <tr>
                     <th>bid</th>
                     <th>sdate</th>
                     <th>sttime</th>
                     <th>edtime</th>
                     <th>title</th>
                     <th>tname</th>
                     <th>sno</th>
                  </tr>
               </thead>

               <tbody>
                  {booking.map(booking => (
                     <tr>
                        <td>{booking.bid}</td>
                        <td>{booking.sdate}</td>
                        <td>{booking.sttime}</td>
                        <td>{booking.edtime}</td>
                        <td>{booking.title}</td>
                        <td>{booking.tname}</td>
                     </tr>
                  ))}
                  {seatNumber.map(seatNumber => (
                     <tr>
                        <td>{seatNumber.sno}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}