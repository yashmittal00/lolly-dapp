import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  Container,
  Typography, 
  Divider,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/";

import VideoGrid from "../Video/VideoGrid";
import { getHomeVideos } from "../../redux/actions/videos";
import Banner from "../Banner";
import youtubeIcon from "../../assets/youtube-icon.png";
import recommendedVideoListMock from "../../mocks/recommendedVideoListMock";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
    background: "#1E1240",
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
  banner: {
    width: "100%",
    backgroundColor: "black",
    color: "white",
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
  },
  bannerImg: {
    width: "100%",
    maxWidth: 150,
    height: "auto",
    margin: theme.spacing(1.5),
  },
}));

const HomePage = () => {
  const recommendedVids = useSelector(({ videos }) => videos.recommended);
  const trendingVids = useSelector(({ videos }) => videos.trending);
  const isLoading = useSelector(({ videos }) => videos.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeVideos());
    // eslint-disable-next-line
  }, []);
  const classes = useStyles();
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  return (
    <div>

      <Container maxWidth="xl" className={classes.root}>
        <Typography variant="h5" className={classes.text}>
          Recommended
        </Typography>

        <VideoGrid
          type="vertical_2"
          isLoading={isLoading}
          // TODO: Dummy Data, please update with server fetched list
          videos={recommendedVideoListMock}
        />
        <Divider light className={classes.divider} />
        <Typography variant="h5" className={classes.text}>
          Trending
        </Typography>
        <VideoGrid
          type="vertical_2"
          isLoading={isLoading}
          // TODO: Dummy Data, please update with server fetched list
          videos={recommendedVideoListMock.reverse()}
        />
      </Container>
    </div>
  );
};

export default HomePage;
