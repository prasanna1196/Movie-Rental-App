import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React, { useContext } from "react";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MovieCard = ({ movie }) => {
  const classes = useStyles();
  const { _id, name, year, language } = movie;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="subtitle2">
          {language} {year}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
