import { Box, Button, Grid, ImageList, ImageListItem, ImageListItemBar, Skeleton } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import getSubcatList from "../queries/get-subcat-list";

interface ICategoryImageList {
  cols: number;
  itemPerPage?: number;
  fixedItem?: boolean;
}

type TSubCatList = {
  items: any;
  total_items: number;
  total_pages: number;
  nextPage: number | undefined;
};

const CategoryImageList = ({ cols = 4, itemPerPage = 10, fixedItem = false }: ICategoryImageList) => {
  const ref = useRef<HTMLImageElement>(null);

  let { data, isError, isLoading, fetchNextPage, hasNextPage, remove } = useInfiniteQuery<TSubCatList>("getSubCatList", ({ pageParam = 1 }) => getSubcatList({ pageParam, itemPerPage }), {
    getNextPageParam: (lastPage, pages) => lastPage?.nextPage,
  });

  useEffect(() => {
    if (fixedItem && data && data.pages.length > 1) remove();
  }, []);

  if (isError) return <div>error</div>;
  if (isLoading)
    return (
      <Grid container spacing={2} rowSpacing={1}>
        {Array(8)
          .fill(null)
          .map((_, key) => (
            <Grid key={key} item xs={3}>
              <Skeleton animation="wave" height={"16vh"} />
            </Grid>
          ))}
      </Grid>
    );

  return (
    <Box display="flex" flexDirection="column" justifyItems="center">
      <ImageList variant="standard" cols={cols}>
        {!!data &&
          data.pages.map((page, pk) => (
            <Fragment key={pk}>
              {page.items.map((item: any, key: number) => (
                <ImageListItem
                  key={key}
                  sx={{
                    ":after": {
                      content: '""',
                      backgroundColor: "#00000066",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      borderRadius: "15px",
                    },
                  }}
                >
                  <img ref={ref} style={{ borderRadius: 15 }} src={item.photo_thumb} alt={"ye"} loading="lazy" />
                  <ImageListItemBar subtitle={item.subcategory_name} sx={{ backgroundColor: "transparent", zIndex: 10 }} />
                </ImageListItem>
              ))}
            </Fragment>
          ))}
      </ImageList>
      {!!hasNextPage && !fixedItem && (
        <Box justifyContent="center" display="flex">
          <Button title="Load More" size="medium" color="warning" onClick={() => fetchNextPage()}>
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CategoryImageList;
