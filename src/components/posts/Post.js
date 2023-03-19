import DateFormater from "../../utils/DateFormater";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
} from "react-icons/ai";
import { GrView } from "react-icons/gr";
import "../../css/singlePost.css";
import { useDispatch, useSelector } from "react-redux";
import { postDisLikes, postLikes } from "../../context/slice/post/postSlice";
import { Link } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import { Button } from "@mui/material";

export default function Post({ post }) {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.users);
  const isLiked = post.likes.find((p) => {
    return p.id.toString() === user.user.id.toString();
  });
  const isDisLiked = post.DisLikes.find((p) => {
    return p.id.toString() === user.user.id.toString();
  });

  // console.log(isLiked, isDisLiked);
  const postLikeHandler = async (id) => {
    await dispatch(postLikes(id));
  };
  const postDisLikeHandler = async (id) => {
    await dispatch(postDisLikes(id));
  };
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            src={user?.user?.profilePhoto}
            alt={user?.user?.profilePhoto}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user?.user?.firstName + " " + user?.user?.lastName}
        subheader={post?.createdAt?.split("T")?.[0]}
      />
      <CardMedia component="img" image={post?.image} alt={post?.title} />
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {post?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="views">
          <GrView />
          <span style={{ fontSize: "1rem", marginLeft: "5px" }}>
            {post.numViews}
          </span>
        </IconButton>
        <IconButton aria-label="likes">
          <FavoriteIcon />{" "}
          <span style={{ fontSize: "1rem", marginLeft: "5px" }}>
            {post.likes.length}
          </span>
        </IconButton>
        <IconButton aria-label="comments">
          <ChatIcon />
          <span style={{ fontSize: "1rem", marginLeft: "5px" }}>
            {post.comments.length}
          </span>
        </IconButton>
        <Button variant="contained" size="small" href={`/posts/${post._id}`}>View Post</Button>
      </CardActions>
    </Card>
  );
}
