import { Request } from "express";

export interface UserRequest extends Request {
  user_id: string;
  user_office: number;
  user_role: number;
}