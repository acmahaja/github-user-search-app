import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "./css/main.css";
import "./css/light.css";
import "./css/dark.css";

import { Navbar } from "./components/navbar";
import { Search } from "./components/search";
import {Loader} from "./components/loader";

const useSemiPersistantState = (key, initalState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initalState
  )

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];

}

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case 'GETTING_DATA': 
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: {},
      };
    case 'GETTING_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
      case 'GETTING_DATA_ERROR':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
    default:
      throw new Error();
  }
}

const App = () => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useReducer(searchReducer, {})
  const [theme, setTheme] = useSemiPersistantState('theme', 'dark');

  useEffect(() => {
    // setUserData({type: 'START'});
  });

  const updateTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const updateUser = (serachUser) => {
    setUser(serachUser);
    setUserData(null);
    console.log(userData);
  };

  return (
    <div className={`useBorderBox App ${theme}`}>
      <Navbar
        theme={theme === "dark" ? "light" : "dark"}
        setTheme={updateTheme}
      />
      <Search setUserSearch={updateUser} />

      <Loader />
    </div>
  );
};

export default App;
