import * as React from "react";
import List from "@mui/material/List";

import {
  TYPE_USER,
  TYPE_UNI,
  TYPE_CLUB,
  TYPE_POST,
} from "../../Contexts/Paths";
import UserItem from "./UserItem";
import UniItem from "./UniItem";
import ClubItem from "./ClubItem";
import PostItem from "./PostItem";
import { Button, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function SearchList({ results, filters, text }) {
  const navigate = useNavigate();
  let users = results.filter((r) => r.searchType === TYPE_USER);
  let universities = results.filter((r) => r.searchType === TYPE_UNI);
  let clubs = results.filter((r) => r.searchType === TYPE_CLUB);
  let posts = results.filter((r) => r.searchType === TYPE_POST);
  const TYPE_ALL =
    TYPE_USER + "," + TYPE_UNI + "," + TYPE_CLUB + "," + TYPE_POST;


  const handleFilterClick = (filter) => {
    if (filter === TYPE_ALL) {
      navigate(
        "/search?filters=" + filter + "&text=" + text + "&page=0&size=10"
      );
    } else {
      navigate(
        "/search?filters=" + filter + "&text=" + text + "&page=0&size=5"
      );
    }
  };
  return (
    <List sx={{ width: "100%", bgcolor: "none" }}>
      {results && (
        <div>
          <div className="div">
            {users.length > 0 && (
              <div className="div">
                <Chip
                  color="warning"
                  label="Users"
                  sx={{ marginLeft: "12px", marginTop: "12px" }}
                />

                {users.map((user, i) => {
                  return <UserItem user={user} key={user.id} />;
                })}
                {filters === TYPE_ALL && (
                  <Button
                    variant="text"
                    fullWidth
                    startIcon={<SearchIcon />}
                    sx={{ marginBottom: "6px !important",color:"#ed6c02" }}
                    onClick={() => handleFilterClick(TYPE_USER)}
                  >
                    Search All Users
                  </Button>
                )}
              </div>
            )}
            {universities.length > 0 && (
              <div className="div">
                <Chip
                  color="primary"
                  label="Universities"
                  sx={{ marginLeft: "12px", marginTop: "12px" }}
                />
                {universities.map((user, i) => {
                  return <UniItem user={user} key={user.id} i={i} />;
                })}
                  {filters === TYPE_ALL && (
                  <Button
                    variant="text"
                    fullWidth
                    startIcon={<SearchIcon />}
                    sx={{ marginBottom: "6px !important",color:"#1976d2" }}
                    onClick={() => handleFilterClick(TYPE_UNI)}
                  >
                    Search All Universities
                  </Button>
                )}
              </div>
            )}
            {clubs.length > 0 && (
              <div className="div">
                <Chip
                  color="success"
                  label="Clubs"
                  sx={{ marginLeft: "12px", marginTop: "12px" }}
                />
                {clubs.map((user, i) => {
                  return <ClubItem user={user} key={user.id} i={i} />;
                })}
                  {filters === TYPE_ALL && (
                  <Button
                    variant="text"
                    fullWidth
                    startIcon={<SearchIcon />}
                    sx={{ marginBottom: "6px !important",color:"#2e7d32"  }}
                    onClick={() => handleFilterClick(TYPE_CLUB)}
                  >
                    Search All Clubs
                  </Button>
                )}
              </div>
            )}
            {posts.length > 0 && (
              <div className="div">
                <Chip
                  color="secondary"
                  label="Posts"
                  sx={{ marginLeft: "12px", marginTop: "12px" }}
                />
                {posts.map((user, i) => {
                  return <PostItem user={user} key={user.id} i={i} />;
                })}
                  {filters === TYPE_ALL && (
                  <Button
                    variant="text"
                    fullWidth
                    startIcon={<SearchIcon />}
                    sx={{ marginBottom: "6px !important",color:"#9c27b0" }}
                    onClick={() => handleFilterClick(TYPE_POST)}
                  >
                    Search All Posts
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </List>
  );
}
