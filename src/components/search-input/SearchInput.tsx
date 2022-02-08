import { ComponentPropsWithRef, forwardRef } from 'react';

import './SearchInput.css';

export const SearchInput = forwardRef<HTMLInputElement, ComponentPropsWithRef<'input'>>(({ onChange, ...rest }, ref) => {
  return (
    <div className="SearchInput">
      <input
        ref={ref}
        className="SearchInput__input"
        type="text"
        onChange={onChange}
        placeholder="BaseTen Search"
        {...rest}
      />
    </div>
  )
})
