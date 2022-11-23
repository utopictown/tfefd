import { Box, Typography } from "@mui/material";
import Link from "next/link";
import Layout from "../components/Layout";
import CategoryImageList from "../components/CategoryImageList";

export default function Home() {
  return (
    <Layout>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" marginTop={2}>
        <Typography variant="body1" fontSize="1rem" fontWeight={500}>
          Kategori
        </Typography>
        <Typography variant="body1" color="#ff7b00">
          <Link href={"/category"} style={{ textDecoration: "none" }}>
            Lihat Semua
          </Link>
        </Typography>
      </Box>
      <CategoryImageList cols={4} itemPerPage={8} fixedItem />
    </Layout>
  );
}
