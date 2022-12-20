import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ListItem, ListItemAvatar, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  active: {
    color: "white",
    background: "#1E1240",
  },
  ListBackground: {
    "&:hover": { backgroundColor: "#222327" },
  },
  icon: {
    padding: theme.spacing(0, 1),
    color: "#626366",
    fontSize: "1.2rem"
  },
  iconActive: {
    color: "white",
  },
  text: {
    color: "#626366" /* blue colors for links too */,
    textDecoration: "none" /* no underline */,
    textAlign: "center",
    "&:hover": {
      color: "inherit" /* blue colors for links too */,
      textDecoration: "none" /* no underline */,
    },
  },
}));
const CircleItem = ({ children, title }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "1rem 2rem",
    }}
  >

    {children}
    <div>{title}</div>
  </div>
);
const NavItem = ({ to, title, icon, onClick, disableActive, type }) => {
  const classes = useStyles();
  const location = useLocation();
  const isActive =
    location.pathname === "/trending"
      ? location.pathname + location.search === to
      : location.pathname === to;
  // const Icon = icon;
  // console.log(icon)

  const Item =
    type === "secondary" ? (
      <CircleItem title={title}>
        {icon}
      </CircleItem>
    ) : (
      <ListItem
        button
        onClick={onClick}
        className={isActive ? `${classes.active} ${classes.ListBackground}` : classes.ListBackground}
      >
        <ListItemIcon className={classes.icon}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    );
  return to ? (
    <NavLink to={to} className={isActive ? `${classes.text}` : classes.text}>
      {Item}
    </NavLink>
  ) : (
    <> {Item} </>
  );
};

export default NavItem;
