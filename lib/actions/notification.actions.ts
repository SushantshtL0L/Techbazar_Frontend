"use server";

import { getNotifications, createNotification, deleteNotification } from "../api/notification";

export async function handleGetNotifications() {
  try {
    const result = await getNotifications();
    return { success: true, data: result.data };
  } catch (err: any) {
    return { success: false, message: err.message, data: [] };
  }
}

export async function handleCreateNotification(data: { title: string; message: string; type: string }) {
  try {
    const result = await createNotification(data);
    return { success: true, data: result.data };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleDeleteNotification(id: string) {
  try {
    await deleteNotification(id);
    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
