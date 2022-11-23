import Head from "next/head";
import { BottomNavigation, BottomNavigationAction, Box, Container, Paper, styled } from "@mui/material";
import { useState, FC, ReactNode } from "react";
import { AccountCircleOutlined, HomeOutlined, MapOutlined, PhotoCameraOutlined, RestaurantMenuOutlined } from "@mui/icons-material";

interface ILayout {
  children: ReactNode;
  title?: string;
  description?: string;
}

const NavAction = styled(BottomNavigationAction)(`
&.Mui-selected {
  color: #ff7b00;
}`);

export default function Layout({ children, title = "tfefd", description = "tfefd fe app" }: ILayout) {
  const [value, setValue] = useState(3);

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }} disableGutters={true}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box marginX={2} paddingBottom={8}>
        {children}
      </Box>
      <Paper sx={{ maxWidth: "sm", position: "fixed", bottom: 0, width: "100%" }} elevation={3}>
        <BottomNavigation value={value} sx={{ justifyContent: "space-between" }}>
          <NavAction icon={<HomeOutlined />} />
          <NavAction icon={<MapOutlined />} />
          <NavAction icon={<PhotoCameraOutlined />} />
          <NavAction icon={<RestaurantMenuOutlined />} />
          <NavAction icon={<AccountCircleOutlined />} />
        </BottomNavigation>
      </Paper>
    </Container>
  );
}
