import React, { Component } from 'react';

export default class Schedule extends Component {
  renderSchedule(res, index) {
    return (
      <tr key={index} className={ index % 2 == 0 ? '' : 'single' }>
        <td>{res.departure_time}</td>
        <td>{res.arrival_time}</td>
        <td>{res.duration}</td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Departs</th>
            <th>Arrives</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>{this.props.result.map(this.renderSchedule)}</tbody>
      </table>
    );
  }
}
