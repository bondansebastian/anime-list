import { css } from '@emotion/css';
import React from 'react';
import { NavLink } from 'react-router-dom';

type FloatingNavLinkProps = {
    children?: any;
    to: string;
    style?: string;
}

export default function FloatingNavLink({ children, to, style }: FloatingNavLinkProps)
{
    return (
        <NavLink to={to} className={css`
            background-color: black;
            border-radius: 4px;
            color: white !important;
            cursor: pointer;
            display: inline-block;
            padding: 5px 10px;
            transition: all .2s ease;
            position: fixed;
            right: 15px;
            bottom: 15px;
            ${style}
            &:hover {
                background-color: hsl(14,80%,30%);
            }
        `}>
            {children}
        </NavLink>
    )
}