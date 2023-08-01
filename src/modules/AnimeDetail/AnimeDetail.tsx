import React from 'react';
import logo from '../../logo.svg';
import './AnimeDetail.css';
import { NavLink } from 'react-router-dom';

function AnimeDetail() {
    return (
        <div className="AnimeDetail">
            <header className="AnimeDetail-header">
                <img src={logo} className="AnimeDetail-logo" alt="logo" />
                <p>
                    Edit <code>src/AnimeDetail.tsx</code> and save to reload.
                </p>
                <NavLink to="/">
                    Goto Home
                </NavLink>
            </header>
        </div>
    );
}

export default AnimeDetail;
