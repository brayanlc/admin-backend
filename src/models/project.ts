import { model, Schema, Document } from "mongoose";

export interface ProjectModel extends Document {
  name: string;
  description: string;
  duration: number;
  type: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    duration: Number,
    type: { type: String, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model<ProjectModel>("Project", projectSchema);
