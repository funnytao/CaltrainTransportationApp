import { FETCH_STOPS, FETCH_STOPID, FETCH_TRIPS, FETCH_TRIPSID } from '../actions/index';

const INITIAL_STATE = { stops: [], ID: [], trips: [], tripsid: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_STOPS:
      return { ID: state.ID, stops: action.payload.data, trips: state.trips, tripsid: state.tripsid };
    case FETCH_STOPID:
      return { stops: state.stops, ID: action.payload.data, trips: state.trips, tripsid: state.tripsid };
    case FETCH_TRIPS:
      return { stops: state.stops, ID: state.ID, trips: action.payload.data, tripsid: state.tripsid };
    case FETCH_TRIPSID:
      return { ID: state.ID, stops: state.stops, trips: state.trips, tripsid: action.payload.data };
    default:
      return state;
  }
}
