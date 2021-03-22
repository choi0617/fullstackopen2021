import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ text, value, totalVotes }) => {
  if (isNaN(value)) {
    value = 0;
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value} {text==='Positive' ? "%" : ""} </td>
        </tr>
      </tbody>
    </table>
  );
 
  
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let totalVotes = good + neutral + bad;
  let average = (good - bad) / totalVotes;
  let positivePercentage = (good / totalVotes) * 100;
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />

      <h3>statistics</h3>
      {totalVotes ? <>
        <Statistics text="Good" value={good} totalVotes={totalVotes} />
      <Statistics text="Neutral" value={neutral} totalVotes={totalVotes} />
      <Statistics text="Bad" value={bad} totalVotes={totalVotes} />
      <Statistics text="All" value={totalVotes} />
      <Statistics text="Average" value={average} totalVotes={totalVotes} />
      <Statistics text="Positive" value={positivePercentage} totalVotes={totalVotes} />
      </> : <p>No feedback available</p>}
      
    </div>
  );
};

export default App;
