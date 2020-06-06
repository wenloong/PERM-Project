import React, { Component } from "react";

export default class AdminDashboard extends Component {
   render() {
      return(
         <React.Fragment>
            <h3>Admin Dashboard</h3>
            <p>Here you can add, remove, or update the database.</p>

            <div className="component-wrapper">
               <h3>Add Functions</h3>
               <div className="item-wrapper">
                  <h4>Add User</h4>
                  <p>Add a new user to the database.</p>
               </div>
               <div className="item-wrapper">
                  <h4>Add Booking</h4>
                  <p>Add a new booking to the database.</p>
               </div>
               <div className="item-wrapper">
                  <h4>Add Movie Showing</h4>
                  <p>Add a new movie showing for an existing theater.</p>
               </div>
            </div>

            <div className="component-wrapper">
               <h3>Remove Functions</h3>
               <div className="item-wrapper">
                  <h4>Remove a Payment</h4>
                  <p>Cancel booking and refund payment to user.</p>
               </div>
               <div className="item-wrapper">
                  <h4>Remove bookings</h4>
                  <p>Remove booking with all status cancelled.</p>
               </div>
               <div className="item-wrapper">
                  <h4>Remove Shows</h4>
                  <p>Remove show on a given date at a Cinema.</p>
               </div>
            </div>

            <div className="component-wrapper">
               <h3>Update Functions</h3>
               <div className="item-wrapper">
                  <h4>Cancel Booking</h4>
                  <p>Cancel booking with status pending.</p>
               </div>
               <div className="item-wrapper">
                  <h4>Change seat for booking</h4>
                  <p>Change reserved seat for a user.</p>
               </div>
            </div>
         </React.Fragment>
      );
   }
}