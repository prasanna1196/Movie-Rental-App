import React, { useState, useEffect } from "react";

const NumberCounter = ({ value }) => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    for (let i = 0; i <= value; i++) {
      setTimeout(() => {
        setNum(i);
      }, (i * 1000) / value);
    }
    console.log(num);
  }, []);

  return (
    <div>
      <h2>{num}</h2>
    </div>
  );
};

export default NumberCounter;
