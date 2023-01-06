import { toast } from "react-toastify";

const SUCCESS = (message) => toast.success(message);
const ERROR = (message) => toast.error(message);

export const NOTIFY = { SUCCESS, ERROR };
