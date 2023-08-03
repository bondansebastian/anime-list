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
            border-radius: 8px;
            bottom: 15px;
            box-shadow: 0 0 29px rgba(49,54,68,.25);
            color: white !important;
            cursor: pointer;
            display: inline-block;
            padding: 12px 25px;
            position: fixed;
            right: 15px;
            transition: all .2s ease;
            ${style}
            &:hover {
                background-color: hsl(14,80%,30%);
            }
        `}>
            {children}
        </NavLink>
    )
}