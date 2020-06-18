import Project, { ProjectModel } from "./../models/project";
import { Request, Response } from "express";
import { differenceInMilliseconds } from "date-fns";

export const getProjectById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project = await Project.findById(req.params.id);
  return res.status(200).json(project);
};

export const getProjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projects = await Project.find().populate('assignedTo')
  return res.status(200).json(projects);
};

export const getProjectsAssignedTo = async (req: Request, res: Response) => {
  const projects = await Project.find({ assignedToRef: req.params.id });
  return res.status(200).json(projects);
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log(req.body);
  
  const newUser = new Project(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

export const updateProject = async (req: Request, res: Response) => {
  const { updatedAt } = await Project.findById(req.body.id) as ProjectModel;
  const projectUpdated = await Project.updateOne(
    { _id: req.body.id },
    { $set: req.body },
    { new: true }
  );
  return res.status(201).json(projectUpdated);
};

export const deleteProject = async (req: Request, res: Response) => {
  const user = await Project.deleteOne({ _id: req.params.id });
  return res.status(200).json(user);
};
