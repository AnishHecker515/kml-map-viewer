// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;





import React from "react";
import GoogleMapComponent from "./GoogleMapComponent";

const App = () => {
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your API key

  return (
    <div>
      <h1>KML File Viewer</h1>
      <GoogleMapComponent apiKey={apiKey} />
    </div>
  );
};

export default App;