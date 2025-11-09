import logo from './logo.svg';
import './App.css';

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
// function App() {
//   return (
//     <div className="text-3xl font-bold text-blue-500 text-center mt-10">
//       Tailwind is working! 🎉
//     </div>
//   );
  
// }
import React from 'react';
import AppRouter from './router/AppRouter';

export default function App() {
  return <AppRouter />;
}


// export default App;
