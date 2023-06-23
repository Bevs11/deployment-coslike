import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import { useNavigate } from "react-router-dom";

const AdForm = () => {
  let styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      minHeight: "700px",
      height: "90vh",
    },
    logoContainer: {},
    title: {
      textAlign: "center",
      fontSize: "30px",
      fontWeight: "bold",
      margin: "3vh 0",
    },
    text: {
      fontSize: "20px",
      textAlign: "center",
      margin: "3vh 0 5vh 0",
    },
    buttonsContainer: {
      display: "flex",
      flexDirection: "column",
    },
    button: {
      margin: "1vh 0",
    },
  };

  const navigate = useNavigate();
  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/addpromo");
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <Grid container sx={styles.container}>
      <Grid item sx={styles.logoContainer}>
        <FaceRetouchingNaturalIcon
          sx={{ fontSize: "10rem", marginTop: "3vh" }}
        />
      </Grid>
      <Grid item>
        <Typography sx={styles.title}>Welcome to Coslike Ads!</Typography>
        <Typography sx={styles.text}>
          Would you like to promote your business or events?
        </Typography>
      </Grid>
      <Grid item sx={styles.buttonsContainer}>
        <Button
          sx={styles.button}
          variant="contained"
          style={{ width: "60vw", maxWidth: "200px" }}
          onClick={clickHandler}
        >
          Yes
        </Button>
        <Button
          sx={styles.button}
          variant="outlined"
          style={{ width: "60vw", maxWidth: "200px" }}
          onClick={cancelHandler}
        >
          No
        </Button>
      </Grid>
    </Grid>
  );
};

export default AdForm;
