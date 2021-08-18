import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { MovieCard, Hero, ShowCard, Button } from '../../library/components';
import { changeType, fetchMoreMovies, fetchMovies, increasePage, Movie, setSessionid, Show, Type } from './movieSlice';

const Home: FunctionComponent = () => {
    const dispatch = useDispatch();
    const movies = useAppSelector(state => state.movies.results);
    const type = useAppSelector(state => state.movies.type);
    const search = useAppSelector(state => state.movies.search);
    const page = useAppSelector(state => state.movies.page);
    const totalItems = useAppSelector(state => state.movies.totalItems);

    useEffect(() => {
        let sessionId = localStorage.getItem('sessionId');
        if(!sessionId){
            sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
            localStorage.setItem('sessionId', sessionId);
        }
        dispatch(setSessionid(sessionId));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchMovies({type, search}));
    }, [dispatch, search, type]);

    const handleClick = () => {
        dispatch(increasePage());
        dispatch(fetchMoreMovies({type, search, page: page + 1}));
    }
    const handleTypeChange = (type: Type) => {
        dispatch(changeType(type));
    }
    return (
        <main>
            <Hero />
            <div className="TypeSwitch">
                <div onClick={() => handleTypeChange('movies')} className={`movie ${type === 'movies' ? 'active' : ''}`}>
                    Movies
                </div>
                <div onClick={() => handleTypeChange('shows')} className={`show ${type === 'shows' ? 'active' : ''}`}>
                    Shows
                </div>
            </div>
            <div className="MovieGrid">
                {(movies as Array<Movie | Show>)?.map(movie => type === 'movies' ? <MovieCard key={movie._id} movie={movie as Movie} /> : <ShowCard key={movie._id} show={movie as Show} />)}
            </div>
            <div className="LoadButton">
                {movies.length < totalItems ? <Button  type="button" color="orange" onClick={handleClick} >Fetch more movies</Button> : null}
            </div>
        </main>
    );
}

export default Home;