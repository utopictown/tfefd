import { ArrowBackIos } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import CategoryImageList from "../components/CategoryImageList";
import Layout from "../components/Layout";

function category() {
  const router = useRouter();
  return (
    <Layout>
      <Button onClick={() => router.back()} sx={{ marginTop: 2, color: "black", textTransform: "capitalize", padding: 0 }} size="small" color="warning">
        <Box display="flex" flexDirection="row">
          <ArrowBackIos fontSize="small" />
          <Typography variant="body1" ml={4} fontWeight={500}>
            Kategori
          </Typography>
        </Box>
      </Button>
      <CategoryImageList cols={3} showSearchBar />
    </Layout>
  );
}

export default category;
