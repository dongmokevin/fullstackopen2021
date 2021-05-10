import React from "react";

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
  return (
    <React.Fragment>
      {course.parts.map((part, i) => (
        <Part key={i} name={part.name} exercises={part.exercises} />
      ))}
    </React.Fragment>
  );
};

const Total = ({ course }) => {
  return (
    <p>
      Number of exercises{" "}
      {course.parts
        .map((part) => part.exercises)
        .reduce((total, num) => total + num)}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
