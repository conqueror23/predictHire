import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {useRouter} from 'next/router'

// can be used potentially to sent login info through graphql to restful apis
import { initializeApollo } from "../lib/apollo";
import { FIND_USER_BY_USERNAME } from "../lib/queries";
import { useQuery, gql } from "@apollo/client";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submit = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const result = await fetch(
      `http://localhost:3002/find/username=${submit.get(
        "username"
      )}&password=${submit.get("password")}`
    );
      const {message} = await result.json();
    if (message.length>0) {
      //navitage to dashboard
      // save user data including user
      localStorage.setItem("user-username",message[0].username);
      localStorage.setItem("user-role",message[0].role);
      localStorage.setItem("user-name",message[0].name)
      router.push('/dashboard')
    } else {
      //simple error warnings
      alert("username password unmatch");
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

//set serversider rendering
//  export const getStaticProps=async()=>{
//    const apolloClient = initializeApollo();
//    populate query result in cache

//    await apolloClient.query({
//      query: FIND_USER_BY_USERNAME,
//      variables:{ username: 'bruce'},
//    });

//   await apolloClient.query({
//     query:MyQuery
//   })

//  return {props:{initializeApollo: apolloClient.cache.extract()}}
// }
