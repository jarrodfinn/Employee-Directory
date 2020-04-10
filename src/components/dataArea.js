//class component with state and heading. Functions for sorting and searching.
//parent
//house data table

import React, { Component } from "react";
import App from "../App";

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

  sortByDateOfBirth = (event) => {
    const dob = event.target.value;
    if (dob === "oldest") {
      this.setState({
        employees: this.state.employees.sort(function (a, b) {
          var dateA = new Date(a.dob).getTime();
          var dateB = new Date(b.dob).getTime();
          return dateA > dateB ? 1 : -1;
        }),
      });
    } else if (dob === "youngest") {
      this.setState({
        employees: this.state.employees.sort(function (a, b) {
          var dateA = new Date(a.dob).getTime();
          var dateB = new Date(b.dob).getTime();
          return dateA < dateB ? 1 : -1;
        }),
      });
    } else if (dob === "default") {
      this.setState({
        employees: this.state.employees.sort(function (a, b) {
          var dateA = new Date(a.dob).getTime();
          var dateB = new Date(b.dob).getTime();
          return dateA = dateB ? 1 : -1;
        }),
      });
    }
  }

  render() {
    // console.log("employees", this.state.employees)
    if (this.state.isLoading === true) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <label htmlFor="position">Filter by position:</label>
        <select onChange={this.handlePositionChange} id="position">
          <option value="All">All</option>
          <option value="KOAM">KOAM</option>
          <option value="News">News</option>
          <option value="Sound Engineer">Sound Engineer</option>
          <option value="Executive Producer">Executive Producer</option>
          <option value="Producer">Producer</option>
          <option value="Sales Manager">Sales Manager</option>
          <option value="Security">Security</option>
          <option value="Music Engineer">Music Engineer</option>
          <option value="Tech Support">Tech Support</option>
        </select>
        <label htmlFor="dob">Sort by date of birth:</label>
        <select onChange={this.sortByDateOfBirth}>
          <option value="default">Default</option>
          <option value="oldest">Oldest to Youngest</option>
          <option value="youngest">Youngest to Oldest</option>
        </select>
        <table className="table table-bordered">
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
