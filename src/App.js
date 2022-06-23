import React from 'react';


const App = () => {
  console.log(process.env.REACT_APP_GITHUB_TOKEN);
  return (
    <div className="App">
      <h1>Github User Search App</h1>
    </div>
  )

}

export default App;
