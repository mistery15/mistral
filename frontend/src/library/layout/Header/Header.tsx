import React, { FunctionComponent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../../resources/images/logo.jpg';
import { routes } from '../../../router';
import { isMobile } from 'react-device-detect';
import { Hamburger } from '../Hamburger';

const Header: FunctionComponent = () => {
  const history = useHistory();

  return (
    <header className="Header">
      <div className="left">
        <Link to="/">
          <img className="Header_logo" src={logo} alt="logo" />
        </Link>
      </div>
      <nav className="right">
        {isMobile ? <Hamburger /> : <>
          {routes.map(route => {
            return <Link className={history.location.pathname === route.link ? 'active' : ''} to={route.link} key={route.link}>{route.name}</Link>;
          })}
        </>}
      </nav>
    </header>
  );
};

export { Header };