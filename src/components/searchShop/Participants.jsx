import {
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
  DialogActions,
  Button,
  Card,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const Participants = (props) => {
  // 必要なpropsは以下
  // props.open (ポップアップの表示を表すboolean, tureになると表示されるようになる)
  // props.onClose (openのtrue、falseを切り替えるためのuseStateのset関数)
  // props.setparticipants (決定した参加者のリストをセットするためのset関数)
  const dummyParticipants = [
    { id: 1, name: "鈴木圭祐", tags: ["個室"] },
    { id: 2, name: "川元良明", tags: ["個室"] },
    { id: 3, name: "高橋涼", tags: ["個室"] },
    { id: 4, name: "松橋洋典", tags: ["個室"] },
    { id: 5, name: "有松大河", tags: ["個室"] },
    { id: 6, name: "金村洋一", tags: ["個室"] },
    { id: 7, name: "後藤楓", tags: ["個室"] },
    { id: 8, name: "島田奈津子", tags: ["個室"] },
    { id: 9, name: "木下将司", tags: ["個室"] },
    { id: 10, name: "中野晃", tags: ["個室"] },
    { id: 11, name: "吉田正人", tags: ["個室"] },
    { id: 12, name: "内田穂乃花", tags: ["個室"] },
    { id: 13, name: "伊藤大輔", tags: ["個室"] },
  ];

  // チェックされた参加者のIDのリスト
  const [checked, setChecked] = useState([]);
  // ユーザ全員のリスト
  const [all, setAll] = useState(dummyParticipants);
  // 検索で絞り込まれたユーザのリスト
  const [display, setDisplay] = useState(all);

  const handleSearch = (e) => {
    const newDisplay = all.filter((name) => name.includes(e.target.value));
    setDisplay(newDisplay);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleSubmit = () => {
    props.setParticipants(checked);
    props.setPersonNum(checked.length);
    props.onClose(false);
  };

  return (
    <Dialog
      open={props.open}
      fullWidth
      onClose={() => props.onClose(false)}
      sx={{ "& .MuiDialog-paper": { position: "absolute", top: "20px" } }}
    >
      <DialogTitle>
        <Typography variant="h6" sx={{ mb: "8px" }}>
          参加者リスト
        </Typography>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
          sx={{ width: "100%" }}
          onChange={handleSearch}
        />
      </DialogTitle>
      <DialogContent dividers sx={{ p: "0 24px" }}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {display.map((value, index) => {
            const labelId = `checkbox-list-label-${value.id}`;

            return (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value.id)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={value.name}
                      primaryTypographyProps={{
                        sx: { fontSize: "16px" },
                      }}
                    />
                    {value.tags.map((tag) => {
                      return (
                        <Card
                          sx={{
                            display: "inline",
                            m: "0 2px",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Typography
                            gutterBottom
                            component="span"
                            sx={{ p: "4px", fontSize: "14px" }}
                          >
                            #{tag}
                          </Typography>
                        </Card>
                      );
                    })}
                  </ListItemButton>
                </ListItem>
                {index !== display.length - 1 && <Divider />}
              </>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions dividers>
        <Button variant="contained" onClick={handleSubmit}>
          決定
        </Button>
        <Button variant="outlined" onClick={() => props.onClose(false)}>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Participants;
