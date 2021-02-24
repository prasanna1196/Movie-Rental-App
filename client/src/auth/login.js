import React, { Fragment } from "react";
import {
  makeStyles,
  Paper,
  Toolbar,
  InputBase,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "235px",
      margin: theme.spacing(2),
      color: "#0F495C",
      justifyContent: "center",
    },
  },
  login: {
    height: "100%",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  pageContent: {
    width: "250px",
    height: "400px",
    // display: "flex",
    // flexFlow: "column",
    // alignContent: "center",
    // justifyContent: "center",
  },
  title: {
    color: "#0F495C",
    margin: "20px",
  },
  signIn: {
    // position: "relative",
    // margin: "20 px 50px",
    color: "#ADFF2F",
  },
  textField: {
    width: "230px",
    color: "",
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <div className={classes.login}>
      <Paper elevation={5} className={classes.pageContent}>
        <Grid container alignItems="center" justify="center">
          <Typography className={classes.title} variant="h4" component="div">
            Sign In
          </Typography>

          <form autoComplete="off" className={classes.root}>
            <TextField
              className={classes.textField}
              size="small"
              variant="outlined"
              name="fullName"
              label="Full Name"
            />
            <TextField
              className={classes.textField}
              size="small"
              variant="outlined"
              name="email"
              label="Email"
            />
            <TextField
              className={classes.textField}
              size="small"
              variant="outlined"
              name="mobile"
              label="Mobile"
            />
            <Button
              className={classes.signIn}
              variant="contained"
              size="large"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
