import axios from 'axios';

export const FETCH_STOPID = 'FETCH_STOPID';
export const FETCH_STOPS = 'FETCH_STOPS';
export const FETCH_TRIPS = 'FETCH_TRIPS';
export const FETCH_TRIPSID = 'FETCH_TRIPSID';

export function fetchStopID() {
  const request = axios.get('https://funnytao.github.io/caltrain/caltrain/stops.json');
  return {
    type: FETCH_STOPID,
    payload: request
  };
}

export function fetchTripsID() {
  const request = axios.get('https://funnytao.github.io/caltrain/caltrain/trips.json');
  return {
    type: FETCH_TRIPSID,
    payload: request
  };
}

export function fetchTrips() {
  const request = axios.get('https://funnytao.github.io/caltrain/caltrain/stop_time.json');
  return {
    type: FETCH_TRIPS,
    payload: request
  };
}

export function fetchStops() {
  const request = axios.get('https://funnytao.github.io/caltrain/caltrain/stop_list.json');
  return {
    type: FETCH_STOPS,
    payload: request
  }
}
