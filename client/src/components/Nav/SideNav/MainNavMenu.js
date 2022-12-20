import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { List, useMediaQuery, useTheme } from "@material-ui/core";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Explore as ExploreIcon,
  ShowChart as ShowChartIcon,
  PlayCircleFilled as PlayCircleFilledIcon
} from "@material-ui/icons";
import NavItem from "../NavItem";
import { toggleDrawer } from "../../../redux/actions/layout";

const MainNavMenu = () => {
  const theme = useTheme();
  const id = useSelector(({ channel }) => channel.id);
  const isMinScreenMd = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useDispatch();
  const handleItemClick = () => {
    if (!isMinScreenMd) {
      dispatch(toggleDrawer(isMinScreenMd));
    }
  };

  return (
    <List style={{ paddingTop: "40px" }}>
      {[
        {
          title: "Home",
          icon: <HomeIcon />,
          path: "/",
        },
        {
          title: "Explore",
          icon: <ExploreIcon />,
          path: "/trending",
        },
        {
          title: "Creator Rewards",
          icon: <ShowChartIcon />,
          path: "/subscriptions",
        },
        {
          title: "Your Videos",
          icon: <PlayCircleFilledIcon />,
          path: `/channel/${id}`,
        },
        {
          title: "Settings",
          icon: <SettingsIcon />,
          path: "/history",
        }
      ].map((item, index) => {
        return (
          <React.Fragment key={index}>
            <NavItem
              to={item.path}
              title={item.title}
              icon={item.icon}
              onClick={handleItemClick}
            />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default MainNavMenu;
