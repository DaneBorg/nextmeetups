import { MongoClient } from "mongodb";

async function connectDb() {
  const client = await MongoClient.connect(
      "mongodb+srv://stollgart:<password>@nextcluster.3wq4ica.mongodb.net/events?retryWrites=true&w=majority"
    );

  return client;
}

async function insertItem(client, item) {
  const db = client.db();

    await db.collection("newsletter").insertOne(item);
}



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

let client;

try {
  const client = await connectDb();
} catch (error) {
  res.status(500).json({message: "Connecting to the database failed!"});
  return;
}

    
try {
  await insertItem(client, newEntry);
      client.close();
} catch (error) {
  res.status(500).json({message: "Inserting data in to the database failed!"});
  return;
}


    res.status(201).json({ message: "New entry Added!", newEntry: newEntry });
  } else {
    res.status(200).json({ message: "Get the e-mails saved for newsletter" });
    // why do I need a else statement here? Maybe I want to GET all emails and render it on a separate page for a get request!
  }
}

export default handler;
