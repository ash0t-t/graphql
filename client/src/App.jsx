import { gql, useQuery } from '@apollo/client';
import './App.css';
import AddBook from './AddBook';

export const GET_BOOKS = gql`
  {
    books {
      id
      title
      price
      author {
        name
      }
    }
  }
`;

function App() {
  const { loading, data, refetch } = useQuery(GET_BOOKS);

  return (
    <>
      <h1>Hello!!</h1>
      <AddBook refetch={refetch} />
      {loading && <p>Loading...</p>}
      {
        data && data.books.map(book => 
          <div key={book.id}>
            <p>{book.title} <strong>{book.price} USD</strong></p>
            <small>By {book.author.name}</small>
          </div>
        )
      }
    </>
  );
}

export default App;