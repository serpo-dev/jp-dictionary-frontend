import React from "react";
import stylesheet from "./Association.module.css";

const Association = (props) => {
  const ids = [];
  for (const i in props.data) {
    ids.push(props.data[i].id);
  }
  const stringIds = ids.join(", ");

  const deleting = () => {};

  return (
    <div>
      <div className="flex flex-row justify-center h-10">
        <h2>Total: {ids.length}</h2>
        <div className="flex-grow" />
        <div
          onClick={deleting}
          className="flex flex-col pb-1 justify-center w-6 h-6 text-xl font-bold text-pink-900 bg-pink-400 rounded-full text-center cursor-pointer active:scale-110 hover:bg-pink-500 active:bg-pink-300 transition ease duration-200"
        >
          <p>x</p>
        </div>
      </div>
      <div className="flex items-center justify-start space-x-4 text-bold break-normal min-h-fit">
        <label
          for={`${stylesheet}_ASSOCIATIONS`}
          className="basis-1/4 w-full text-sm cursor-pointer font-bold"
        >
          Translations:
        </label>
        <input
          id={`${stylesheet}_ASSOCIATIONS`}
          value={stringIds}
          type="text"
          className="basis-3/4 w-full pl-2 pr-2 font-semibold self-end text-center rounded-lg bg-rose-200 h-8"
        />
      </div>
    </div>
  );
};

export default Association;
