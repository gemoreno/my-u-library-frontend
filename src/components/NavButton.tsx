import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import type { ComponentProps } from 'react'


type ButtonProps = ComponentProps<typeof Button>

interface NavButtonProps extends ButtonProps {
  to: string
  label: string
}

export function NavButton({ to, label, ...buttonProps }: NavButtonProps) {
  return (
    <Button variant="ghost" asChild {...buttonProps}>
      <Link to={to} className="text-blue-700 hover:underline">
        {label}
      </Link>
    </Button>
  )
}

export default NavButton
