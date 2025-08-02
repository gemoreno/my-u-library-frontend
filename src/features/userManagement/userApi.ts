import type { NewUserData } from "./useUser";
import api from "@/lib/axios";

export async function addUser(newUser: NewUserData): Promise<void> {
  try {
    const response = await api.post("/auth/register/", newUser);
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.detail || error.message || "Failed to create user";
    throw new Error(message);
  }
}
