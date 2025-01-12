import type { useBook } from "../features/book/hooks/useBook";

export type BookType = ReturnType<typeof useBook>["data"];