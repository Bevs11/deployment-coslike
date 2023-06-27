import React, { useState, useEffect } from "react";
import { Button, Typography, TextField, Box, Grid } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPromo = () => {
  let styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "5px",
      border: "1px solid rgb(211, 211, 211)",
      margin: "5px",
      minHeighteight: "90vh",
      width: "100%",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "700px",
      width: "90vw",
      maxWidth: "500px",
    },
    imgContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "80%",
      maxWidth: "600px",
      height: "300px",
      backgroundColor: "rgb(211, 211, 211)",
      margin: "1.5rem 0 1rem 0",
      borderRadius: "5px",
    },
    icon: {
      fontSize: "10rem",
      maxWidth: "200px",
      color: "rgb(64, 64, 64)",
    },
    text: {
      fontSize: "30px",
      marginTop: "1.5rem",
    },
    input: {
      width: "80%",
      maxWidth: "600px",
    },
    button: {
      fontSize: "large",
      margin: "1.5rem",
    },
  };

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/adpreview");
  };
  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  const appendPhoto = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      console.log("filename:", Date.now() + file.name);
      data.append("name", fileName);
      data.append("file", file);

      try {
        await axios.post(`${URL}/api/v1/upload`, data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Typography sx={styles.text}>Create Promotion Post</Typography>
        <Box sx={styles.imgContainer}>
          {file ? (
            <img src={image} />
          ) : (
            <AddPhotoAlternateIcon sx={styles.icon} />
          )}
        </Box>
        <input
          style={{ marginBottom: "1rem" }}
          type="file"
          id="file"
          accept=".png,.jpeg,.jpg"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={appendPhoto}>Upload</button>
        <TextField sx={styles.input} value="description" multiline rows={4} />
        <Box>
          <Button variant="outlined" sx={styles.button} onClick={cancelHandler}>
            Cancel
          </Button>
          <Button variant="contained" sx={styles.button} onClick={clickHandler}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddPromo;
