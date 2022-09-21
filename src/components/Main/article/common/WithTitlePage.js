import React from "react";
import stylesheet from "./WithTitlePage.module.css";

import Auth from "../pages/Auth/Auth";
import Login from "../pages/Auth/Login/Login";
import Registration from "../pages/Auth/Registration/Registration";

const WithTitlePage = (props) => {
  const page = props.page;
  const component = (page) => {
    switch (page) {
      case "Auth":
        return <Auth />;
      case "Login":
        return <Login />;
      case "Registration":
        return <Registration />;
      default:
        return (
          <div>
            Uncommon error! Let me know about it by writting on email:
            sergey.potapov.2002@mail.ru
          </div>
        );
    }
  };

  return (
    <div className="bg-white w-full h-fit rounded-lg">
      <div className="grid grid-col-1">
        <div className={stylesheet.disable_text_selection}>
          <div className="bg-rose-100 rounded-t-lg p-4">
            <h1 className="text-xl font-bold ml-4">{page}</h1>
          </div>
        </div>
        <div className="bg-rose-50 rounded-b-lg p-4">{component(page)}</div>
      </div>
    </div>
  );
};

export default WithTitlePage;
