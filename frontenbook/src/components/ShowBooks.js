import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api';
const ShowBooks = () => {

    const [books, setBooks] = useState([]);
    useEffect(() => {
        getAllBooks();
    }, []);


    const getAllBooks = async () => {
        const response = await axios.get(`${endpoint}/books`);
        setBooks(response.data);
    }

    const deleteBook = async(id) => {
        await axios.delete(`${endpoint}/books/${id}`);
        getAllBooks();
    }

    return (
        <div>
            <div className='d-grid gap-2'>
                <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create</Link>
            </div>

            <table className='table table-striped'>
                <thead className='bg-primary text-white'>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>URL</th>
                        <th>Year</th>
                        <th>Available</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { books.map( (book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.description}</td>
                            <td>{book.url}</td>
                            <td>{book.year}</td>
                            <td>{book.available}</td>
                            <td>
                                <Link to={`/edit/${book.id}`} className='btn btn-warning'>Edit</Link>
                                <button onClick={ ()=>deleteBook(book.id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default ShowBooks