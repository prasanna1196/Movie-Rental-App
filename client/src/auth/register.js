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

  register: {
    height: "100%",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  pageContent: {
    width: "320px",
    height: "510px",
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

const Register = () => {
  const classes = useStyles();

  return (
    <div className={classes.register}>
      <Paper elevation={10} className={classes.pageContent}>
        <Grid align="center" justify="center">
          <Typography className={classes.title} variant="h4" component="div">
            Register
          </Typography>
        </Grid>
        <form autoComplete="off" className={classes.root}>
          <Grid align="center">
            <TextField
              className={classes.textField}
              fullWidth
              size="small"
              variant="outlined"
              name="fullName"
              label="Full Name"
            />
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
              name="Password"
              label="password"
            />
            <TextField
              className={classes.textField}
              fullWidth
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
          </Grid>
        </form>
        <Grid>
          <Typography variant="subtitle2" style={{ margin: "20px 0 5px" }}>
            Already have an Account? Login
          </Typography>
        </Grid>
      </Paper>
    </div>
  );
};

export default Register;
