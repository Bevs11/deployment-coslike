import React, { useContext } from "react";
import { Box, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const AdSubmit = () => {
  let styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "700px",
      height: "90vh",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "600px",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "1rem",
    },
    checkIcon: {
      color: "green",
      fontSize: "200px",
      maxWidth: "300px",
    },
    infoContainer: {
      width: "100%",
    },
    info: {
      backgroundColor: "#c3cfd9",
      height: "90vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    approveContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: "2rem 0",
    },
  };

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <Grid container sx={styles.container}>
      <Grid item sx={styles.content}>
        <Grid item sx={styles.header}>
          <CheckCircleIcon sx={styles.checkIcon} />
          <Typography style={{ fontSize: "30px", fontWeight: "bold" }}>
            We are done!
          </Typography>
        </Grid>
        <Button
          style={{ margin: "1rem 0", fontSize: "20px" }}
          variant="contained"
          onClick={clickHandler}
        >
          Start
        </Button>
      </Grid>
    </Grid>
  );
};

export default AdSubmit;
