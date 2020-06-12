import React, { Component } from "react";

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
            <div class="dashboard">
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
                        <div className="item-wrapper">
                           <div className="item-button">
                              <Circle/>
                           </div>
                           <div className="item-desc">
                              <h5>Remove a Payment</h5>
                              <p>Cancel booking and refund payment to user.</p>
                           </div>
                        </div>
                        <div className="item-wrapper" onClick={() => this.toggleComponent("cancel-booking")}>
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
                        
                        <div className="item-wrapper">
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
                  {this.state.showComponent === "change-seats-booking" && <ChangeSeatsBooking/>}
                  {this.state.showComponent === "cancel-booking" && <CancelBooking/>}
                  {this.state.showComponent === "remove-shows" && <RemoveShows/>}
               </div>
            </div>
         </React.Fragment>
      );
   }
}

const AddUser = () => {
   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>Add User</h4>
            <p>Add a user into the database. User’s password will be hashed.</p>

            <form>
               <div className="form-row">
                  <div className="form-column">
                     <label>First Name</label>
                     <input type="text" placeholder="ex: John"/>
                  </div>
                                 
                  <div className="form-column">
                     <label>Last Name</label>
                     <input type="text" placeholder="ex: Smith"/>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Email</label>
                     <input type="text" placeholder="ex: johnsmith@gmail.com"/>
                  </div>

                  <div className="form-column">
                     <label>Phone</label>
                     <input type="text" placeholder="ex: xxx-xxx-xxxx"/>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Password</label>
                     <input type="password" placeholder="ex: smting-secure1234"/>
                  </div>
               </div>

               <button className="button-submit">Submit</button>
            </form>
         </div>
      </div>
   )
}

const AddBooking = () => {
   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>Add Booking</h4>
            <p>Add a new booking into the database. User, show, movie, seating, theater, and cinema must be valid.</p>

            <form>
               <div className="form-row">
                  <div className="form-column">
                     <label>User Email</label>
                     <input placeholder="ex: johnsmith@gmail.com"/>
                  </div>
                                 
                  <div className="form-column">
                     <label>Show</label>
                     <input placeholder="ex: Smith"/>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Movie</label>
                     <input placeholder="ex: johnsmith@gmail.com"/>
                  </div>

                  <div className="form-column">
                     <label>Seating</label>
                     <input placeholder="ex: xxx-xxx-xxxx"/>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Theater</label>
                     <input placeholder="ex: johnsmith@gmail.com"/>
                  </div>

                  <div className="form-column">
                     <label>Cinema</label>
                     <input placeholder="ex: xxx-xxx-xxxx"/>
                  </div>
               </div>

               <button className="button-submit">Submit</button>
            </form>
         </div>
      </div>
   )
}

const AddMovieShowing = () => {
   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>Add Movie Showing</h4>
            <p>Add a showing of a new movie using the Shows, Plays, and Movie tables for a given theater.</p>

            <form>
               <div className="form-row">
                  <div className="form-column">
                     <label>Title</label>
                     <input placeholder="ex: John"/>
                  </div>
                                 
                  <div className="form-column">
                     <label>Duration</label>
                     <input placeholder="ex: Smith"/>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Start Time</label>
                     <input placeholder="ex: johnsmith@gmail.com"/>
                  </div>

                  <div className="form-column">
                     <label>End Time</label>
                     <input placeholder="ex: xxx-xxx-xxxx"/>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Cinema</label>
                     <input placeholder="ex: Harkins"/>
                  </div>

                  <div className="form-column">
                     <label>Theater</label>
                     <input placeholder="ex: Harkins Theater 1"/>
                  </div>
               </div>

               <button className="button-submit">Submit</button>
            </form>
         </div>
      </div>
   )
}

const ChangeSeatsBooking = () => {
   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>Update User Seats</h4>
            <p>Replace the seats reserved for a given booking with different seats in the same theater.</p>

            <form>
               <div className="form-row">
                  <div className="form-column">
                     <label>User Email</label>
                     <input placeholder="ex: johnsmith@gmail.com"/>
                  </div>
               </div>

               <div className="form-row">
                  <div className="form-column">
                     <label>Seat Number</label>
                     <input placeholder="ex: 2"/>
                  </div>
               </div>

               <button className="button-submit">Submit</button>
            </form>
         </div>
      </div>
   )
}

const CancelBooking = () => {
   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>Cancel Booking</h4>
            <p>Cancel and refund a user based on their booking id.</p>

            <form>
               <div className="form-row">
                  <div className="form-column">
                     <label>User Email</label>
                     <input placeholder="ex: johnsmith@gmail.com"/>
                  </div>
               </div>

               <button className="button-submit">Submit</button>
            </form>
         </div>
      </div>
   )
}

const RemoveShows = () => {
   return(
      <div className="component-wrapper">
         <div className="component-inner">
            <h4>Remove Shows</h4>
            <p>Remove all the shows on a given date. Any existing booking to the show will be refunded.</p>

            <form>
               <div className="form-row">
                  <div className="form-column">
                     <label>Date</label>
                     <input placeholder="ex: 2019-01-01"/>
                  </div>

                  <div className="form-column">
                     <label>Cinema</label>
                     <input placeholder="ex: 2019-01-01"/>
                  </div>
               </div>

               <button className="button-submit">Submit</button>
            </form>
         </div>
      </div>
   )
}
