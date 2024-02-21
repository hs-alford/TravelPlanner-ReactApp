import React, { Component } from "react";
import TripDataService from "../services/trip.service";

export default class AddTrip extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeBudget = this.onChangeBudget.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeTagName = this.onChangeTagName.bind(this); 
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.saveTrip = this.saveTrip.bind(this);
    this.newTrip = this.newTrip.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      budget: 0,
      startdate: null,
      enddate: null,
      tags: [],
      tagName: "",

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeBudget(e) {
    this.setState({
      budget: e.target.value
    });
  }

  onChangeStartDate(e) {
    this.setState({
      startdate: e.target.value
    });
  }

  onChangeEndDate(e) {
    this.setState({
      enddate: e.target.value
    });
  }

  saveTrip() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      budget: this.state.budget,
      startdate: this.state.startdate,
      enddate: this.state.enddate,
      tags: this.state.tags
    };

    TripDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          budget: response.data.budget,
          startdate: response.data.startdate,
          enddate: response.data.enddate,
          tags: response.data.tags,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTrip() {
    this.setState({
      id: null,
      title: "",
      description: "",
      budget: 0,
      startdate: null,
      enddate: null,
      tags: [],

      submitted: false
    });
  }

  onChangeTagName(e) {
    
    this.setState({
      tagName: e.target.value
    });
  }

  addTag(e) {
    this.setState({
      tags: [...this.state.tags, { name: e}]
    });

    this.setState({
      tagName: ""
    });
}

removeTag(tagId) {
  var data = { tags: this.state.tags };
  const tagIndex = data.tags.map(tag => tag.id).indexOf(tagId);
  if (tagIndex > -1) {
    data.tags.splice(tagIndex, 1);
  }
  this.setState({
    tags: data.tags
  });
}

  render() {
    const { tagName } = this.state;
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div className="text-center">
          <h4>Submission Successful!</h4>
          <div className="d-flex justify-content-between">
            <a className="btn btn-primary" href="/trips">
              Return
            </a>
            <button className="btn btn-success" onClick={this.newTrip}>
              Add Another
            </button>
          </div>
        </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget</label>
              <input
                type="number"
                className="form-control"
                id="budget"
                value={this.state.budget}
                onChange={this.onChangeBudget}
                name="budget"
              />
            </div>

            <div className="form-group">
              <label htmlFor="startdate">StartDate</label>
              <input
                type="date"
                className="form-control"
                id="startdate"
                value={this.state.startdate}
                onChange={this.onChangeStartDate}
                name="startdate"
              />
            </div>

            <div className="form-group">
              <label htmlFor="enddate">EndDate</label>
              <input
                type="date"
                className="form-control"
                id="enddate"
                value={this.state.enddate}
                onChange={this.onChangeEndDate}
                name="enddate"
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
                  {this.state.tags && this.state.tags.map((tag) => (
                  <div className="badge text-bg-secondary tag-badge" key={tag.id}>
                    <span>{tag.name}</span>
                    <button type="button" className="btn-close tag-remove-btn"
                    onClick={() => this.removeTag(tag.id)}
                    ></button>
                  </div>
                  ))}
                </div>
              </div>

            <button onClick={this.saveTrip} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
