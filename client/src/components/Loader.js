// Loader.js

import React, { useState } from "react";
import PropagateLoader from "react-spinners/PacmanLoader";
import "./css/Loader.css"; // Import custom CSS file

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="loader-container">
      <div className="sweet-loading text-center">
        <PropagateLoader color="DarkCyan" loading={loading} css="" size={25} />
      </div>
    </div>
  );
}

export default Loader;
