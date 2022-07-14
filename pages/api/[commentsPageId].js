import fs from "fs";
import path from "path";

function handler(req, res) {
  const commentsPageId = req.query.commentsPageId;

  const email = req.body.email;
  const name = req.body.name;
  const commentText = req.body.commentText;

  const newComment = {
    id: new Date().toISOString(),
    email: email,
    name: name,
    commentText: commentText,
  };

  if (req.method === "POST") {
    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res
      .status(201)
      .json({ message: "New comment recorded!", comment: newComment });
    // then take to info provided and send the comment into the collection of comments for this specific page
  } else if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    res.status(200).json({ comment: data });
    // then get the comments for this specific page and display the comments as data
  }
}

export default handler;
