import { IError } from "@/interface/IError";

export default function defineError(name: string, message: string): IError {
  return {
    id: name + message + Math.random(),
    name,
    message,
  };
}
