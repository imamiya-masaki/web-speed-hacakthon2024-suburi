import { useBook } from "../features/book/hooks/useBook";

export type Book = ReturnType<typeof useBook>["data"];