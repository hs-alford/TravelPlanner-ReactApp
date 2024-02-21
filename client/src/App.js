import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BsAirplaneFill } from "/node_modules/react-icons/bs";

import AddDestination from "./components/add-destination.component";
import Destination from "./components/destination.component";
import DestinationsList from "./components/destinations-list.component";

import AddTrip from "./components/add-trip.component";
import Trip from "./components/trip.component";
import TripsList from "./components/trips-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
          <BsAirplaneFill color="white" size="1.5em" />
          <Link to={"/destinations"} className="navbar-brand px-2">
            
            Trip Expert
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/trips"} className="nav-link">
                My Trips
              </Link>
            </li>
            <li className="nav-item">
            
              <Link to={"/destinations"} className="nav-link">
                Destinations
              </Link>
            </li>
            
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TripsList/>} />
            <Route path="/destinations" element={<DestinationsList/>} />
            <Route path="/destinations/add" element={<AddDestination/>} />
            <Route path="/destinations/:id" element={<Destination/>} />
            <Route path="/trips" element={<TripsList/>} />
            <Route path="/trips/add" element={<AddTrip/>} />
            <Route path="/trips/:id" element={<Trip/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
