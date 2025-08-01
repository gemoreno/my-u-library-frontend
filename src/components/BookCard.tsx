import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { USER_ROLES } from "@/constants";
import { selectCurrentUser, selectIsLoggedIn } from "@/features/auth/authSlice";
import { checkoutBook } from "@/features/checkoutManagement/checkoutApi";
import { useState } from "react"
import { useSelector } from "react-redux";

interface BookCardProps {
  book: {
    id: number,
    title: string
    author: string
    genre: string
    year_published?: string
    stock: number
    available: number
    checkout_date?: string
  };
  isCheckedOut?: Boolean;
  updateBookAvailability?: (BookId: number) => void;
}

export default function BookCard({ book, isCheckedOut, updateBookAvailability }: BookCardProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const userRole = useSelector(selectCurrentUser)?.role

  const formattedCheckoutDate = book.checkout_date
  ? new Date(book.checkout_date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  : "N/A";

  const handleCheckout = async () => {
    try {
      setLoading(true)
      await checkoutBook(book.id)
      updateBookAvailability ? updateBookAvailability(book.id) : {}
      setMessage("Checked out!")
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="py-3 pr-6">
      <div className="flex items-center justify-between ">
        <div>
          <CardHeader className="pb-2">
            <CardTitle>{book.title}</CardTitle>
            <CardDescription>
              by {book.author} &middot; {book.genre}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm">
              <span>
                Published: {book.year_published ? book.year_published : "????"}
              </span>
              {!isCheckedOut
                ? <span className="ml-6">
                    ({book.stock} {book.stock === 1 ? "copy" : "copies"},{" "}
                    {book.available} available)
                  </span>
                : <span className="ml-6">
                    Checkout date: {formattedCheckoutDate}
                  </span>
              }
            </p>
          </CardContent>
        </div>
        { userRole===USER_ROLES.STUDENT
        ? <Button
          variant="outline"
          onClick={handleCheckout}
          disabled={loading || book.available === 0}
          hidden={!!isCheckedOut}
          >
            {loading ? "Processing" : "Checkout"}
          </Button>
        : <></>}
      </div>
    </Card>
  )
}
