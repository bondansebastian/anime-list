import { css } from '@emotion/css';
import React, { RefObject, useState } from 'react';

type KeyUpHandler = {
    (value: string, setValue: Function): void;
}

type TextboxProps = {
    fullwidth?: boolean;
    error?: string;
    placeholder?: string;
    onKeyUp?: KeyUpHandler|null;
    style?: string;
}

export default React.forwardRef(function Textbox({ 
    fullwidth = true, 
    error, 
    placeholder, 
    onKeyUp = null, 
    style 
}: TextboxProps, ref) {
    const [ value, setValue ] = useState<string>('');

    const handleKeyUp = (event: React.KeyboardEvent) => {
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
                ref={ref as RefObject<HTMLInputElement>}
                type="text" 
                value={value} 
                onChange={e => setValue(e.target.value.replace(/[^\w\s]/gi, ''))} 
                className={css`
                    width: calc(100% - 9px);
                    padding: 4px;
                    transition: border-color .2s ease;
                    border-color: ${error ? 'red' : 'gray'};
                    border-top: none !important;
                    border-left: none !important;
                    border-right: none !important;
                    border-bottom: .5px solid gray;
                    &:focus,
                    &:focus-visible {
                        border-bottom: 2px solid #80bdff;
                        outline: none;
                    }
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
})