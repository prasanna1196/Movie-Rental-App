import React, { Fragment } from "react";
import {
  makeStyles,
  Paper,
  Toolbar,
  InputBase,
  Grid,
  Typography,
  Button,
  Avatar,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import { AccountCircle, PersonAdd, Search } from "@material-ui/icons";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // "& .MuiFormControl-root": {
  //   // width: "250px",
  //   margin: theme.spacing(2),
  //   color: "#0F495C",
  //   justifyContent: "center",
  // },

  login: {
    height: "100%",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  pageContent: {
    width: "320px",
    height: "380px",
    // display: "flex",
    // flexFlow: "column",
    // alignContent: "center",
    // justifyContent: "center",
    padding: 15,
  },
  title: {
    color: "#0F495C",
    margin: "10px 0 20px",
  },
  signIn: {
    margin: "15px 0",
    color: "#ADFF2F",
  },
  textField: {
    margin: "15px 0",
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <div className={classes.login}>
      <Paper elevation={10} className={classes.pageContent}>
        <Grid align="center" justify="center">
          <Typography className={classes.title} variant="h4" component="div">
            Sign In
          </Typography>
        </Grid>
        <form autoComplete="off">
          <Grid align="center">
            <TextField
              className={classes.textField}
              fullWidth
              type="email"
              size="small"
              variant="outlined"
              name="email"
              label="Email"
            />
            <TextField
              className={classes.textField}
              fullWidth
              type="password"
              size="small"
              variant="outlined"
              name="password"
              label="Password"
            />
            <Button
              className={classes.signIn}
              variant="contained"
              size="large"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </Grid>
        </form>
        <Grid>
          <Typography variant="subtitle2" style={{ margin: "20px 0 5px" }}>
            Don't have an Account? Register
          </Typography>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
