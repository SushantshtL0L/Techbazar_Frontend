import axios from "./axios";
import { API } from "./endpoints";

export const getNotifications = async () => {
  try {
    const response = await axios.get(API.NOTIFICATION.LIST);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "Failed to fetch notifications");
  }
};

export const createNotification = async (data: { title: string; message: string; type: string }) => {
  try {
    const response = await axios.post(API.NOTIFICATION.CREATE, data);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "Failed to create notification");
  }
};

export const deleteNotification = async (id: string) => {
  try {
    const response = await axios.delete(API.NOTIFICATION.DELETE(id));
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "Failed to delete notification");
  }
};

export const markAllNotificationsRead = async () => {
  try {
    const response = await axios.patch("/api/notifications/mark-read");
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "Failed to mark notifications as read");
  }
};
