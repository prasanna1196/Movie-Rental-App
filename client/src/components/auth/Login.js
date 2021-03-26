import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";

import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const useStyles = makeStyles((theme) => ({
  login: {
    // height: "100%",
    // marginTop: "7%",
    justifyContent: "space-around",
    display: "flex",
    flexDirection: "row",
    alignItems: "space-around",
  },
  pageContent: {
    marginTop: "7%",
    width: "320px",
    height: "400px",
    padding: 15,
    color: "#0F495C",
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

const Login = (props) => {
  const classes = useStyles();

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const {
    login,
    error,
    clearErrors,
    isAuthenticated,
    prevLocation,
  } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push(prevLocation);
    }

    if (error) {
      setAlert(error, "error");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const initialValues = { email: "", password: "" };

  const [user, setUser] = useState(initialValues);
  const [formError, setFormError] = useState({});

  const { email, password } = user;

  const validate = (fieldValues = user) => {
    let temp = { ...formError };

    if ("email" in fieldValues)
      temp.email =
        /$^|.+@.+..+/.test(fieldValues.email) && fieldValues.email.length > 1
          ? ""
          : "Email is not valid";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 6
          ? ""
          : "Password should be atleast 6 characters long";

    setFormError({
      ...temp,
    });

    if (fieldValues == user) {
      return Object.values(temp).every((x) => x == "");
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // For simultanious form validation
    validate({ [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    validate(user);
    if (validate()) {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className={classes.login}>
      <Paper elevation={10} className={classes.pageContent}>
        <Grid align="center" justify="center">
          <Typography className={classes.title} variant="h4" component="div">
            Sign In
          </Typography>
        </Grid>
        <form autoComplete="off" onSubmit={onSubmit}>
          <Grid align="center">
            <TextField
              className={classes.textField}
              fullWidth
              type="email"
              size="small"
              variant="outlined"
              name="email"
              label="Email"
              value={email}
              onChange={onChange}
              error={formError.email ? true : false}
              helperText={formError.email}
            />
            <TextField
              className={classes.textField}
              fullWidth
              type="password"
              size="small"
              variant="outlined"
              name="password"
              label="Password"
              value={password}
              onChange={onChange}
              {...(formError.password && {
                error: true,
                helperText: formError.password,
              })}
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
          <p
            style={{
              margin: "20px 0 5px",
              fontWeight: "bold",
              color: "#0F495C",
            }}
          >
            Don't have an Account?{" "}
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "#0F495C" }}
            >
              Register
            </Link>
          </p>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
