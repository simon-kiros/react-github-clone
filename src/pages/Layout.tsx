import React from "react";
import { Routes, Route } from "react-router-dom";

import { Footer, Navbar } from "src/components";
import Profile from "src/pages/profile/Profile";
import Search from "src/pages/search/Search";
import Repository from "src/pages/repository/Repository";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/search/:name" element={<Search />} />
        <Route path="/profile/:owner/:type" element={<Profile />} />
        <Route path="/repository/:owner/:name/*" element={<Repository />} />
        <Route
          path="*"
          element={<h2 className="text-center mt-4">404 Page Not Found</h2>}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
