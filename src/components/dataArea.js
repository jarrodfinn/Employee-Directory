//class component with state and heading. Functions for sorting and searching.
//parent
//house data table

import React, { Component } from "react";
import App from "../App";
import Moment from "moment";

export default class DataArea extends Component {
  state = {
    //componentDidMount
    employees: [],
    allEmployees: [],
    isLoading: true,
    order: "descend",
    filteredUsers: [{}],
  };
  headings = ["name..."];

  componentDidMount() {
    fetch("/employees.json")
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        this.setState({ employees: response, allEmployees: response, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePositionChange = (event) => {
    const position = event.target.value;
    if (position === "All") {
      this.setState({ employees: this.state.allEmployees });
    } else {
      this.setState({
        employees: this.state.allEmployees.filter(function (employee) {
          if (employee.position === position) {
            return true;
          }
          return false;
        }),
      });
    }
  };

  sortByDateOfBirth = () => {
    this.setState({
      employees: this.state.employees.sort(function (a, b) {
        var dateA = new Date(a.date).getTime();
        var dateB = new Date(b.date).getTime();
        return dateA > dateB ? 1 : -1;
      })
    });
}

  render() {
    if (this.state.isLoading === true) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <label for="position">Filter by position:</label>
        <select onChange={this.handlePositionChange} id="position">
          <option value="All">All</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
          <option value="Logistics">Logistics</option>
          <option value="Accounting">Accounting</option>
          <option value="Tech Support">Tech Support</option>
        </select>
        <button type='button' onChange={this.sortByDateOfBirth}>Filter by Date of Birth</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(function (employee) {
              return (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
