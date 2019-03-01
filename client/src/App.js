import React, { Component } from "react";
import ExerciseForm from "./components/ExerciseForm/ExerciseForm";

class App extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch("api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map((dat, index) => (
                <li style={{ padding: "10px" }} key={index}>
                  <span style={{ color: "gray" }}> Exercise: </span>
                  {dat.name}
                  <span style={{ color: "gray" }}> Sets: </span>
                  {dat.sets}
                  <span style={{ color: "gray" }}> Reps: </span>
                  {dat.reps}
                </li>
              ))}
        </ul>

        <ExerciseForm data={data} />
      </div>
    );
  }
}

export default App;
