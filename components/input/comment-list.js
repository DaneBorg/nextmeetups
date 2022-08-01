import { useState } from "react";

import classes from "./comment-list.module.css";

function CommentList(props) {
  const [comments, setComments] = useState([]);

  function loadCommentsHandler() {
    fetch("/api/comments/[eventId]")
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comment);
      });
  }

  return (
    <ul className={classes.comments} onClick={loadCommentsHandler}>
      {/* Render list of comments - fetched from API */}
      {comments.map((item) => (
        <li key={item.id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
      <li>
        <p>My comment wants to be the best!</p>
        <div>
          By <address>Karolus Williamsohn</address>
        </div>
      </li>
      <li>
        <p>I have the best comment!!!!</p>
        <div>
          By <address>Hakkon Olavffjarl</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;
