import React, { Component } from "react";
import TripDataService from "../services/trip.service";
import { Link } from "react-router-dom";

export default class TripsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTrips = this.retrieveTrips.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTrip = this.setActiveTrip.bind(this);
    this.removeAllTrips = this.removeAllTrips.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      trips: [],
      currentTrip: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTrips();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTrips() {
    TripDataService.getAll()
      .then(response => {
        this.setState({
          trips: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTrips();
    this.setState({
      currentTrip: null,
      currentIndex: -1
    });
  }

  setActiveTrip(trip, index) {
    this.setState({
      currentTrip: trip,
      currentIndex: index
    });
  }

  removeAllTrips() {
    TripDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTrip: null,
      currentIndex: -1
    });

    TripDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          trips: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, trips, currentTrip, currentIndex } = this.state;
   
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div class="d-flex justify-content-between">
          <h4>My Trips</h4>
          <Link
              to={"/trips/add"}
              className="btn btn-sm btn-success mb-2"
            >
              Add
            </Link>
          </div>
          <ul className="list-group">
            {trips &&
              trips.map((trip, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTrip(trip, index)}
                  key={index}
                >
                  {trip.title}
                </li>
              ))}
          </ul>

          <button
            className="m-2 btn-sm btn btn-danger"
            onClick={this.removeAllTrips}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTrip ? (
            <div>
              <h4>Trip</h4>

              <ul class="list-group fw-bold-600">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Title:</div>
                    {currentTrip.title}
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Description:</div>
                    {currentTrip.description}
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Budget:</div>
                    {"$" + currentTrip.budget}                  
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Start Date:</div>
                    {getShortDate(currentTrip.startdate)}
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">End Date:</div>
                    {getShortDate(currentTrip.enddate)}
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Tags:</div>
                    <div className="d-flex edit-tags-list">
                  {currentTrip.tags && currentTrip.tags.map((tag) => (
                  <div className="badge text-bg-secondary tag-badge" key={tag.id}>
                    {tag.name}
                  </div>
                  ))}
                </div>
                  </div>
                </li>
              </ul>


              

              <Link
                to={"/trips/" + currentTrip.id}
                className="btn btn-warning m-2"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Trip...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function getShortDate(date) {
  const shortDate = (new Date(date)).toLocaleDateString();
  return(shortDate);
}

