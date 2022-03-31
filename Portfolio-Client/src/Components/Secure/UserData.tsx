import axios from 'axios';
import React, { useEffect, useState } from 'react'
import User from '../../Models/user';
import { useStoreSelector } from '../../Store';

export default function UserData() {
    var userToken = useStoreSelector((state) => state.auth.userToken);
    var userBearerToken = useStoreSelector((state) => state.auth.bearerToken);

    //display state
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [favoriteVideogame, setFavoriteVideogame] = useState('');
    const [favoriteMovie, setFavoriteMovie] = useState('');
    const [favoriteBook, setFavoriteBook] = useState('');
    const [favoriteAlbum, setFavoriteAlbum] = useState('');
    //edit form state
    const [editUsername, setEditUserName] = useState('');
    const [editVideogame, setEditVideogame] = useState('');
    const [editMovie, setEditMovie] = useState('');
    const [editBook, setEditBook] = useState('');
    const [editAlbum, setEditAlbum] = useState('');

    var id = 0;

    useEffect(() => {
        axios.get(`/api/UserData/GetOrAddUserDataByJwt?jwt=${userToken}`, { headers: { "Authorization": `Bearer ${userBearerToken}` } })
            .then(res => {
                id = res.data.id;
                //display
                setUsername(res.data.username);
                setEmail(res.data.email);
                setFavoriteVideogame(res.data.favorite_videogame);
                setFavoriteMovie(res.data.favorite_movie);
                setFavoriteBook(res.data.favorite_book);
                setFavoriteAlbum(res.data.favorite_album);
                //edit form
                setEditUserName(res.data.username);
                setEditVideogame(res.data.favorite_videogame);
                setEditMovie(res.data.favorite_movie);
                setEditBook(res.data.favorite_book);
                setEditAlbum(res.data.favorite_album);
            })
    }, [])

    function onUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEditUserName(event.target.value);
    }
    function onVideogameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEditVideogame(event.target.value);
    }
    function onMovieChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEditMovie(event.target.value);
    }
    function onBookChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEditBook(event.target.value);
    }
    function onAlbumChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEditAlbum(event.target.value);
    }

    function onSubmitForm() {
        if (editVideogame && editMovie && editBook && editAlbum && editUsername) {
            let userData: User = { id: id, username: editUsername, email: Email, favorite_videogame: editVideogame, favorite_movie: editMovie, favorite_book: editBook, favorite_album: editAlbum };
            axios.post('/api//UserData/EditUserData', userData, { headers: { "Authorization": `Bearer ${userBearerToken}` } })
                .then(function () {
                    axios.get(`/api/UserData/GetOrAddUserDataByJwt?jwt=${userToken}`, { headers: { "Authorization": `Bearer ${userBearerToken}` } })
                        .then(res => {
                            id = res.data.id;
                            //display
                            setUsername(res.data.username);
                            setEmail(res.data.email);
                            setFavoriteVideogame(res.data.favorite_videogame);
                            setFavoriteMovie(res.data.favorite_movie);
                            setFavoriteBook(res.data.favorite_book);
                            setFavoriteAlbum(res.data.favorite_album);
                            //edit form
                            setEditUserName(res.data.username);
                            setEditVideogame(res.data.favorite_videogame);
                            setEditMovie(res.data.favorite_movie);
                            setEditBook(res.data.favorite_book);
                            setEditAlbum(res.data.favorite_album);
                        })
                })
                .catch(function (error) {
                    alert(error)
                });
        }
        else {
            alert('Please fill all fields.');
        }
    }

    return (
        <>
            <div className='container border border-dark border-5 rounded p-2 my-2 shadow text-center'>
                <h1>Current Data</h1>
                <h5>Username: {Username}</h5>
                <h5>Email: {Email}</h5>
                <h5>Favorite Videogame: {favoriteVideogame}</h5>
                <h5>Favorite Movie: {favoriteMovie}</h5>
                <h5>Favorite Book: {favoriteBook}</h5>
                <h5>Favorite Album: {favoriteAlbum}</h5>
            </div>
            <div className='container border border-dark border-5 rounded p-2 my-2 shadow text-center'>
                <h1>Edit Data</h1>
                <br></br>
                <div className='my-2'>
                    <label className='m-1'>Username:</label>
                    <input type="text" name="username" value={editUsername} onChange={onUsernameChange} />
                </div>
                <div className='my-2'>
                    <label className='m-1'>Favorite Videogame:</label>
                    <input type="text" name="videogame" value={editVideogame} onChange={onVideogameChange} />
                </div>
                <div className='my-2'>
                    <label className='m-1'>Favorite Movie:</label>
                    <input type="text" name="movie" value={editMovie} onChange={onMovieChange} />
                </div>
                <div className='my-2'>
                    <label className='m-1'>Favorite Book:</label>
                    <input type="text" name="book" value={editBook} onChange={onBookChange} />
                </div>
                <div className='my-2'>
                    <label className='m-1'>Favorite Album:</label>
                    <input type="text" name="album" value={editAlbum} onChange={onAlbumChange} />
                </div>
                <div className='my-2'>
                    <button className="btn btn-dark" type="submit" value="Submit" onClick={onSubmitForm}>Submit</button>
                </div>
            </div>
        </>
    )
}
