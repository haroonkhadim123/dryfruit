import { v4 as uuidv4 } from "uuid";

export const getDeviceId = () => {
  if (typeof window === "undefined") return null;

  let deviceId = localStorage.getItem("deviceId");

  if (!deviceId) {
    deviceId = uuidv4(); // ✅ works everywhere
    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
};
