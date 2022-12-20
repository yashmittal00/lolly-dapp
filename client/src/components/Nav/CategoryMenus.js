import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, SvgIcon } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import '../../index.css'

import NavItem from "./NavItem";
import categoryIcons from "../categoryIcons";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(0, 1),
    fontSize: "1em",
    fontWeight: 500,
    color: grey[600],
  },
  bestOfYoutubeIcon: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    zIndex: "10"
  },
  root_h: {
    display: "flex",
    overflowX: "auto",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  spacing_h: { 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "space-evenly", 
    margin: "1em",  
    width: "15vw", 
    height: "25vh", 
    borderRadius: "43px",
    background: "linear-gradient(145deg, #1c143a, #211844)",
    boxShadow: "5px 5px 10px #0c091a, -5px -5px 10px #322366",
    transition: "1s",
    "&:hover": {
      transition: "1s",
      background: "#1f1640",
      boxShadow: "inset 5px 5px 10px #0c091a, inset -5px -5px 10px #322366",
    }
  },
  img_h: {
    width: "24px",
    height: "24px",
    borderRadius: "100%",
  },
}));

const SideCategoryMenu = () => {
  const classes = useStyles();
  return (
    <List>
      <ListItem>
        <ListItemText
          classes={{ primary: classes.title }}
        />
      </ListItem>
      {categoryIcons.map((item, index) => {
        return (
          <NavItem
            key={index}
            to={`/trending?category=${index}`}
            title={item.title}
            icon={
              <SvgIcon component={item.icon} />
            }
          />
        );
      })}
    </List>
  );
};

const HorizontalCategoryMenu = () => {
  const classes = useStyles();
  return (
    <div className={classes.root_h}>
      {categoryIcons.map((item, index) => {
        return (
          <div className={classes.spacing_h} id="explore-resp">
            <NavItem
              key={index}
              to={`/trending?category=${index}`}
              title={item.title}
              type="secondary"
              icon={<img src={item.icon} style={{
                height: "50%",
                width: "50%",
                marginBottom: "10px"
              }} alt="" />}
            />
          </div>
        );
      })}
    </div>
  );
};

export { SideCategoryMenu, HorizontalCategoryMenu };
