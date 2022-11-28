import * as React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./search.css";
import Participants from "./Participants";

export default function SearchCondition(props) {
  const url = "/shops";
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
  const [purpose, setPurpose] = useState("");
  const [participants, setParticipants] = useState([]);
  const [memberType, setMemberType] = useState(1);
  const [personNum, setPersonNum] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const onChangeSetArea = (event) => {
    setArea(event.target.value);
  };

  const onChangeSetPurpose = (event) => {
    setPurpose(event.target.value);
  };

  const onChangeSetMemberType = (event) => {
    setMemberType(event.target.value);
  };

  const onChangeSetPersonNum = (event) => {
    setParticipants([]);
    if (event.target.value) {
      if (event.target.value.match(/^[1-9][0-9]*/)) {
        setPersonNum(Number(event.target.value));
      } else {
        alert("参加人数は1以上の数字で入力してください");
      }
    }
  };

  const onClickSearchShopIsSubmitted = () => {
    let req = {
      areaId: area,
      purposeId: purpose,
      personNum: personNum,
      participantsId: participants,
    };

    console.log(req);
    fetch(url, {
      method: "POST",
      header: {
        "content-type": "application/json",
      },
      body: JSON.stringify(req),
    })
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
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-area-label">エリア</InputLabel>
          <Select
            labelId="select-area-label"
            id="select-area"
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
          <InputLabel id="select-purpose-label">目的</InputLabel>
          <Select
            labelId="select-purpose-label"
            id="select-purpose"
            value={purpose}
            onChange={onChangeSetPurpose}
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
            value={memberType}
            onChange={onChangeSetMemberType}
            label="memberType"
            sx={{ minWidth: 180, height: 56 }}
            className="search"
          >
            <MenuItem value={1} disabled>
              参加者の追加
            </MenuItem>
            <MenuItem value={2}>参加者を指定</MenuItem>
            <MenuItem value={3}>参加人数のみ指定</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          {memberType === 2 ? (
            <>
              <Button
                variant="outlined"
                sx={{ height: 56 }}
                onClick={() => setShowDialog(true)}
              >
                参加者を選択してください
              </Button>
              <Participants
                open={showDialog}
                onClose={setShowDialog}
                participants={participants}
                setParticipants={setParticipants}
                personNum={personNum}
                setPersonNum={setPersonNum}
              />
            </>
          ) : memberType === 3 ? (
            <TextField
              id="outlined-basic"
              label="参加人数"
              variant="outlined"
              onChange={onChangeSetPersonNum}
            />
          ) : (
            <p></p>
          )}
        </FormControl>
      </div>
      <div className="search-button">
        <Button
          variant="outlined"
          size="small"
          startIcon={<SearchIcon />}
          onClick={onClickSearchShopIsSubmitted}
          sx={{ height: "40px" }}
        >
          お店を探す
        </Button>
      </div>
    </ThemeProvider>
  );
}
