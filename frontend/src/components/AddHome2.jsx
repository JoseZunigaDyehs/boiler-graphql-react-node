import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { addHomeQuery, getHomesQuery } from "../querys/querys";

//SIN BINDEAR,
//SIN CONSTRUCTOR
//CON ASYNC
class AddHome2 extends Component {
  state = {
    name: ""
  };

  content() {
    const { name } = this.state;
    return (
      <div>
        <input
          type="text"
          name="nombreCasa"
          value={name}
          onChange={e => {
            this.setState({ name: e.target.value });
          }}
        />
        <Mutation
          mutation={addHomeQuery}
          variables={{ name }}
          onCompleted={() => this.setState({ name: "" })}
          refetchQueries={[{ query: getHomesQuery }]} // REFETCH
        >
          {postMutation => <button onClick={postMutation}>Agregar</button>}
        </Mutation>
      </div>
    );
  }
  render() {
    return this.content();
  }
}

export default AddHome2;
