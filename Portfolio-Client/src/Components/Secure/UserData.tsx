import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useStoreSelector } from '../../Store';

export default function UserData() {
    var userToken = useStoreSelector((state) => state.auth.userToken);
    var userBearerToken = useStoreSelector((state) => state.auth.bearerToken);
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [favoriteVideogame, setFavoriteVideogame] = useState('');
    const [favoriteMovie, setFavoriteMovie] = useState('');
    const [favoriteBook, setFavoriteBook] = useState('');
    const [favoriteAlbum, setFavoriteAlbum] = useState('');

    useEffect(() => {
        axios.get(`/api/UserData/GetOrAddUserDataByJwt?jwt=${userToken}`, { headers: { "Authorization": `Bearer ${userBearerToken}` } })
        .then(res => {
            setUsername(res.data.username);
            setEmail(res.data.email);
            setFavoriteVideogame(res.data.favorite_videogame);
            setFavoriteMovie(res.data.favorite_movie);
            setFavoriteBook(res.data.favorite_book);
            setFavoriteAlbum(res.data.favorite_album);
        })
    }, [])

    return (
        <div>
            <h5>Username: {Username}</h5>
            <h5>Email: {Email}</h5>
            <h5>Favorite Videogame: {favoriteVideogame}</h5>
            <h5>Favorite Movie: {favoriteMovie}</h5>
            <h5>Favorite Book: {favoriteBook}</h5>
            <h5>Favorite Album: {favoriteAlbum}</h5>
        </div>
    )
}
