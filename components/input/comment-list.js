import classes from "./comment-list.module.css";

function CommentList() {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
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
