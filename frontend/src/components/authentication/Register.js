import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../../reduxtoolkit/authSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    cpassword: false,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    if (name === "name") {
      if (value.trim() === "") {
        setErrors({
          ...errors,
          [name]: "This field is required",
        });
      } else if (value.trim().length < 3) {
        setErrors({
          ...errors,
          [name]: "Should be at least 3 characters",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.trim() === "") {
        setErrors({
          ...errors,
          [name]: "This field is required",
        });
      } else if (!emailRegex.test(value)) {
        setErrors({
          ...errors,
          [name]: "Enter a valid email address",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    } else if (name === "password") {
      if (value.trim() === "") {
        setErrors({
          ...errors,
          [name]: "This field is required",
        });
      } else if (value.trim().length < 8) {
        setErrors({
          ...errors,
          [name]: "Password must be at least 8 characters long",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    } else if (name === "cpassword") {
      if (value.trim() === "") {
        setErrors({
          ...errors,
          [name]: "This field is required",
        });
      } else if (value.trim() !== data.password) {
        setErrors({
          ...errors,
          [name]: "Password and confirm password do not match",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formHasErrors = Object.values(errors).some((error) => error !== "");
      if (formHasErrors) {
        return;
      }
      dispatch(fetchUserData(data));
      navigate("/");
    } catch (error) {
      toast.error("Something went Wrong");
    }
  }

  return (
    <ThemeProvider theme={createTheme()}>
      <Box>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              padding: "10%",
              borderRadius: "8px",
              border: "2px solid grey",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    value={data.username}
                    onChange={handleChange}
                    onBlur={handleChange}
                    fullWidth
                    id="username"
                    label="First Name"
                    autoFocus
                    error={!!errors.username && touched.username}
                    helperText={errors.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    value={data.email}
                    onChange={handleChange}
                    onBlur={handleChange}
                    name="email"
                    autoComplete="email"
                    error={!!errors.email && touched.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    onBlur={handleChange}
                    id="password"
                    autoComplete="new-password"
                    error={!!errors.password && touched.password}
                    helperText={errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="cpassword"
                    label="Confirm Password"
                    type="password"
                    value={data.cpassword}
                    onChange={handleChange}
                    onBlur={handleChange}
                    id="cpassword"
                    autoComplete="new-cpassword"
                    error={!!errors.cpassword && touched.cpassword}
                    helperText={errors.cpassword}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Register;
