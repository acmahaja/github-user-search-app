import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/main.css";
import "./css/dark.css";
import "./css/light.css";

import {Navbar} from "./components/navbar"

const App = () => {
  const [user, setUser] = useState("github");
  const [userData, setUserData] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    setTheme(theme);
  });

  async function getData() {
    const { data } = await axios.get(`https://api.github.com/users/${user}`);
    setUserData(data);
  }

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", theme);
    console.log(newTheme);
  };

  // updateTheme('dark')

  return (
    <div className={`useBorderBox App ${theme}`}>
      <Navbar />
    </div>
  );
};

export default App;
