import fs from "fs";
import path from "path";

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    const newEntry = {
      id: new Date().toISOString(),
      email: email,
    };

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
