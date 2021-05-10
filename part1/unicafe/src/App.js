import React, { useState } from "react";

const Header = () => <h1>give feedback</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good + bad * -1) / total;
  const positive = (good / total) * 1;
  if (good === 0 && bad === 0 && neutral === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <Statistic text={"good"} />
            </td>
            <td>
              <Statistic value={good} />
            </td>
          </tr>

          <tr>
            <td>
              <Statistic text={"neutral"} />
            </td>
            <td>
              <Statistic value={neutral} />
            </td>
          </tr>

          <tr>
            <td>
              <Statistic text={"bad"} />
            </td>
            <td>
              <Statistic value={bad} />
            </td>
          </tr>

          <tr>
            <td>
              <Statistic text={"all"} />
            </td>
            <td>
              <Statistic value={total} />
            </td>
          </tr>

          <tr>
            <td>
              <Statistic text={"average"} />
            </td>
            <td>
              <Statistic value={average} />
            </td>
          </tr>

          <tr>
            <td>
              <Statistic text={"positive"} />
            </td>
            <td>
              <Statistic value={positive} />
            </td>
            <td>
              <Statistic text={"%"} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <Header />
      <Button handleClick={handleClickGood} text={"good"} />
      <Button handleClick={handleClickNeutral} text={"neutral"} />
      <Button handleClick={handleClickBad} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
