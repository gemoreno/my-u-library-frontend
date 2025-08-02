import { useState } from "react";
import { addUser } from "./userApi";

export interface NewUserData {
  email: string;
  first_name: string;
  last_name: string;
  role: "librarian" | "student";
  password: string;
}

export function useUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddUser = async (newUser: NewUserData) => {
    setLoading(true);
    setError(null);
    try {
      await addUser(newUser);
      alert("User created successfully.");
    } catch (err: any) {
      alert(`Error creating user. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { handleAddUser, loading, error };
}
