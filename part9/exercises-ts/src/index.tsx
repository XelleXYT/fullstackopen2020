import React from "react";
import ReactDOM from "react-dom";
import Header from "./Components/Header";
import Content from "./Components/Content";
import Total from "./Components/Total";
import { Part } from "./types/Part";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: Part[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));