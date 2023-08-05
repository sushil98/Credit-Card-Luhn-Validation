import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Typography, Box, TextField, Button } from "@mui/material";
import { BiLock } from "react-icons/bi";

import ReactInputMask from "react-input-mask";
function App() {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [isValid, setIsValid] = useState(null);


  const handleChange = (event) => {
    setCreditCardNumber(event.target.value);
    setIsValid(null);
  };

  const handleValidate = (e) => {
    e.preventDefault();
    if (creditCardNumber) {
      axios
        .post("http://localhost:5000/validate-credit-card", {
          creditCardNumber,
        })
        .then((response) => {
          setIsValid(response.data.isValid);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setCreditCardNumber("");
  };

  return (
    <div className="App">
      <BiLock size="80" />
      <Typography
        color="text.primary"
        marginBottom={4}
        fontSize={25}
        fontWeight={200}
      >
        Check Your Credit Card Here
      </Typography>
      <hr />
      <Box component="form" Validate sx={{ mt: 1 }} className="box">
        <img src={require("./Icons.jpg")}></img>
        <div className="cardnum">
          <Typography marginTop={2}>Card Number: </Typography>
          <ReactInputMask
            mask="9999 9999 9999 9999"
            maskChar=" "
            alwaysShowMask={true}
            type="text"
            value={creditCardNumber}
            onChange={handleChange}
          ></ReactInputMask>
        </div>

        <Button
          className="btn"
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleValidate}
        >
          Submit
        </Button>
        {isValid !== null && (
          <Typography>
            {isValid
              ? "Your card number is valid."
              : "Your card number is Invalid."}
          </Typography>
        )}
      </Box>
    </div>
  );
}

export default App;
