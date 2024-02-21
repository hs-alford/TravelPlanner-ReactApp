import React, { Component } from "react";
import DestinationDataService from "../services/destination.service";
import { Link } from "react-router-dom";

export default class DestinationsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveDestinations = this.retrieveDestinations.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDestination = this.setActiveDestination.bind(this);
    this.removeAllDestinations = this.removeAllDestinations.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      destinations: [],
      currentDestination: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveDestinations();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveDestinations() {
    DestinationDataService.getAll()
      .then(response => {
        this.setState({
          destinations: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDestinations();
    this.setState({
      currentDestination: null,
      currentIndex: -1
    });
  }

  setActiveDestination(destination, index) {
    this.setState({
      currentDestination: destination,
      currentIndex: index
    });
  }

  removeAllDestinations() {
    DestinationDataService.deleteAll()
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
      currentDestination: null,
      currentIndex: -1
    });

    DestinationDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          destinations: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, destinations, currentDestination, currentIndex } = this.state;

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
          <h4>Destinations List</h4>
          <Link
              to={"/destinations/add"}
              className="btn btn-sm btn-success mb-2"
            >
              Add
            </Link>
          </div>
          <ul className="list-group">
            {destinations &&
              destinations.map((destination, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveDestination(destination, index)}
                  key={index}
                >
                  {destination.title}
                </li>
              ))}
          </ul>

          <button
            className="m-2 btn-sm btn btn-danger"
            onClick={this.removeAllDestinations}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentDestination ? (
            <div>
              <h4>Destination</h4>

              <ul class="list-group fw-bold-600">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Title:</div>
                    {currentDestination.title}
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Description:</div>
                    {currentDestination.description}
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Price:</div>
                    {"$" + currentDestination.price}                  
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Start Date:</div>
                    {getShortDate(currentDestination.startdate)}
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">End Date:</div>
                    {getShortDate(currentDestination.enddate)}
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Tags:</div>
                    <div className="d-flex edit-tags-list">
                  {currentDestination.tags.length > 0 && currentDestination.tags.map((tag) => (
                  <div className="badge text-bg-secondary tag-badge" key={tag.id}>
                    {tag.name}
                  </div>
                  ))}
                </div>
                  </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Status:</div>
                    {currentDestination.published ? "Published" : "Pending"}
                  </div>
                </li>
              </ul>

              <Link
                to={"/destinations/" + currentDestination.id}
                className="btn btn-warning m-2"
              >
                Edit
              </Link>
              
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Destination...</p>
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

