import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const validateEmail = (email) => {
  const trimmedemail = email.trim();
  const re = /\S+@\S+\.\S+/;
  return re.test(trimmedemail);
};
