import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import {
  ArrowDownward,
  ExpandLess,
  ExpandLessOutlined,
  ExpandMore,
} from "@material-ui/icons";

import languages from "./languages";
import MovieContext from "../../../context/movie/movieContext";
import AlertContext from "../../../context/alert/alertContext";

const MovieForm = () => {
  const movieContext = useContext(MovieContext);
  const alertContext = useContext(AlertContext);

  const { current, clearCurrent, addMovie, updateMovie } = movieContext;
  const { setAlert } = alertContext;

  const initialState = {
    name: "",
    language: "",
    dvd: 10,
    fhd: 10,
    uhd: 10,
  };

  const [movie, setMovie] = useState(initialState);

  let { name, language, dvd, fhd, uhd } = movie;

  useEffect(() => {
    if (current) {
      setMovie({
        name: current.name,
        language: current.language,
        dvd: current.dvd,
        fhd: current.fhd,
        uhd: current.uhd,
      });
    } else {
      setMovie(initialState);
    }
  }, [current]);

  const handleInput = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      return setAlert("Movie Title is required", "warning");
    }
    if (!language) {
      return setAlert("Select a Language", "warning");
    }
    if (isNaN(dvd) || isNaN(fhd) || isNaN(uhd)) {
      return setAlert("Disc quantity should be a Number", "warning");
    }
    if (!current) {
      addMovie(movie);
    } else {
      updateMovie(movie, current._id);
    }
  };

  return (
    <div style={{ position: "fixed" }}>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h2>{current ? "Edit Movie" : "Add Movie"}</h2>
        <TextField
          style={{ marginBottom: "5px" }}
          variant="outlined"
          placeholder="Movie Name"
          onChange={handleInput}
          name="name"
          label="Movie Name"
          value={name}
        />
        <FormControl>
          <InputLabel htmlFor="demo-simple-select-label">Language</InputLabel>
          <Select
            label="Language"
            autoWidth
            style={{ minWidth: "150px" }}
            value={language}
            onChange={handleInput}
            name="language"
            id="demo-simple-select"
            labelId="demo-simple-select-label"
          >
            {languages.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div
          style={{ display: "flex", flexDirection: "row", margin: "25px 0 " }}
        >
          <div>
            <TextField
              style={{ maxWidth: "50px" }}
              variant="filled"
              placeholder="DVD"
              onChange={handleInput}
              name="dvd"
              label="DVD"
              value={dvd}
            />
          </div>
          <div className="flex-column">
            <IconButton
              onClick={() => setMovie({ ...movie, dvd: dvd + 1 })}
              size="small"
            >
              <ExpandLessOutlined />
            </IconButton>
            <IconButton
              onClick={() => dvd > 0 && setMovie({ ...movie, dvd: dvd - 1 })}
              size="small"
            >
              <ExpandMore />
            </IconButton>
          </div>
          <div>
            <TextField
              style={{ maxWidth: "50px" }}
              variant="filled"
              placeholder="FHD"
              onChange={handleInput}
              name="fhd"
              label="FHD"
              value={fhd}
            />
          </div>
          <div className="flex-column">
            <IconButton
              onClick={() => setMovie({ ...movie, fhd: fhd + 1 })}
              size="small"
            >
              <ExpandLessOutlined />
            </IconButton>
            <IconButton
              onClick={() => fhd > 0 && setMovie({ ...movie, fhd: fhd - 1 })}
              size="small"
            >
              <ExpandMore />
            </IconButton>
          </div>
          <div>
            <TextField
              style={{ maxWidth: "50px" }}
              variant="filled"
              placeholder="UHD"
              onChange={handleInput}
              name="uhd"
              label="UHD"
              value={uhd}
            />
          </div>
          <div className="flex-column">
            <IconButton
              onClick={() => setMovie({ ...movie, uhd: uhd + 1 })}
              size="small"
            >
              <ExpandLessOutlined />
            </IconButton>
            <IconButton
              onClick={() => uhd > 0 && setMovie({ ...movie, uhd: uhd - 1 })}
              size="small"
            >
              <ExpandMore />
            </IconButton>
          </div>
        </div>
        <Button
          style={{
            marginBottom: "20px",
            backgroundColor: "teal",
            color: "white",
          }}
          type="submit"
          variant="contained"
        >
          {current ? "Edit Movie" : "Add Movie"}
        </Button>
        {current && (
          <Button onClick={clearCurrent} variant="contained">
            Clear
          </Button>
        )}
      </form>
    </div>
  );
};

export default MovieForm;
