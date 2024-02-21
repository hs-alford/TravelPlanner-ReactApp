import React, { Component } from "react";
import TripDataService from "../services/trip.service";
import { withRouter } from '../common/with-router';

class Trip extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTrip = this.getTrip.bind(this);
    this.onChangeBudget = this.onChangeBudget.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeTagName = this.onChangeTagName.bind(this);
    this.addTag = this.addTag.bind(this);    
    this.removeTag = this.removeTag.bind(this);
    this.updateTrip = this.updateTrip.bind(this);
    this.deleteTrip = this.deleteTrip.bind(this);

    this.state = {
      currentTrip: {
        id: null,
      title: "",
      description: "", 
      budget: 0,
      startdate: null,
      enddate: null,
      tags: []
      },
      tagName: "",
      message: ""
    };
  }

  componentDidMount() {
    this.getTrip(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTrip: {
          ...prevState.currentTrip,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTrip: {
        ...prevState.currentTrip,
        description: description
      }
    }));
  }

  onChangeBudget(e) {
    const budget = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTrip: {
          ...prevState.currentTrip,
          budget: budget
        }
      };
    });
  }

  onChangeStartDate(e) {
    const startdate = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTrip: {
          ...prevState.currentTrip,
          startdate: startdate
        }
      };
    });
  }

  onChangeEndDate(e) {
    const enddate = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTrip: {
          ...prevState.currentTrip,
          enddate: enddate
        }
      };
    });
  }

  onChangeTagName(e) {
    const tagName = e.target.value;
    this.setState(function(prevState) {
      return {
          ...prevState.currentTrip,
          tagName: tagName
      };
    });
  }

  getTrip(id) {
    TripDataService.get(id)
      .then(response => {
        this.setState({
          currentTrip: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTrip() {
    TripDataService.update(
      this.state.currentTrip.id,
      this.state.currentTrip
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The trip was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTrip() {    
    TripDataService.delete(this.state.currentTrip.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/trips');
      })
      .catch(e => {
        console.log(e);
      });
  }

  addTag(newTag) {
    var data = { tags: this.state.currentTrip.tags };
    data.tags.push({ name: newTag })
    this.setState(prevState => ({
      currentTrip: {
        ...prevState.currentTrip,
        tags: data.tags
      }
    }));
    this.setState(prevState => ({
      ...prevState.currentTrip,
      tagName: ""
    })); 
  }

  removeTag(tagId) {
    var data = { tags: this.state.currentTrip.tags };
    const tagIndex = data.tags.map(tag => tag.id).indexOf(tagId);
    console.log("tag index =  " + tagIndex);
    if (tagIndex > -1) {
      data.tags.splice(tagIndex, 1);
    }
    this.setState(prevState => ({
      currentTrip: {
        ...prevState.currentTrip,
        tags: data.tags
      }
    }));
  }

  render() {
    const { currentTrip, tagName } = this.state;

    return (
      <div>
        {currentTrip ? (
          <div className="edit-form">
            <h4>Trip</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTrip.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                  type="text"
                  className="form-control" 
                  id="description" 
                  rows="4"
                  value={currentTrip.description}
                  onChange={this.onChangeDescription}
                >
                </textarea>
              </div>
              <div className="form-group">
                <label htmlFor="budget">Budget</label>
                <input
                  type="number"
                  className="form-control"
                  id="budget"
                  value={currentTrip.budget}
                  onChange={this.onChangeBudget}
                />
              </div>

              <div className="form-group">
                <label htmlFor="startdate">StartDate</label>
                <input
                  type="date"
                  className="form-control"
                  id="startdate"
                  value={getDateString(currentTrip.startdate)}
                  onChange={this.onChangeStartDate}
                />
              </div>

              <div className="form-group">
                <label htmlFor="enddate">EndDate</label>
                <input
                  type="date"
                  className="form-control"
                  id="enddate"
                  value={getDateString(currentTrip.enddate)}
                  onChange={this.onChangeEndDate}
                />
              </div>


              <div className="form-group">
                <label htmlFor="tagName">Tags</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="tagName"
                    value={tagName}
                    onChange={this.onChangeTagName}
                  />
                    <button className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => this.addTag(tagName)}
                    >
                      Add
                    </button>

                </div>
                <div className="d-flex edit-tags-list">
                  {currentTrip.tags && currentTrip.tags.map((tag) => (
                  <div className="badge text-bg-secondary tag-badge" key={tag.id}>
                    <span>{tag.name}</span>
                    <button type="button" className="btn-close tag-remove-btn"
                    onClick={() => this.removeTag(tag.id)}
                    ></button>
                  </div>
                  ))}
                </div>
              </div>



            </form>
            <div class="d-flex justify-content-around py-2">

              <button
                className="btn btn-danger"
                onClick={this.deleteTrip}
              >
                Delete
              </button>

              <button
                type="submit"
                className="btn btn-success"
                onClick={this.updateTrip}
              >
                Update
              </button>
              <p>{this.state.message}</p>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Trip...</p>
          </div>
        )}
      </div>
    );
  }
}

function getDateString(date) {
  const newDate = new Date(date).toLocaleDateString('en-CA') 
  return(newDate);
}

export default withRouter(Trip);