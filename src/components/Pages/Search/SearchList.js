import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  TYPE_USER,
  TYPE_UNI,
  TYPE_CLUB,
  TYPE_POST,
} from "../../Contexts/Paths";
import UserItem from "./UserItem";

export default function SearchList({ results }) {
  let users = results.filter((r) => r.searchType === TYPE_USER);
  let universities = results.filter((r) => r.searchType === TYPE_UNI);
  let clubs = results.filter((r) => r.searchType === TYPE_CLUB);
  let posts = results.filter((r) => r.searchType === TYPE_POST);



  return (
    <List sx={{ width: "100%", bgcolor: "none" }}>
      {results && (
        <div>
          <div className="div">
            {users.length > 0 && (
              <div className="div">
                <div className="div">Users</div>
                {users.map((user, i) => {
                  return <UserItem user={user} key={user.id} />;
                })}
              </div>
            )}
            {universities.length > 0 && (
              <div className="div">
                <div className="div">Universities</div>
                {universities.map((user, i) => {
                  return <UserItem user={user} key={user.id} i={i} />;
                })}
              </div>
            )}
            {clubs.length > 0 && (
              <div className="div">
                <div className="div">Clubs</div>
                {clubs.map((user, i) => {
                  return <UserItem user={user} key={user.id} i={i} />;
                })}
              </div>
            )}
            {posts.length > 0 && (
              <div className="div">
                <div className="div">Posts</div>
                {posts.map((user, i) => {
                  return <UserItem user={user} key={user.id} i={i} />;
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </List>
  );
}
