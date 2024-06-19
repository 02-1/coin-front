import React, { useState, useEffect } from "react";

function Clock() {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const date = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentDateTime(
        `${year}-${month}-${date} (${hours}:${minutes}:${seconds})`
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <p>{currentDateTime}</p>;
}

export default Clock;
