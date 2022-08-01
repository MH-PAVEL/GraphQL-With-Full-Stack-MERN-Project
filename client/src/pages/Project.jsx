import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { GET_PROJECT } from "../queries/projectQuery";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( somethings went wrong!</p>;

  console.log(data, "data from project page");
  return (
    <div>
      <Container>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item md={8} sm={12} xs={12}>
            <Card sx={{ mt: 4 }}>
              <CardContent>
                <Stack
                  sx={{ width: "100%", my: 2 }}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button variant="outlined" color="primary">
                      Back
                    </Button>
                  </Link>
                </Stack>

                <Stack>
                  <Typography variant="h2" color="inherit">
                    <strong>{data.project.name}</strong>
                  </Typography>
                  <Typography variant="subtitle1" color="inherit">
                    {data.project.description}
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" color="inherit">
                      Project Status
                    </Typography>
                    <Typography variant="subtitle1" color="inherit">
                      <strong>{data.project.status}</strong>
                    </Typography>
                  </Box>
                </Stack>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" color="inherit">
                    Client Information
                  </Typography>
                  <List sx={{ border: "1px solid #f2f2f2", mt: 2 }}>
                    <ListItemButton sx={{ py: 0, minHeight: 32 }} divider>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={data.project.client.name}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
                        }}
                      />
                    </ListItemButton>
                    <ListItemButton sx={{ py: 0, minHeight: 32 }} divider>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={data.project.client.email}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
                        }}
                      />
                    </ListItemButton>
                    <ListItemButton sx={{ py: 0, minHeight: 32 }}>
                      <ListItemIcon>
                        <LocalPhoneIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={data.project.client.phone}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: "medium",
                        }}
                      />
                    </ListItemButton>
                  </List>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Project;
