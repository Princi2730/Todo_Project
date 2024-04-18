import React, { useState, useEffect } from "react";
import { styled } from "@mui/joy/styles";
import { Grid, Sheet } from "@mui/joy";
import SideDrawer from "../sideBar/SideDrawer";
import AllTodos from "../Todos/AllTodos";
import MyTodos from "../Todos/MyTodos";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  height: "100%", // Set height to 100%
  color: theme.vars.palette.text.secondary,
}));

function Dashboard() {
  const [selectedRoute, setSelectedRoute] = useState("/alltodos"); // Initial route
  const [component, setComponent] = useState(<AllTodos />); // Initial component

  useEffect(() => {
    switch (selectedRoute) {
      case "/my-todos":
        setComponent(<MyTodos />);
        break;
      case "/alltodos":
        setComponent(<AllTodos />);
        break;
      // Here you can add more cases for other routes
      default:
        setComponent(<AllTodos />);
        break;
    }
  }, [selectedRoute]);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      <Grid item xs={2}>
        <Item sx={{ bgcolor: "white" }}>
          <SideDrawer onSelectRoute={handleRouteSelect} />
        </Item>
      </Grid>
      <Grid item xs={10}>
        <Item sx={{ bgcolor: "lightgrey" }}>{component}</Item>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
