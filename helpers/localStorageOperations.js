import toast from "react-hot-toast";

/* eslint-disable no-unused-vars */
const sessionTime = import.meta.env.VITE_SESSION_TIME;

export function setWithExpiry(key, value) {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + sessionTime,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    toast.error(`Session expired, please login again.`);
    return null;
  }
  return item.value;
}
