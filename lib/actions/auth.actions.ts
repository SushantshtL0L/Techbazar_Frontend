"use server";

import { register, login, whoami, updateProfile, adminCreateUser, adminGetAllUsers, adminGetUserById, adminUpdateUser, adminDeleteUser, forgotPassword, resetPassword, changePassword } from "../api/auth";
import { setAuthToken, setUserData } from "../cookie";
import { revalidatePath } from "next/cache";

function normalizeUserPayload(userData: any) {
  if (!userData) return null;

  if (userData.user && typeof userData.user === "object") {
    return userData.user;
  }

  if (userData.data && typeof userData.data === "object") {
    if (userData.data.user && typeof userData.data.user === "object") {
      return userData.data.user;
    }
    return userData.data;
  }

  return userData;
}

export async function handleRegister(formData: any) {
  try {
    const result = await register(formData);
    return {
      success: true,
      message: result.message || "Registration successful",
      data: result.user,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleLogin(formData: any) {
  try {
    const result = await login(formData);
    if (result.token) {
      await setAuthToken(result.token);
      let userResult: any = null;
      try {
        userResult = await whoami();
        const normalizedUser = normalizeUserPayload(userResult);
        if (normalizedUser) {
          await setUserData(normalizedUser);
          userResult = normalizedUser;
        }
      } catch (err) {
        console.error("Failed to fetch user data after login:", err);
      }
      return {
        success: true,
        message: result.message || "Login successful",
        data: {
          token: result.token,
          user: userResult,
        },
      };
    }
    return { success: false, message: "Login failed" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleWhoami() {
  try {
    const result = await whoami();
    if (result) {
      return {
        success: true,
        message: "Fetched user data",
        data: result,
      };
    }
    return { success: false, message: "Failed to fetch user data" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleUpdateProfile(formData: any) {
  try {
    const result = await updateProfile(formData);
    if (result.user) {
      await setUserData(result.user);
      revalidatePath("/profile");
      return {
        success: true,
        message: result.message || "Profile updated successfully",
        data: result.user,
      };
    }
    return {
      success: false,
      message: result.message || "Profile update failed",
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleAdminCreateUser(formData: FormData) {
  try {
    const result = await adminCreateUser(formData);
    revalidatePath("/admin/users");
    return {
      success: true,
      message: result.message || "User created successfully",
      data: result.user,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleAdminGetAllUsers(role?: string, page?: number, limit?: number) {
  try {
    const result = await adminGetAllUsers(role, page, limit);
    return {
      success: true,
      data: result,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleAdminGetUserById(id: string) {
  try {
    const result = await adminGetUserById(id);
    return {
      success: true,
      data: result,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleAdminUpdateUser(id: string, formData: FormData) {
  try {
    const result = await adminUpdateUser(id, formData);
    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${id}`);
    return {
      success: true,
      message: result.message || "User updated successfully",
      data: result.user,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleAdminDeleteUser(id: string) {
  try {
    const result = await adminDeleteUser(id);
    revalidatePath("/admin/users");
    return {
      success: true,
      message: result.message || "User deleted successfully",
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleForgotPassword(email: string) {
  try {
    const result = await forgotPassword(email);
    return {
      success: true,
      message: result.message || "Reset link sent successfully",
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleResetPassword(token: string, newPassword: string) {
  try {
    const result = await resetPassword(token, newPassword);
    return {
      success: true,
      message: result.message || "Password reset successful",
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleChangePassword(data: { currentPassword: string; newPassword: string }) {
  try {
    const result = await changePassword(data);
    return {
      success: true,
      message: result.message || "Password changed successfully",
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}