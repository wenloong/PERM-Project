import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './stylesheets/normalize.css';
import './App.css';

import Logo from './svgs/Logo'
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navigation">
          <div className="logo">
            <Logo/>
          </div>
                
          <div className="links">
            <div className="link-item"><Link to="/admin-dashboard">AD</Link></div>
            <div className="link-item"><Link to="/user-dashboard">UD</Link></div>
          </div>
        </div>

        <Switch>
          <Route path="/admin-dashboard">
            <AdminDashboard/>
          </Route>
          <Route path="/user-dashboard">
            <UserDashboard/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
