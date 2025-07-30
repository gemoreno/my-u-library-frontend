import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import type { Book } from "@/features/bookSearch/types"

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card className="gap-2 py-3">
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>
          by {book.author} &middot; {book.genre}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
            <span>
                Published: {book.year_published ? book.year_published : "????"}
            </span>
            <span className="ml-6">
                ({book.stock} {book.stock == '1' ? 'copy' : 'copies'}, {book.available} available)
            </span>
        </p>
      </CardContent>
    </Card>
  )
}
