import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "./css/main.css";
import "./css/light.css";
import "./css/dark.css";

import { Navbar } from "./components/navbar";
import { Search } from "./components/search";
import { Loader } from "./components/loader";
import { Profile } from "./components/profile";

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
      console.log(action.data);
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
    data: {
      login: "octocat",
      id: 583231,
      node_id: "MDQ6VXNlcjU4MzIzMQ==",
      avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/octocat",
      html_url: "https://github.com/octocat",
      followers_url: "https://api.github.com/users/octocat/followers",
      following_url:
        "https://api.github.com/users/octocat/following{/other_user}",
      gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
      organizations_url: "https://api.github.com/users/octocat/orgs",
      repos_url: "https://api.github.com/users/octocat/repos",
      events_url: "https://api.github.com/users/octocat/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/octocat/received_events",
      type: "User",
      site_admin: false,
      name: "The Octocat",
      company: "@github",
      blog: "https://github.blog",
      location: "San Francisco",
      email: null,
      hireable: null,
      bio: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.",
      twitter_username: null,
      public_repos: 8,
      public_gists: 8,
      followers: 6208,
      following: 9,
      created_at: "2011-01-25T18:44:36Z",
      updated_at: "2022-03-22T14:07:15Z",
    },
    isLoading: false,
    isError: false,
    error: null,
  });
  const [theme, setTheme] = useSemiPersistantState("theme", "dark");

  useEffect(() => {
    if (userData.isLoading && !userData.isError) {
      getUserData(user)
        .then((result) =>
          updateUserData({ type: "GETTING_DATA_SUCCESS", data: result.data })
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
        <Profile data={userData.data} />
      ) : null}
    </div>
  );
};

export default App;
