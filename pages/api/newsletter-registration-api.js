import { MongoClient } from "mongodb";

import fs from "fs";
import path from "path";

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }
    const newEntry = {
      timeStamp: new Date().toISOString(),
      email: email,
    };

    const client = await MongoClient.connect(
      "mongodb+srv://stollgart:<password>@nextcluster.3wq4ica.mongodb.net/events?retryWrites=true&w=majority"
    );
    const db = client.db();

    await db.collection("newsletter").insertOne(newEntry);

    client.close();

    console.log(email);
    console.log(newEntry);

    // store the new email entry in the list to a database or a local file
    const filePath = path.join(
      process.cwd(),
      "data",
      "newsletterAddresses.json"
    );
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newEntry);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "New entry Added!", newEntry: newEntry });
  } else {
    res.status(200).json({ message: "Get the e-mails saved for newsletter" });
    // why do I need a else statement here?
  }
}

export default handler;
