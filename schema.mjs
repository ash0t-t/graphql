import { buildSchema } from 'graphql';

const authors = [
  { id: 101, name: 'Shakespeare' },
  { id: 102, name: 'Daniel Defoe' },
  { id: 103, name: 'Jean Paul Sartre' },
];

const books = [
  { id: 1, title: 'Hamlet', price: 22.5, author: authors[0] },
  { id: 2, title: 'Romeo and Juliet', price: 12.5, author: authors[0] },
  { id: 3, title: 'Robinson Crusoe', price: 13.5, author: authors[1] },
  { id: 4, title: 'The Wall', price: 22.5, author: authors[2] },
  { id: 5, title: 'Being and Nothingness', price: 42.5, author: authors[2] },
  { id: 6, title: 'No Exit', price: 12.5, author: authors[2] },
];

export const schema = buildSchema(`
  type Mutation {
    addBook(title: String!, price: Float!, authorId: Int!): Book
  }

  type Query {
    books: [Book]
    authors: [Author]
    book(id: Int): Book
  }

  type Author {
    id: Int
    name: String
    books: [Book]
  }

  type Book {
    id: Int
    title: String
    price: Float
    author: Author
  }
`);

export const resolvers = {
  books: () => books,
  authors: () => authors,
  book: ({ id }) => books.find((book) => book.id == id),
  addBook: ({ title, price, authorId }) => {
    const author = authors.find(a => a.id == authorId);
    const newBook = { id: books.length + 1, title, price, author };
    books.push(newBook);
    return newBook;
  }
};