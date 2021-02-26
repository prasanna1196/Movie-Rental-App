import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  register: {
    height: "100%",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  pageContent: {
    width: "350px",
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
    margin: "10px 0",
  },
}));

const Register = () => {
  const classes = useStyles();

  const initialValues = { name: "", email: "", password: "", mobile: "" };

  const [user, setUser] = useState(initialValues);
  const [formError, setFormError] = useState({});

  const { name, email, password, mobile } = user;

  const validate = (fieldValues = user) => {
    let temp = { ...formError };
    if ("name" in fieldValues)
      temp.name = fieldValues.name
        ? ""
        : "Name should be atleast 3 characters long";
    if ("email" in fieldValues)
      temp.email =
        /$^|.+@.+..+/.test(fieldValues.email) && fieldValues.email.length > 1
          ? ""
          : "Email is not valid";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 6
          ? ""
          : "Password should be atleast 3 characters long";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length === 10
          ? ""
          : "Provide a 10 digit mobile number";
    setFormError({
      ...temp,
    });

    if (fieldValues == user) {
      return Object.values(temp).every((x) => x == "");
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // For simultanious validation
    // validate({ [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    validate(user);
  };

  return (
    <div className={classes.register}>
      <Paper elevation={10} className={classes.pageContent}>
        <Grid container align="center" justify="center">
          <Typography className={classes.title} variant="h4" component="div">
            Register
          </Typography>
        </Grid>
        <form autoComplete="off" className={classes.root} onSubmit={onSubmit}>
          <Grid item align="center">
            <TextField
              className={classes.textField}
              fullWidth
              size="small"
              variant="outlined"
              name="name"
              label="Full Name"
              value={name}
              onChange={onChange}
              error={formError.name ? true : false}
              helperText={formError.name}
            />
            <TextField
              className={classes.textField}
              fullWidth
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
            <TextField
              className={classes.textField}
              fullWidth
              size="small"
              variant="outlined"
              name="mobile"
              label="Mobile"
              value={mobile}
              onChange={onChange}
              // error={validate()}
              // helperText={formError.mobile}
              {...(formError.mobile && {
                error: true,
                helperText: formError.mobile,
              })}
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
          <p
            style={{
              margin: "20px 0 5px",
              fontWeight: "bold",
              color: "#0F495C",
            }}
          >
            Already have an Account?{" "}
            <Link
              style={{ textDecoration: "none", color: "#0F495C" }}
              to="/login"
            >
              Login
            </Link>
          </p>
        </Grid>
      </Paper>
    </div>
  );
};

export default Register;
