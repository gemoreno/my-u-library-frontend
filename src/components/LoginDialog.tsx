import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser } from "@/features/auth/authApi"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "@/store"
import { logout, selectIsLoggedIn } from "@/features/auth/authSlice"
import { useNavigate } from "react-router-dom"

export default function LoginDialog() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await dispatch(loginUser(email, password))

      setIsOpen(false)
    } catch (err: any) {
      setError("Login failed. Please check your credentials.")
    }
  }

  const  handleLogout = () => {
    dispatch(logout())
    navigate('/')
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
              <Label htmlFor="email" className="mb-2">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
