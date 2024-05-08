import { toast } from "react-toastify";

export const notifyError = (error: string) => toast.error(error);
