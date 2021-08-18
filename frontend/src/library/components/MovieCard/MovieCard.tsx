import React, { FunctionComponent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createReview, Movie } from '../../../features/home/movieSlice';
import { Button } from '../Button';
import { Input } from '../Input';
import { Modal } from '../Modal';

interface MovieCardProps {
    movie: Movie,
    hideFavorite?: boolean
}

const MovieCard: FunctionComponent<MovieCardProps> = ({ movie, hideFavorite }) => {
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(1);
    const dispatch = useAppDispatch();
    const sessionId = useAppSelector(state => state.movies.sessionId);
    const type = useAppSelector(state => state.movies.type);

    const createImageUrl = (url: string) => {
        return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${url}`
    }
    const leftReview = movie.reviews?.find(review => review.sessionId === sessionId);
    const handleSubmit = () => {
        dispatch(createReview({ id: movie._id, rating, sessionId, type }));
    }
    return (
        <div className="MovieCard">
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
                <div>
                    <h1 className="MovieCard__title">
                        Reviews
                    </h1>
                    <hr />
                    {movie.reviews.map(review => {
                        return (
                            <h2 className="MovieCard__subtitle">{review.rating}/10 </h2>
                        );
                    })}
                    {movie.reviews.length ? <hr /> : null}
                    {leftReview ?
                        <h1 className="MovieCard__title">
                            You left a review already
                        </h1> :
                        <div>
                            
                            <h4 className="MovieCard__title">
                                Leave a review
                            </h4>
                            <Input min="1" max="10" step="1" onBlur={(e) => setRating(parseInt(e.target.value))} onChange={(e) => setRating(parseInt(e.target.value))} name="rating" label={`Rating (${rating}/10)`} value={rating} type="range" />
                            <Button className="MoviewCard submit-review-button" color="orange" onClick={handleSubmit}>
                                Submit review
                            </Button>
                        </div>}
                </div>
            </Modal>
            <img className="image" src={createImageUrl(movie.backdrop_path)} alt="movie" />
           
            <div className="overlay"></div>
            <h1 className="name">
                {movie?.title}
            </h1>
            <h2 className="family">
                {movie?.description}
            </h2>

            <Button className="button" onClick={() => setShowModal(true)} color="transparent">
                {movie?.rating} rating
            </Button>
        </div>
    );
}

export { MovieCard };