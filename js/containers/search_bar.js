import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStops, fetchStopID, fetchTrips, fetchTripsID } from '../actions/index';
import Schedule from './schedule';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import StationMap from '../components/google_map';

class SearchBar extends Component {
  componentWillMount() {
    this.props.fetchStops();
    this.props.fetchStopID();
    this.props.fetchTrips();
    this.props.fetchTripsID();
  }

  getResult() {
    this.setState({ result: null });
    var depID = [], arrID = [];
    var depPos, arrPos;
    this.props.ID.map((stop) => {
      if (stop.stop_name==this.state.departure) {
        depPos = { lat: stop.stop_lat, lon: stop.stop_lon};
        depID.push(stop.stop_id);
      }
      else if (stop.stop_name==this.state.arrival) {
        arrPos = { lat: stop.stop_lat, lon: stop.stop_lon};
        arrID.push(stop.stop_id);
      }
    });
    this.setState({ depPos, arrPos });
    var depTrips = [], arrTrips = [];
    this.props.trips.map((trip) => {
      if (depID.indexOf(trip.stop_id) > -1) {
        depTrips.push(trip);
      }
      else if (arrID.indexOf(trip.stop_id) > -1) {
        arrTrips.push(trip);
      }
    });
    depTrips.map((trip) => {
      this.props.tripsid.map((id) => {
        if (id.trip_id==trip.trip_id) {
          trip.name = id.service_id;
        }
      });
    });
    var result = [];
    depTrips.map((trip1) => {
      arrTrips.map((trip2) => {
        if (trip1.trip_id==trip2.trip_id && trip1.stop_sequence<trip2.stop_sequence && trip1.name.indexOf(this.state.date)>-1) {
          var minute = trip2.arrival_time.substring(trip2.arrival_time.length-5, trip2.arrival_time.length-3) - trip1.departure_time.substring(trip1.departure_time.length-5, trip1.departure_time.length-3);
          var hour = trip2.arrival_time.substring(0, trip2.arrival_time.length-6) - trip1.departure_time.substring(0, trip1.departure_time.length-6);
          if (minute<=0) {
            hour = hour - 1;
            minute = minute + 60;
          }
          var duration = hour+'h'+minute+'m';
          console.log(duration);
          result.push({
            departure_time: trip1.departure_time.substring(0, trip1.departure_time.length-3),
            arrival_time: trip2.arrival_time.substring(0, trip2.arrival_time.length-3),
            name: trip1.name,
            id: trip1.trip_id,
            duration: duration
          });
        }
      });
    });
    this.setState({ result });
  }

  constructor(props) {
    super(props);
    this.state = { departure: '', arrival: '', date: 'Choose a Day', result: null, depPos: null, arrPos: null };
    this.onDepatureChange = this.onDepatureChange.bind(this);
    this.onArrivalChange = this.onArrivalChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onDepatureChange(event) {
    this.setState({ departure: event.target.value });
  }

  onArrivalChange(event) {
    this.setState({ arrival: event.target.value });
  }

  onDateChange(event) {
    this.setState({ date: event.currentTarget.text });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.getResult();
  }

  // return a datalist to autocomplete the input
  renderStops() {
    return this.props.stops.map((stop) => {
      return <option key={stop.id}>{stop.stop_name}</option>;
    });
  }

  // disable submit button if input not exists in the stop list
  inputValid() {
    var dep = false, arr = false;
    this.props.stops.map((stop) => {
      if (stop.stop_name==this.state.departure) dep = true;
      if (stop.stop_name==this.state.arrival) arr = true;
    });
    return dep && arr && this.state.arrival!=this.state.departure && this.state.date!='Choose a Day';
  }

  render() {
    return (
      <div className="searchBar">
        <form onSubmit={this.onFormSubmit}>
          <div className="input-group">
            <label htmlFor="depart" className="input-group-addon">Departure</label>
            <input placeholder="From" list="dep-stops" id="depart" onChange={this.onDepatureChange} className="form-control" />
            <datalist id="dep-stops">
              {this.renderStops()}
            </datalist>
          </div>

          <div className="input-group">
            <label htmlFor="arrive" className="input-group-addon">Arrival</label>
            <input placeholder="To" list="arr-stops" id="arrive" onChange={this.onArrivalChange} className="form-control" />
            <datalist id="arr-stops">
              {this.renderStops()}
            </datalist>
          </div>

          <div className="dropdown">
            <DropdownButton title={this.state.date} id="1">
              <MenuItem key="1"  active onClick={this.onDateChange}>Weekday</MenuItem>
              <MenuItem key="2" onClick={this.onDateChange}>Saturday</MenuItem>
              <MenuItem key="3" onClick={this.onDateChange}>Sunday</MenuItem>
            </DropdownButton>
            <button disabled={!this.inputValid()} type="submit" className="btn btn-secondary">Search</button>
          </div>
        </form>
        { this.state.result ? <Schedule result={this.state.result} /> : null}
        { this.state.result ? <div className="mapdiv"><StationMap dep={this.state.depPos} arr={this.state.arrPos} /></div> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { stops: state.trips.stops, ID: state.trips.ID, trips: state.trips.trips, tripsid: state.trips.tripsid };
}

export default connect(mapStateToProps, { fetchStops, fetchStopID, fetchTrips, fetchTripsID })(SearchBar);
