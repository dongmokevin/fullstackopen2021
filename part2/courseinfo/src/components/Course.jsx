import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  const totalExercises = course.parts
    .map((part) => part.exercises)
    .reduce((total, exercise) => total + exercise);
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <p>
        <b>total of {totalExercises} exercises</b>
      </p>
    </div>
  );
};

export default Course;
