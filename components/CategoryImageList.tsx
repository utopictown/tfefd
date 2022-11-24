import { SearchOutlined } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Input, InputAdornment, Skeleton } from "@mui/material";
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import getSubcatList from "../queries/get-subcat-list";

interface ICategoryImageList {
  cols: number;
  itemPerPage?: number;
  fixedItem?: boolean;
  showSearchBar?: boolean;
}

type TSubCatList = {
  items: any;
  total_items: number;
  total_pages: number;
  nextPage: number | undefined;
};

const CategoryImageList = ({ cols = 4, itemPerPage = 10, fixedItem = false, showSearchBar = false }: ICategoryImageList) => {
  const ref = useRef<HTMLImageElement>(null);
  const [qSearch, setQSearch] = useState("");
  const queryClient = useQueryClient();

  let { data, isError, isLoading, fetchNextPage, hasNextPage, remove, refetch } = useInfiniteQuery<TSubCatList>(
    "getSubCatList",
    ({ pageParam = 1 }) => getSubcatList({ pageParam, itemPerPage, qSearch }),
    {
      getNextPageParam: (lastPage, pages) => lastPage?.nextPage,
    }
  );

  useEffect(() => {
    if (fixedItem && data && (data.pages.length > 1 || data.pages[0].items.length > itemPerPage)) remove();
  }, []);

  useEffect(() => {
    refetch();
  }, [qSearch]);

  const handleReset = useCallback(async () => {
    queryClient.setQueryData("getSubCatList", (oldData: any) => {
      return { ...oldData, pages: oldData.pages.slice(0, 1) };
    });
    setQSearch("");
  }, []);

  if (isLoading || isError)
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
      {showSearchBar && (
        <Input
          value={qSearch}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
          sx={{ width: "100%", ":after": { borderColor: "#ff7b00" } }}
          onChange={(e) => setQSearch(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="search" onClick={() => refetch()}>
                {<SearchOutlined />}
              </IconButton>
            </InputAdornment>
          }
        />
      )}
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
          <Button variant="outlined" title="Load More" size="medium" color="warning" onClick={() => fetchNextPage()}>
            Load More
          </Button>
        </Box>
      )}
      {!hasNextPage && (
        <Box justifyContent="center" display="flex">
          <Button variant="contained" title="Load More" size="medium" color="warning" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CategoryImageList;
