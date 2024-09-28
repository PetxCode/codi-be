import { Request, Response } from "express";
// import userMOdel from "../model/userMOdel";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/email";
import crypto from "crypto";
// import blogdata from "../model/blogmodel";
import myBlogModel from "../model/blogmodel";

export const createblog = async (req: Request, res: Response) => {
  try {
    const { title, video, content, desc, image } = req.body;

    const blog = await myBlogModel.create({
      title,
      video,
      content,
      desc,
      image,
    });
    return res
      .status(201)
      .json({ message: "created successfully", data: blog });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const readAllblog = async (req: Request, res: Response) => {
  try {
    const blog = await myBlogModel.find();
    return res.status(201).json({ message: "all blog gotten", data: blog });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const readOneBlog = async (req: Request, res: Response) => {
  try {
    const { blogID } = req.params;
    const blog = await myBlogModel.findById(blogID);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog retrieved", data: blog });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
