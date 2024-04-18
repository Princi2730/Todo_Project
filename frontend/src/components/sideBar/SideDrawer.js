import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import { ListItemDecorator } from "@mui/joy";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Islogin } from "../../reduxtoolkit/loginSlice";
import BooksIcon from "@mui/icons-material/MenuBook"; 
import LogoutIcon from "@mui/icons-material/Logout";

const linkStyle = {
  textDecoration: "none"
};

export default function SelectedList({ onSelectRoute }) {
  const dispatch = useDispatch();

  const handleItemClick = (route) => {
    onSelectRoute(route);
  };

  const LogoutUser = () => {
    sessionStorage.clear("userInfo");
    dispatch(Islogin());
    toast.success("User Logout Successfully");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <List sx={{ flex: "1", maxWidth: 320 }}>
        <ListItem>
          <ListItemButton
            component={Link}
            style={linkStyle}
            onClick={() => handleItemClick("/alltodos")}
          >
            <ListItemDecorator>
              <BooksIcon />
            </ListItemDecorator>
            All Todos
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            component={Link}
            style={linkStyle}
            onClick={() => handleItemClick("/my-todos")}
          >
            <ListItemDecorator>
              <BooksIcon />
            </ListItemDecorator>
            My Todos
          </ListItemButton>
        </ListItem>

        <List sx={{ flex: "none", marginTop: "auto" }}></List>
        <ListItem>
          <ListItemButton
            component={Link}
            to="/"
            style={linkStyle}
            onClick={LogoutUser}
          >
            <ListItemDecorator>
              <LogoutIcon />
            </ListItemDecorator>
            Logout
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}
