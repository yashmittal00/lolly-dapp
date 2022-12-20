import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import {
  makeStyles,
  Container,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { capitalize } from "lodash";

import { HorizontalCategoryMenu } from "../Nav/CategoryMenus";
import { categories } from "../../utils";
import { getTrendingVideos } from "../../redux/actions/videos";
import VideoList from "../Video/VideoList";
import recommendedVideoListMock from "../../mocks/recommendedVideoListMock";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
    backgroundColor: "#1E1240",
  },
  text: {
    paddingBottom: theme.spacing(3),
    fontWeight: 500,
  },
  divider: {
    height: "5px",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));
const TrendingPage = ({ location }) => {
  const { category: categoryId } = queryString.parse(location.search);
  const trendingVids = useSelector(({ videos }) => videos.trending);
  const isLoading = useSelector(({ videos }) => videos.isLoading);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMaxScreenSm = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {
    dispatch(getTrendingVideos(categoryId));
  }, [categoryId, dispatch]);

  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.root}>

      <HorizontalCategoryMenu />

      <Divider light className={classes.divider} />
      {(() => {
        if (isLoading && isMaxScreenSm) {
          return (
            <VideoList
              type="vertical_2"
              isLoading={isLoading}
              // TODO: Dummy Data, please replace with server response before production
              videos={recommendedVideoListMock}
            />
          );
        } else if (isLoading && !isMaxScreenSm) {
          return (
            <VideoList
              type="horizontal_1"
              isLoading={isLoading}
              // TODO: Dummy Data, please replace with server response before production
              videos={recommendedVideoListMock}
            />
          );
        } else if (!isLoading && !isMaxScreenSm && recommendedVideoListMock.length) {
          return (
            <VideoList
              type="horizontal_1"
              isLoading={isLoading}
              // TODO: Dummy Data, please replace with server response before production
              videos={recommendedVideoListMock}
            />
          );
        } else {
          return "Videos To try";
        }
      })()}
    </Container>
  );
};

export default TrendingPage;
