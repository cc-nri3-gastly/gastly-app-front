import * as React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function SearchCondition(props) {
  const url = "/shops/test";
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4B709A",
        contrastText: "#fff",
      },
      secondary: {
        main: "#29384b",
      },
    },
  });
  const [area, setArea] = useState("");

  const onChangeSetArea = (event) => {
    setArea(event.target.value);
  };

  const onClickSearchShopIsSubmitted = () => {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.setSearchShopIsSubmitted(true);
        props.setResultSearchShop(data);
      })
      .catch((err) => {
        console.log(err);
        console.log("err");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        {/* <Stack
          direction="row"
          spacing={4}
          justifyContent="flex-start"
          alignItems="flex-end"
        > */}
        <InputLabel id="demo-simple-select-standard-label">エリア</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={area}
          onChange={onChangeSetArea}
          label="エリア"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value={1}>大手町</MenuItem>
          <MenuItem value={2}>みなとみらい</MenuItem>
          <MenuItem value={3}>木場</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        {/* <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="人数"
              variant="standard"
              sx={{ minWidth: 180 }}
            />
          </Box> */}
        <InputLabel id="demo">目的</InputLabel>
        <Select
          labelId="demo"
          id="demo"
          value={1}
          onChange={onChangeSetArea}
          label="目的"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value={1}>歓送迎会</MenuItem>
          <MenuItem value={2}>忘年会・新年会</MenuItem>
          <MenuItem value={3}>普段使い</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={1}
          onChange={onChangeSetArea}
          label="Area"
          sx={{ minWidth: 180 }}
          placeholder="選択してください"
        >
          <MenuItem value={1} disabled>
            登録方法選択してください
          </MenuItem>
          <MenuItem value={2}>参加者</MenuItem>
          <MenuItem value={3}>参加人数</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        size="small"
        startIcon={<SearchIcon />}
        onClick={onClickSearchShopIsSubmitted}
        sx={{ height: "40px" }}
      >
        検索
      </Button>
      {/* <Button
            variant='contained'
            size='small'
            startIcon={<SearchIcon />}
            onClick={onClickSearchShopIsSubmitted}
            sx={{ height: '40px', mt: '6rem' }}
          >
            検索
          </Button> */}
      {/* </Stack> */}
    </ThemeProvider>
  );
}
