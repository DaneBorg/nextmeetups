import { MongoClient } from "mongodb";

import fs from "fs";
import path from "path";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://stollgart:<password>@nextcluster.3wq4ica.mongodb.net/events?retryWrites=true&w=majority"
  );

  const email = req.body.email;
  const name = req.body.name;
  const commentText = req.body.text;

  const newComment = {
    timeStamp: new Date().toISOString(),
    eventId,
    email: email,
    name: name,
    text: commentText,
  };

  if (req.method === "POST") {
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !commentText ||
      commentText.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const db = client.db();

    const result = await db.collection("comments").insertOne(newComment);

    console.log(newComment);

    console.log(result);

    newComment.id = result.insertedId;

    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({
      message: `New comment recorded for page with id:${eventId}!`,
      comment: newComment,
    });
    // then take to info provided and send the comment into the collection of comments for this specific page
  } else if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    // database integration
    const db = client.db();

    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });

    //res.status(200).json({ comments: data });
    // then get the comments for this specific page and display the comments as data
  }

  client.close();
}

export default handler;
