import React, { useState, useEffect } from "react";

const NumberCounter = ({ value }) => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    for (let i = 0; i <= value; i++) {
      setTimeout(() => {
        setNum(i);
      }, (i * 1000) / value);
    }
  }, []);

  return (
    <div>
      <h1>{num}</h1>
    </div>
  );
};

export default NumberCounter;
