import * as React from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import img1 from "../img/yakitori.jpg";
import img2 from "../img/funamori.jpg";
import img3 from "../img/nikubaru.jpg";
import "../../SearchResult.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button } from "@mui/material";

export default function SearchResult(props) {
  const resultSearchShop = props.resultSearchShop;
  // 店の画像イメージ
  const imgs = [img1, img3, img2];
  // 店のタグのダミーデータ
  const dummy = ["個室あり", "喫煙可", "ビール"];

  const theme = createTheme({
    palette: {
      primary: {
        main: "#f2b135",
        contrastText: "#29384b",
      },
      secondary: {
        main: "#4B709A",
      },
    },
  });

  return (
    <div className="resultSearchShopContents">
      <ThemeProvider theme={theme}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: "12px" }}>
          今回の参加者に合った秘伝の店
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          {resultSearchShop.map((eachResultSearchShop, index) => {
            return (
              <Card sx={{ minWidth: 345, maxWidth: 345 }} key={index}>
                <CardMedia
                  component="img"
                  height="140"
                  image={imgs[index]}
                  alt="shop photo"
                />
                <CardContent>
                  <CardActions sx={{ p: "0" }}>
                    <Link
                      href={eachResultSearchShop["url"]}
                      sx={{ m: "auto" }}
                      color="secondary"
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        {eachResultSearchShop["name"]}
                      </Typography>
                    </Link>
                  </CardActions>
                  <div>
                    {dummy.map((tag) => (
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
                          sx={{ p: "4px" }}
                        >
                          #{tag}
                        </Typography>
                      </Card>
                    ))}
                  </div>
                  <Rating
                    name="shop-ratingAverage"
                    defaultValue={eachResultSearchShop["ratingAverage"]}
                    precision={0.1}
                    readOnly
                    sx={{ mt: "8px" }}
                  />
                  <div>
                    <Button
                      variant="contained"
                      sx={{
                        height: "48px",
                        width: "118px",
                        mt: "8px",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      ここに行く
                    </Button>
                  </div>
                  <List>
                    {eachResultSearchShop.comments.map((comment) => {
                      return (
                        <ListItem className="balloon">
                          <ListItemText primary={comment} />
                        </ListItem>
                      );
                    })}
                  </List>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </ThemeProvider>
    </div>
  );
}
