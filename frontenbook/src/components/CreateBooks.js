import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/books';

const CreateBooks = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [year, setYear] = useState(0);
    const navigate = useNavigate();

    const [numberError, setNumberError] = useState(0);
    const [descripcionError, setDescriptionError] = useState(0);
    const [yearError, setYearError] = useState(0);

    const titulo = (e) => {
        const value = e.target.value;
        const minValue = value.length>3;
        const maxValue = value.length<100;
        const onliLet = /^[a-zA-Z\s]*$/g.test(value);

        if (onliLet==false) {
            setNumberError(1);
        } else if (!minValue) {
            setNumberError(2);
        } else {
            setNumberError(3);
        }

        if(onliLet == true && minValue && maxValue) {
            setNumberError(0);
        }


        setTitle(value)
    }

    const descripcion = (e) => {
        const value = e.target.value;
        const minValue = value.length>15;
        const maxValue = value.length<300;
        const onliLet = /^[a-zA-Z\s]*$/g.test(value);

        if (onliLet==false) {
            setDescriptionError(1);
        } else if (!minValue) {
            setDescriptionError(2);
        } else {
            setDescriptionError(3);
        }

        if(onliLet == true && minValue && maxValue) {
            setDescriptionError(0);
        }


        setDescription(value)
    }

    const year1 = (e) => {
        const value = e.target.value;
        const ExpRegSoloNumeros="^[0-9]+$";
        

        if(value.match(ExpRegSoloNumeros)==null) {
            
            setYearError(1);
            console.log("Numero Invalido");
        }

        if(value.match(ExpRegSoloNumeros)!=null) {
            if (value.length > 5) {
                setYearError(2);
            }
            setYearError(0);
            console.log("Numero Invalidsdsdsdsdsdo");
        }

        setYear(value)
    }

    const store = async(e) => {
        e.preventDefault();
        await axios.post(endpoint, {title: title, description: description, url: url, year: year});
        navigate('/');
    }
  return (
    <div>
        <h3>Create Book</h3>
        <form onSubmit={store}>
            <div className='mb-3'>
                <label className='form-label'>Title</label>
                <input
                    value={title}
                    onChange={ titulo }
                    type='text'
                    className='form-control'    
                />
                {
                    (numberError == 1) && (
                        <label className='text-danger'>
                            Only letters
                        </label>
                    )
                }
                {
                    (numberError == 2) && (
                        <label className='text-danger'>
                            It's necesary a minimun of 4 characters
                        </label>
                    )
                }
                {
                    (numberError == 3) && (
                        <label className='text-danger'>
                            It's necesary a maximun of 100 characters
                        </label>
                    )
                }
            </div>
            <div className='mb-3'>
                <label className='form-label'>Description</label>
                <input
                    value={description}
                    onChange={ descripcion }
                    type='text'
                    className='form-control'    
                />
                {
                    (descripcionError == 1) && (
                        <label className='text-danger'>
                            Only letters
                        </label>
                    )
                }
                {
                    (descripcionError == 2) && (
                        <label className='text-danger'>
                            It's necesary a minimun of 15 characters
                        </label>
                    )
                }
                {
                    (descripcionError == 3) && (
                        <label className='text-danger'>
                            It's necesary a maximun of 300 characters
                        </label>
                    )
                }
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
                    onChange={ year1}
                    type='number'
                    className='form-control'    
                />
                {
                    (yearError == 1) && (
                        <label className='text-danger'>
                            Only numbers
                        </label>
                    )
                }
                {
                    (yearError == 2) && (
                        <label className='text-danger'>
                            you cannot add a year greater than this year's year
                        </label>
                    )
                }
            </div>

            <button disabled={numberError>0 || descripcionError>0} type='submit' className='btn btn-primary'>Store</button>
        </form>
    </div>
  )
}

export default CreateBooks