import React, { FunctionComponent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { routes } from '../../../router';

const Hamburger: FunctionComponent = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const history = useHistory();
    
    return (
        <div className={`Hamburger`}>
            <span onClick={() => setIsOpen(!isOpen)} className={`icon ${isOpen ? 'open' : ''}`} />
            <div onClick={() => setIsOpen(!isOpen)} className={`hamburger-overlay ${isOpen ? '' : 'hidden'}`} />
            <div className={`hamburger-menu ${isOpen ? '' : 'hidden'}`}>
                {routes.map(route => {
                    return <Link className={history.location.pathname === route.link ? 'active' : ''} onClick={() => setIsOpen(false)} to={route.link} key={route.link}>{route.name}</Link>
                })}
            </div>
        </div>
    );
};

export { Hamburger };