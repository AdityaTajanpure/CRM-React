import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import "../../App.css";

const Loading = () => {
  <div className="App">
    {
      <header className="App-header">
        <h3>Loading</h3>
        <Box sx={{ width: "30%" }}>
          <LinearProgress color="inherit" />
        </Box>
      </header>
    }
  </div>;
};

export default Loading;
