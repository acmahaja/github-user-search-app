import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/main.css";
import "./css/light.css";
import "./css/dark.css";

import {Navbar} from "./components/navbar"

const App = () => {
  const [user, setUser] = useState("github");
  const [userData, setUserData] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  });

  async function getData() {
    const { data } = await axios.get(`https://api.github.com/users/${user}`);
    setUserData(data);
  }

  const updateTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // updateTheme('dark')

  return (
    <div className={`useBorderBox App ${theme}`}>
      <Navbar theme={theme ==='dark' ? 'light' : 'dark'} setTheme={updateTheme}/>
    </div>
  );
};

export default App;
