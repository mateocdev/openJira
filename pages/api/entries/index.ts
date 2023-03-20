import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case "POST":
      return postEntry(req, res);

    default:
      return res.status(400).json({ message: "Bad Request" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  try {
    await db.connectToDatabase();
    const entries = await Entry.find().sort({ createdAt: "ascending" });

    return res.status(200).json(entries);
  } catch (error) {
    await db.disconnectDatabase();
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { description = "" } = req.body;

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });

  try {
    await db.connectToDatabase();
    await newEntry.save();

    return res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnectDatabase();
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
