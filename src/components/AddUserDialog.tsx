import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface NewUserData {
  email: string;
  first_name: string;
  last_name: string;
  role: "librarian" | "student";
  password: string;
}

interface AddUserDialogProps {
  onAddUser: (newUser: NewUserData) => void;
  loading: boolean;
}

export default function AddUserDialog({ onAddUser, loading }: AddUserDialogProps) {
  const initUser: NewUserData = {
    email: "",
    first_name: "",
    last_name: "",
    role: "student",
    password: "",
  };

  const [newUser, setNewUser] = useState<NewUserData>(initUser);

  const handleChange = (value: string, label: keyof NewUserData) => {
    setNewUser((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600">Add User</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New User</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => handleChange(e.target.value, "email")}
          />
          <Input
            placeholder="First Name"
            value={newUser.first_name}
            onChange={(e) => handleChange(e.target.value, "first_name")}
          />
          <Input
            placeholder="Last Name"
            value={newUser.last_name}
            onChange={(e) => handleChange(e.target.value, "last_name")}
          />
          <select
            className="w-full border rounded px-3 py-2"
            value={newUser.role}
            onChange={(e) => handleChange(e.target.value as NewUserData["role"], "role")}
          >
            <option value="student">Student</option>
            <option value="librarian">Librarian</option>
          </select>
          <Input
            placeholder="Password"
            type="password"
            value={newUser.password}
            onChange={(e) => handleChange(e.target.value, "password")}
          />

          <Button 
            onClick={async () => {
              await onAddUser(newUser)
              setNewUser(initUser)}} 
            disabled={loading}>
            {loading ? "Creating..." : "Create User"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
