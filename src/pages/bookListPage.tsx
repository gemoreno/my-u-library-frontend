// BookListPage.tsx
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"

const Navbar = () => {
  // <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
  //   <h1 className="text-xl font-bold">FOCUS library</h1>
  //   <div className="flex gap-2">
  //     <Button variant="ghost" className="text-white">Search</Button>
  //     <Button variant="ghost" className="text-white">Checked Out</Button>
  //     <Button variant="ghost" className="text-white">Log Out</Button>
  //   </div>
  // </nav>
  return (
    <NavigationMenu className="bg-blue-600 px-6 py-4">
      <NavigationMenuList className="flex">
        <NavigationMenuItem>
          <NavigationMenuLink
            className="text-white hover:underline hover:text-blue-200 transition"
            href="#"
          >
            Search
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="text-white hover:underline hover:text-blue-200 transition"
            href="#"
          >
            Checked Out
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="text-white hover:underline hover:text-blue-200 transition"
            href="#"
          >
            Log Out
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

type Genre = string;

const GenreSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetch("/api/genres/")
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch((err) => console.error("Failed to load genres", err));
  }, []);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select genre" />
      </SelectTrigger>
      <SelectContent>
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const BookListPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleFilter = () => {
    console.log({ title, author, genre });
    // Fetch filtered books here
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="flex flex-col gap-4 max-w-md">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <GenreSelector value={genre} onChange={setGenre} />
          <Button onClick={handleFilter}>Search</Button>
        </div>
      </div>
    </div>
  );
};

export default BookListPage;
