import React, { Component } from "react";
import { graphql, Query } from "react-apollo";
import { getHomesQuery } from "../querys/querys";

class HomeList extends Component {
  state = {
    color: "red"
  };
  content(data, color) {
    return data.homes.length>0 ? data.homes.map(home => {
      return (
        <li key={home.id} style={{ color, cursor: "pointer" }}>
          {home.name}
        </li>
      );
    }):
    <p>No hay casas</p>
  }
  render() {
    const { color } = this.state;
    return (
      <Query query={getHomesQuery}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return <ul>{this.content(data, color)}</ul>;
        }}
      </Query>
    );
  }
}

export default HomeList;
