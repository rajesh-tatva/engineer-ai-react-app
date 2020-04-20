import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Nasa } from "../../config/Nasa";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, Container, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    marginTop: "40px",
  },
  progressBar: {
    textAlign: "center",
    marginTop: "15%",
  },
  backLink: {
    marginTop: "15px",
  },
  errorContainer: {
    marginTop: "15px",
  },
});

export default function Asteroid(props) {
  const classes = useStyles();
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const type = params.get("type");
  const asteroid_id = params.get("asteroid_id");

  const [nasaAsteroidId, setNasaAsteroidId] = useState(false);
  const [asteroidIdDetail, setAsteroidIdDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  if (asteroid_id && asteroid_id !== "" && !nasaAsteroidId) {
    setNasaAsteroidId(asteroid_id);
  }

  useEffect(() => {
    if (nasaAsteroidId) {
      axios
        .get(
          `https://api.nasa.gov/neo/rest/v1/neo/${nasaAsteroidId}?api_key=${Nasa.api_key}`
        )
        .then((res) => {
          setAsteroidIdDetail(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error.response", error.response);
          if (error.response.status === 404) {
            setError("Asteroid ID not found!");
          } else {
            setError("Something went wrong!");
          }
          setIsLoading(false);
        });
    }
  }, [nasaAsteroidId]);

  useEffect(() => {
    if (type === "random") {
      axios
        .get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY`)
        .then((res) => {
          res = res.data.near_earth_objects;
          const randomId = parseInt(res.length * Math.random());
          const RandomAsteroidId = res[randomId];
          setNasaAsteroidId(RandomAsteroidId.id);
        })
        .catch((error) => {});
    }
  }, []);

  return isLoading ? (
    <Box className={classes.progressBar}>
      <CircularProgress />
    </Box>
  ) : (
    <Fragment>
      <Container>
        {error ? (
          <Box className={classes.errorContainer}>
            <Typography variant="body1">{error}</Typography>
          </Box>
        ) : (
          <TableContainer className={classes.table} component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>name</TableCell>
                  <TableCell>{asteroidIdDetail.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>nasa_jpl_url</TableCell>
                  <TableCell>{asteroidIdDetail.nasa_jpl_url}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>is_potentially_hazardous_asteroid</TableCell>
                  <TableCell>
                    {asteroidIdDetail.is_potentially_hazardous_asteroid
                      ? "True"
                      : "False"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Box className={classes.backLink}>
          <Link to="/">Go back</Link>
        </Box>
      </Container>
    </Fragment>
  );
}
