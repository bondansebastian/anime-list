import React from 'react';

type MutedTextProps = {
    children?: any;
    style?: object;
}

export default function MutedText({ children, style = {} }: MutedTextProps)
{
    return (
        <span style={{ color: 'grey', ...style }}>{children}</span>
    )
}