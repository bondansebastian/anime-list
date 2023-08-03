import { css } from '@emotion/css';
import React, { useState } from 'react';

type TextboxProps = {
    fullwidth?: boolean;
    error?: string;
    placeholder?: string;
    onKeyUp?: Function|null;
    style?: string;
}

export default function Textbox({ 
    fullwidth = true, 
    error, 
    placeholder, 
    onKeyUp = null, 
    style }: TextboxProps
) {
    const [ value, setValue ] = useState<string|undefined>(undefined);

    const handleKeyUp = (event: any) => {
        if (event.key !== 'Enter' || onKeyUp === null) return;
        onKeyUp(value, setValue);
    }

    return (
        <div className={css`
            position: relative;
            display: ${fullwidth ? 'block' : 'inline-block'};
            width: ${fullwidth ? '100%' : 'auto'};
            ${style}
        `}>
            <input 
                type="text" 
                value={value} 
                onChange={e => setValue(e.target.value.replace(/[^\w\s]/gi, ''))} 
                className={css`
                    border-radius: 4px;
                    width: calc(100% - 9px);
                    padding: 4px;
                    transition: all .2s ease;
                    border-color: ${error ? 'red' : 'default'};
                    border-width: 0.5px;
                `} 
                onKeyUp={handleKeyUp}
                placeholder={placeholder}
            />
            { error && (
                <span className={css`color: red; font-size: .7rem;`}>{error}</span>
            )}
            { (value && !error && onKeyUp !== null) && (
                <span className={css`color: grey; font-size: .7rem;`}>Press Enter to save</span>
            )}
        </div>
    )
}