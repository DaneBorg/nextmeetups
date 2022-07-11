import fs from "fs";
import path from "path";

function handler(req, res) {
  const commentsPageId = req.query.commentsPageId;

  if (req.method === "POST") {
    const filePath = path.join(process.cwd);
    // then take to info provided and send the comment into the collection of comments for this specific page
  } else if (req.method === "GET") {
    // then get the comments for this specific page and display the comments
  }
}

export default handler;
