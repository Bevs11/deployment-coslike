import React from "react";
import { Box, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import Promotion from "./Promotion";

const AdPreview = () => {
  let styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      minHeight: "90vh",
    },
    content: {
      width: "90%",

      maxWidth: "500px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "700px",
    },
    title: {
      fontSize: "25px",
    },
    previewContainer: {
      border: "1px solid gray",
      width: "100%",
      borderRadius: "10px",
    },
    adHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginTop: "0.5rem",
    },
    headerLeft: {
      display: "flex",
      marginLeft: "0.5rem",
      alignItems: "center",
    },
    imageContainer: {
      marginTop: "0.5rem",
    },
    image: {
      backgroundColor: "#c3cfd9",
      width: "100%",
      height: "30vh",
    },
    infoContainer: {},
    approvalContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "1.5rem",
    },
    buttonsContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "80%",
      marginTop: "1rem",
    },
  };

  const navigate = useNavigate();
  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/adsubmit");
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/addpromo");
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Box style={{ margin: "0.5rem 0" }}>
          <Typography sx={styles.title}>Preview</Typography>
        </Box>
        <Box>
          <Box sx={styles.previewContainer}>
            <Promotion />
          </Box>
          <Box sx={styles.approvalContainer}>
            <Typography style={{ fontSize: "25px" }}>Is this ok?</Typography>
            <Box sx={styles.buttonsContainer}>
              <CancelIcon
                style={{ color: "red", fontSize: "5rem" }}
                onClick={cancelHandler}
              />
              <CheckCircleIcon
                style={{ color: "green", fontSize: "5rem" }}
                onClick={clickHandler}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdPreview;
