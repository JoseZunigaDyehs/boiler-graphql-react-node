import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { addHomeQuery, getHomesQuery } from "../querys/querys";

//SIN BINDEAR,
//SIN CONSTRUCTOR
//CON ASYNC
class AddHome extends Component {
  state = {
    name: ""
  };

  //ASYNC
  _addHome = async () => {
    const result = await this.props.addHomeQuery({
      variables: { name: this.state.name },
      refetchQueries: [{ query: getHomesQuery }] // REFETCH
    });
    this.setState({name: ""})
  };
  componentDidMount(){
    
  }
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
        <button onClick={()=>{ this._addHome() }}>Agregar</button>
      </div>
    );
  }
  render() {
    return <ul>{this.content()}</ul>;
  }
}

export default compose(graphql(addHomeQuery, { name: "addHomeQuery" }))(
  AddHome
);
