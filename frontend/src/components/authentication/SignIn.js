import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchloginData } from "../../reduxtoolkit/loginSlice";
import { toast } from "react-toastify";

function SignIn() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    if (login.islogin) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [login.islogin]);
  function handleChange(e) {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!value.trim()) {
        setErrors({ ...errors, [name]: "This field is required" });
      } else if (!emailRegex.test(value)) {
        setErrors({ ...errors, [name]: "Enter a valid email address" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    } else if (name === "password") {
      if (!value.trim()) {
        setErrors({ ...errors, [name]: "This field is required" });
      } else if (value.length < 8) {
        setErrors({
          ...errors,
          [name]: "Password must be at least 8 characters long",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
    setData({ ...data, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      if (data.email && data.password && !errors.email && !errors.password) {
        dispatch(fetchloginData(data));
      } else {
        toast.error("Fill all the fields");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form");
    }
  }

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            border: "2px solid grey",
            padding: "5%",
            borderRadius: "5%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              error={!!errors.email && touched.email}
              helperText={errors.email}
              margin="normal"
              type="email"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              error={!!errors.password && touched.password}
              helperText={errors.password}
              margin="normal"
              required
              fullWidth
              name="password"
              value={data.password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default SignIn;
