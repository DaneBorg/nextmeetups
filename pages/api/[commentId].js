import fs from "fs";
import path from "path";

function handler(req, res) {
  const commentId = req.query.commentId;

  if (req.method === "POST") {
    // then take to info provided and send the comment into the collection of comments for this specific page
  } else if (req.method === "GET") {
    // then get the comments for this specific page and display the comments
  }
}

export default handler;
