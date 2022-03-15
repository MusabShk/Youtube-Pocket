import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CardActions from "@mui/material/CardActions";
import dateFormat, { masks } from "dateformat";
import { TiTick } from "react-icons/ti";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import ReactPlayer from "react-player";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "none",
  //   border: "5px solid #000",
  boxShadow: 24,
  width: "70%",
  height: "60%",
};

const useStyles = makeStyles(() => {
  return {
    card_heading: {
      fontFamily: "Fredoka",
      fontWeight: 500,
      fontSize: 20,
    },
    card_description: {
      fontFamily: "Fredoka",
      fontWeight: 300,
      fontSize: 15,
    },
    card_date: {
      fontFamily: "Fredoka",
      fontWeight: 500,
      fontSize: 12,
      color: "grey",
      textAlign: "left",
    },
    card_channelName: {
      fontFamily: "Fredoka",
      fontWeight: 500,
      fontSize: 13,
      // color: "darkblue",
      // textAlign: "left",
    },
  };
});

const Cards = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Card elevation={0}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={props.thumbnail}
            onClick={handleOpen}
            sx={{ borderRadius: 0 }}
          />
          <CardContent onClick={handleOpen}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className={classes.card_heading}
            >
              {props.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className={classes.card_description}
            >
              {props.description}
            </Typography>
            <Grid
              container
              justifyContent="space-between"
              sx={{ marginTop: 1 }}
              spacing={1}
            >
              <Grid item xs={12}>
                <Chip
                  label={`${props.channelName}`}
                  icon={<TiTick />}
                  className={classes.card_channelName}
                  variant="outlined"
                />

                {/* <Typography >
                  {props.channelName}
                </Typography> */}
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.card_date}>
                  {dateFormat(`${props.postTime.substring(0, 10)}`, "fullDate")}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${props.vidId}`}
                  controls={false}
                  playing={true}
                  width={"100%"}
                  height={"100%"}
                />
                {/* <Card>
                  <CardActionArea>
                    <CardMedia
                      component="iframe"
                      height="400"
                      src="https://www.youtube.com/embed/ke1pkMV44iU"
                    />
                  </CardActionArea>
                </Card> */}
              </Box>
            </Fade>
          </Modal>
          {/* <CardActions></CardActions> */}
        </CardActionArea>
      </Card>
    </>
  );
};

export default Cards;
