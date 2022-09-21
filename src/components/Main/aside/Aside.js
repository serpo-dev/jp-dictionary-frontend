import React from "react";
import { NavLink } from "react-router-dom";

const Aside = (props) => {
  return (
    <aside
      className="
            flex flex-col items-center invisible h-full w-0
            lg:visible lg:w-[212px] lg:pt-8
            xl:w-[290px] 
        "
    >
      <div
        className="
                invisible h-[500px] w-0 bg-rose-50/90 rounded-lg
                hover:bg-pink-50
                lg:visible lg:w-[160px]
                xl:w-[240px]
            "
      >
        <NavLink to="/questions">
          <h2
            className="
                        text-xl font-bold text-center h-10 pt-2 text-[#c13e3e]
                    "
          >
            ACTUAL
          </h2>
        </NavLink>
        <h3>How to read 猫?</h3>
      </div>
    </aside>
  );
};

export default Aside;
