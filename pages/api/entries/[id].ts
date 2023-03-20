import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
  | IEntry
  | {
      message: string;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Always is a string
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID:" + id });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connectToDatabase();
  const entry = await Entry.findById(id);

  if (!entry) {
    await db.disconnectDatabase();
    return res.status(404).json({ message: "Entry not found" });
  }

  try {
    const getEntry = await Entry.findById(id);
    res.status(200).json(getEntry!);
  } catch (error: any) {
    await db.disconnectDatabase();
    return res
      .status(400)
      .json({ message: error.errors.status.message.toString() });
  }
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connectToDatabase();
  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnectDatabase();
    return res.status(404).json({ message: "Entry not found" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnectDatabase();
    return res
      .status(400)
      .json({ message: error.errors.status.message.toString() });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connectToDatabase();
  const entryToDelete = await Entry.findById(id);

  if (!entryToDelete) {
    await db.disconnectDatabase();
    return res.status(404).json({ message: "Entry not found" });
  }

  try {
    await Entry.findByIdAndDelete(id);
    res.status(200).json({ message: "Entry deleted" });
  } catch (error: any) {
    await db.disconnectDatabase();
    return res.status(400).json({ message: error.message });
  }
};
