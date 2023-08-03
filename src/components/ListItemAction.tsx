import React from 'react';

type ListItemActionProps = {
    children?: any;
    style?: object;
}

export default function ListItemAction({ children, style = {} }: ListItemActionProps)
{
    return (
        <div style={{ textAlign: 'right', ...style }}>{children}</div>
    )
}