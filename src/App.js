import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from "./pages/mainPage/MainPage";

function App() {
  return (
    <Router>
      {/*<Header />*/}
      {/*    <Sidebar />*/}
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
    </Router>
  );
}

// function Header() {
//   return (
//     <header style={headerStyle}>
//       <Link to="/" style={{ textDecoration: 'none' }}>
//         <img
//           src="/logo.svg"
//           alt="YouTube Logo"
//           style={logoStyle}
//         />
//       </Link>
//     </header>
//   );
// }
//
// const headerStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   padding: '10px 20px',
//   backgroundColor: '#ffffff',
//   color: 'white',
// };
//
// const logoStyle = {
//   height: '40px',
//   cursor: 'pointer',
// };
//
// const pageStyle = {
//   textAlign: 'center',
//   marginTop: '50px',
// };

export default App;
