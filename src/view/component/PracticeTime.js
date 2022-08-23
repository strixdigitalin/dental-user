import React, { useEffect, useState } from "react";

function PracticeTime({ practiceTime = "0:0:0", setPracticeTime = () => {} }) {
  let sec = 0;
  let min = 0;
  let hrs = 0;
  const [timer, setTimer] = useState("0:0:0");
  useEffect(() => {
    setInterval(() => {
      //   alert("show");
      if (sec < 60) {
        sec = sec + 1;
        setPracticeTime(`${hrs}:${min}:${sec}`);
        // setPracticeTime
      } else {
        if (min <= 12) {
          sec = 0;
          min = min + 1;
          setPracticeTime(`${hrs}:${min}:${sec}`);
        } else {
          sec = 0;
          min = 0;
          hrs = hrs + 1;
          setPracticeTime(`${hrs}:${min}:${sec}`);
        }
      }
    }, 1000);
  }, []);

  return <h3>Practice Time: {practiceTime}</h3>;
}

export default PracticeTime;
