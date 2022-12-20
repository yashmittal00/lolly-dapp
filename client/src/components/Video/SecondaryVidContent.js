import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Typography } from "@material-ui/core";

import VideoList from "./VideoList";
import { getSuggestedVideos } from "../../redux/actions/videos";
import recommendedVideoListMock from "../../mocks/recommendedVideoListMock";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(1),
  },
}));

const SecondaryVidContent = () => {
  const recommendedVids = useSelector(({ videos }) => videos.recommended);
  const isLoading = useSelector(({ videos }) => videos.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSuggestedVideos());
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Suggested Videos
      </Typography>
      <VideoList
        type="horizontal_2"
        isLoading={isLoading}
        // TODO: Dummy Data, please replace with server sent response
        videos={recommendedVideoListMock}
      />
    </div>
  );
};

export default SecondaryVidContent
