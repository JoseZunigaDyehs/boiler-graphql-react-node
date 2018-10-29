import React, { Component } from "react";

import HomeList from "./components/HomeList";
import AddHome from "./components/AddHome";
import AddHome2 from "./components/AddHome2";
import Habitants from "./components/Habitants";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h5>Home</h5>
        <HomeList />
        <AddHome2 />
        <Habitants />
      </div>
    );
  }
}

export default App;
