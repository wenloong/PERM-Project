import React, { Component } from "react";

const InputUser = () => {
   const [email, lname, fname, phone, pwd] = useState("");


   return(
      <React.Fragment>
         <h3>Add User</h3>
         <p className="desc">
            Add a new user to the database.
         </p>
         <form onSubmit={onSubmitForm}>
            <input type="text" placeholder="e-mail" onChange={e => setEmail(e.target.value)}/>
            <input type="text" placeholder="last name"/>
         </form>
      </React.Fragment>
   )
}