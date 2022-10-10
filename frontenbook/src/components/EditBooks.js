import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/books/';

const EditBooks = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [year, setYear] = useState(0);
    const navigate = useNavigate();
    const {id} = useParams();

    const update = async(e) => {
        e.preventDefault();
        await axios.put(`${endpoint}${id}`, {
            title: title,
            description: description,
            url: url,
            year: year
        });
        navigate('/');
    }

    useEffect(() => {
        const getBookById = async () => {
            const response = await axios.get(`${endpoint}${id}`);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setUrl(response.data.url);
            setYear(response.data.year);
        }
        getBookById();
    }, [])

  return (
    <div>
        <h3>Edit Book</h3>
        <form onSubmit={update}>
            <div className='mb-3'>
                <label className='form-label'>Title</label>
                <input
                    value={title}
                    onChange={ (e) => setTitle(e.target.value)}
                    type='text'
                    className='form-control'    
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Description</label>
                <input
                    value={description}
                    onChange={ (e) => setDescription(e.target.value)}
                    type='text'
                    className='form-control'    
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Url</label>
                <input
                    value={url}
                    onChange={ (e) => setUrl(e.target.value)}
                    type='text'
                    className='form-control'    
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Year</label>
                <input
                    value={year}
                    onChange={ (e) => setYear(e.target.value)}
                    type='number'
                    className='form-control'    
                />
            </div>

            <button type='submit' className='btn btn-primary'>Update</button>
        </form>
    </div>
  )
}

export default EditBooks