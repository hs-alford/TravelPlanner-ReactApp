import React, { Component } from "react";
import DestinationDataService from "../services/destination.service";
import { withRouter } from '../common/with-router';

class Destination extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getDestination = this.getDestination.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.onChangeTagName = this.onChangeTagName.bind(this);
    this.addTag = this.addTag.bind(this);    
    this.removeTag = this.removeTag.bind(this);
    this.updateDestination = this.updateDestination.bind(this);
    this.deleteDestination = this.deleteDestination.bind(this);

    this.state = {
      currentDestination: {
        id: null,
      title: "",
      description: "", 
      published: false,
      price: 0,
      startdate: null,
      enddate: null,
      tags: []
      },
      tagName: "",
      message: ""
    };
  }

  componentDidMount() {
    this.getDestination(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDestination: {
          ...prevState.currentDestination,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentDestination: {
        ...prevState.currentDestination,
        description: description
      }
    }));
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDestination: {
          ...prevState.currentDestination,
          price: price
        }
      };
    });
  }

  onChangeStartDate(e) {
    const startdate = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDestination: {
          ...prevState.currentDestination,
          startdate: startdate
        }
      };
    });
  }

  onChangeEndDate(e) {
    const enddate = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDestination: {
          ...prevState.currentDestination,
          enddate: enddate
        }
      };
    });
  }

  onChangeTagName(e) {
    const tagName = e.target.value;
    this.setState(function(prevState) {
      return {
          ...prevState.currentDestination,
          tagName: tagName
      };
    });
  }

  getDestination(id) {
    DestinationDataService.get(id)
      .then(response => {
        this.setState({
          currentDestination: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentDestination.id,
      title: this.state.currentDestination.title,
      description: this.state.currentDestination.description,
      price: this.state.currentDestination.price,
      startdate: this.state.currentDestination.startdate,
      enddate: this.state.currentDestination.enddate,
      published: status
    };

    DestinationDataService.update(this.state.currentDestination.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentDestination: {
            ...prevState.currentDestination,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateDestination() {
    DestinationDataService.update(
      this.state.currentDestination.id,
      this.state.currentDestination
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The destination was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDestination() {    
    DestinationDataService.delete(this.state.currentDestination.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/destinations');
      })
      .catch(e => {
        console.log(e);
      });
  }

  addTag(newTag) {
    var data = { tags: this.state.currentDestination.tags };
    data.tags.push({ name: newTag })
    this.setState(prevState => ({
      currentDestination: {
        ...prevState.currentDestination,
        tags: data.tags
      }
    }));
    this.setState(prevState => ({
      ...prevState.currentDestination,
      tagName: ""
    })); 
  }

  removeTag(tagId) {
    var data = { tags: this.state.currentDestination.tags };
    const tagIndex = data.tags.map(tag => tag.id).indexOf(tagId);
    console.log("tag index =  " + tagIndex);
    if (tagIndex > -1) {
      data.tags.splice(tagIndex, 1);
    }
    this.setState(prevState => ({
      currentDestination: {
        ...prevState.currentDestination,
        tags: data.tags
      }
    }));
  }

  render() {
    const { currentDestination, tagName } = this.state;

    return (
      <div>
        {currentDestination ? (
          <div className="edit-form">
            <h4>Destination</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentDestination.title}
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
                  value={currentDestination.description}
                  onChange={this.onChangeDescription}
                >
                </textarea>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={currentDestination.price}
                  onChange={this.onChangePrice}
                />
              </div>

              <div className="form-group">
                <label htmlFor="startdate">StartDate</label>
                <input
                  type="date"
                  className="form-control"
                  id="startdate"
                  value={getDateString(currentDestination.startdate)}
                  onChange={this.onChangeStartDate}
                />
              </div>

              <div className="form-group">
                <label htmlFor="enddate">EndDate</label>
                <input
                  type="date"
                  className="form-control"
                  id="enddate"
                  value={getDateString(currentDestination.enddate)}
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
                  {currentDestination.tags.length > 0 && currentDestination.tags.map((tag) => (
                  <div className="badge text-bg-secondary tag-badge" key={tag.id}>
                    <span>{tag.name}</span>
                    <button type="button" className="btn-close tag-remove-btn"
                    onClick={() => this.removeTag(tag.id)}
                    ></button>
                  </div>
                  ))}
                </div>
              </div>


              <div className="form-group">
                <label>
                  Status:
                </label>{" "}
                {currentDestination.published ? "Published" : "Pending"}
              </div>
            </form>
            <div className="d-flex justify-content-around py-2">
              {currentDestination.published ? (
                <button
                  className="btn btn-primary"
                  onClick={() => this.updatePublished(false)}
                >
                  UnPublish
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => this.updatePublished(true)}
                >
                  Publish
                </button>
              )}

              <button
                className="btn btn-danger"
                onClick={this.deleteDestination}
              >
                Delete
              </button>

              <button
                type="submit"
                className="btn btn-success"
                onClick={this.updateDestination}
              >
                Update
              </button>
              
             
            </div>
            <p>{this.state.message}</p>
            <div className="d-flex justify-content-center">
              <a className="btn btn-primary" href="/destinations">
                Return
              </a>
            </div>
            
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Destination...</p>
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

export default withRouter(Destination);