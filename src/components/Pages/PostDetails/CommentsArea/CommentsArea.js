import React, { useCallback, useRef, useState } from "react";
import { useAuthState } from "../../../Contexts";
import Comment from "./Comment";
import AllCommentsShowingMessage from "./AllCommentsShowingMessage";
import useGetComments from "./useGetComments";
import WriteCommentComponent from "../../HomePosts/WriteCommentComponent";
import { Chip, Divider } from "@mui/material";
function CommentsArea({ postId }) {
  const [pageNumber, setPageNumber] = useState(0);
  const mainState = useAuthState(); //read user details from context
  const { comments, setComments, hasMore, loading } = useGetComments(
    postId,
    pageNumber
  );
  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [postId, loading, hasMore] //eslint-disable-line
  );

  return (
    <>
      {
        <WriteCommentComponent
          postId={postId}
          comments={comments}
          setComments={setComments}
        />
      }
      {
        <Divider>
          <Chip label="Comments" />
        </Divider>
      }
      {comments &&
        comments.map((comment, i) => {
          if (comments.length === i + 1) {
            return (
              <div key={i} ref={lastPostElementRef} className="div">
                <Comment comment={comment} mainUserId={mainState.user.id} />
              </div>
            );
          } else {
            return (
              <Comment
                key={i}
                comment={comment}
                mainUserId={mainState.user.id}
              />
            );
          }
        })}
      {!loading && !hasMore && <AllCommentsShowingMessage />}
    </>
  );
}

export default CommentsArea;
