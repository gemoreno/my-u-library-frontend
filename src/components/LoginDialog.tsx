import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser } from "@/features/auth/authApi"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "@/store"
import type { RootState } from "@/store"
import { logout } from "@/features/auth/authSlice"

export default function LoginDialog() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await dispatch(loginUser(username, password))

      setIsOpen(false)
    } catch (err: any) {
      setError("Login failed. Please check your credentials.")
    }
  }

  const  handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      {isLoggedIn ? 
      <Button onClick={handleLogout}>
        Logout
      </Button> :
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Login</Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">Login to Your Account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username" className="mb-2">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </DialogContent>
      </Dialog>}
    </>
  )
}
