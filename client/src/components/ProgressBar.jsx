import React, { useEffect, useState } from "react";

function ProgressBar({ title = "Imran Khan", progress }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    // set width to progress after 10 sec
    const timeout = setTimeout(() => {
      setWidth(progress);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className="flex items-center w-full gap-4">
      <div>
        <h2 className="text-xl font-semibold whitespace-nowrap">{title}</h2>
      </div>
      <div className="w-full h-8 bg-gray-100 rounded-md group ">
        <div
          className="h-full transition-all ease-out group-hover:bg-primary/80 rounded-l-md bg-primary"
          style={{
            width: `${width}%`,
          }}
        ></div>
      </div>
      <span className="font-semibold">{progress}%</span>
    </div>
  );
}

export default ProgressBar;
