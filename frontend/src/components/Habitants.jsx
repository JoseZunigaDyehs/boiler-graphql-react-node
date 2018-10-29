import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getHabitants } from "../querys/querys";

class Habitants extends Component {
  state = {
    color: "red"
  };
  content(data) {
    return data.habitants.map(habitant => {
      return (
        <div key={habitant.id}>
          <p>
            <strong>NAME: </strong>
            {habitant.name}
          </p>
          <p>
            <strong>AGE: </strong>
            {habitant.age}
          </p>
          <p>
            <strong>HOME: </strong>
            {habitant.home.name}
          </p>
          <br />
        </div>
      );
    });
  }
  render() {
    const { data } = this.props;
    if (data.loading) return <h3>Loading...</h3>;
    if (data.error) return <h3>ERROR: {data.error.message}</h3>;
    return this.content(data);
  }
}

export default graphql(getHabitants)(Habitants);
