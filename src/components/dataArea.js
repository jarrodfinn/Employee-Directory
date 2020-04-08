//class component with state and heading. Functions for sorting and searching.
//parent
//house data table

import React, { Component } from "react";
import App from "../App";

export default class DataArea extends Component {
  state = {
    //componentDidMount
    employees: [],
    order: "descend",
    filteredUsers: [{}],
  };
  headings = ["name..."];

  componentDidMount() {
    //page loads, fetch "employees" from json, set state of users and filteredusers to the result
    fetch("/employees.json")
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        this.setState({ employees: response });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleSearchChange() {
    //filter out users
  }

  handleSort(heading) {
    if (this.state.order === "descend") {
      this.setState({
        order: "ascend",
      });
    } else {
      this.setState({
        order: "descend",
      });
    }
  }
  render() {
    return (
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
    );
  }
}
