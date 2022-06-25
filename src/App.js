import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "./css/main.css";
import "./css/light.css";
import "./css/dark.css";

import { Navbar } from "./components/navbar";
import { Search } from "./components/search";
import { Loader } from "./components/loader";

const useSemiPersistantState = (key, initalState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initalState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case "WAITING":
      return {
        data: null,
        isLoading: false,
        isError: false,
      };
    case "GETTING_DATA":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GETTING_DATA_SUCCESS":

      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.data,
      };
    case "GETTING_DATA_ERROR":
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: true,
        error: action.error,
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [user, setUser] = useState("");

  const [userData, updateUserData] = useReducer(searchReducer, {
    data: null,
    isLoading: false,
    isError: false,
    error: null,
  });
  const [theme, setTheme] = useSemiPersistantState("theme", "dark");

  useEffect(() => {
    if (userData.isLoading && !userData.isError) {
      getUserData(user)
        .then((result) =>
          updateUserData({ type: "GETTING_DATA_SUCCESS", data: result })
        )
        .catch((e) => updateUserData({ type: "GETTING_DATA_ERROR", error: e }));
    }
  });

  const getUserData = async (user) => {
    let response = null;
    await axios
      .get(`https://api.github.com/users/${user}`)
      .then((result) => (response = result))
      .catch((e) => updateUserData({ type: "GETTING_DATA_ERROR", error: e }));
    return response;
  };

  const updateTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const updateUser = (serachUser) => {
    setUser(serachUser);
    updateUserData({
      type: "GETTING_DATA",
    });
  };

  return (
    <div className={`useBorderBox App ${theme}`}>
      <Navbar
        theme={theme === "dark" ? "light" : "dark"}
        setTheme={updateTheme}
      />
      <Search setUserSearch={updateUser} />
      {userData.isLoading ? (
        <Loader />
      ) : userData.data !== null && !userData.isError ? (
        JSON.stringify(userData.data)
      ) : (
        "noData"
      )}
    </div>
  );
};

export default App;
