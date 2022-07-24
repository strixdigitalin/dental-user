import { useEffect, useState } from "react";

export default function Time() {
  const [time, setTime] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("time")) {
      let time = parseInt(localStorage.getItem("time"));
      setInterval(() => {
        time = time + 1;
        localStorage.setItem("time", `${time}`);
      }, 1000);
    } else {
      let time = 0;
      setInterval(() => {
        time = time + 1;
        localStorage.setItem("time", `${time}`);
      }, 1000);
    }
  }, []);
  useEffect(() => {
    setInterval(() => setTime(localStorage.getItem("time")), 1000);
  }, []);
  return (
    <div>
      Time test
      <p>{time}</p>
    </div>
  );
}
