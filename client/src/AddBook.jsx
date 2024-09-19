import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $price: Float!, $authorId: Int!) {
    addBook(title: $title, price: $price, authorId: $authorId) {
      id
      title
      price
      author {
        name
      }
    }
  }
`;

function AddBook({ refetch }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [authorId, setAuthorId] = useState('');

  const [addBook] = useMutation(ADD_BOOK, {
    onCompleted: () => {
      refetch();
      setTitle('');
      setPrice('');
      setAuthorId('');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: { title, price: parseFloat(price), authorId: parseInt(authorId) }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required
      />
      <input 
        type="number" 
        placeholder="Price" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        required
      />
      <input 
        type="number" 
        placeholder="Author ID" 
        value={authorId} 
        onChange={(e) => setAuthorId(e.target.value)} 
        required
      />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;