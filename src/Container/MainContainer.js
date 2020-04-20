import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  asteroid_txt: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  randomBtn: {
    marginLeft: "8px",
  },
}));

export default function MainContainer(props) {
  const classes = useStyles();
  const [asteroid_id, setAsteroid_id] = useState("");
  const onChangeText = useCallback((event) => {
    setAsteroid_id(event.target.value);
  }, []);

  const onSubmit = (event) => {
    props.history.push(`view-details?asteroid_id=${asteroid_id}`);
  };

  const onRandomBtnHandle = (event) => {
    props.history.push(`view-details?type=random`);
  };

  return (
    <Container>
      <Box>
        <TextField
          className={classes.asteroid_txt}
          id="standard-basic"
          label="Enter Asteroid ID"
          value={asteroid_id}
          name="asteroid_id"
          onChange={onChangeText}
        />
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={!asteroid_id ? true : false}
        >
          Submit
        </Button>
        <Button
          className={classes.randomBtn}
          variant="contained"
          color="secondary"
          onClick={onRandomBtnHandle}
        >
          Random Asteroid
        </Button>
      </Box>
    </Container>
  );
}
