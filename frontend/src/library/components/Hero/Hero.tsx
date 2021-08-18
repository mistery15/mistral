import React, { ChangeEvent, FunctionComponent, useRef, useState } from 'react';
import heroImage from '../../../resources/images/pl-hero.png';
import search from '../../../resources/icons/search.svg';
import { useAppDispatch } from '../../../app/hooks';
import { setSearch } from '../../../features/home/movieSlice';
const debounce = require('lodash.debounce');

const Hero: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState('');

    const dispatchSearch = (q: string) => {
        dispatch(setSearch(q));
    }

    const searchRef = useRef(debounce((q: string) => dispatchSearch(q), 500)).current;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        if(e.target.value.length >= 2 ||e.target.value.length === 0)
        searchRef(e.target.value);
    }
    return (
        <div className="Hero">
            <img src={heroImage} alt="hero flowers" className="image" />
            <div className="container">
                <h1 className="main-title">
                    Discover movies!
                </h1>
                <h3 className="sub-title">
                    Explore our movie database
                </h3>
                <div className="input-container">
                    <input value={searchValue} onChange={handleChange} placeholder="Looking for something specific?" className="input" />
                    <img src={search} alt="input search" className="search" />
                </div>
            </div>
        </div>
    );
}

export { Hero };