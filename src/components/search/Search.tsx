import { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { Model } from '../../common/api/API';
import { SearchInput } from '../search-input/SearchInput'
import { SearchValues } from '../search-values/SearchValues';

import './Search.css';

type SearchProps = {
  visible: boolean;
  onSelect: (model: Model) => void;
}

export const Search = ({ visible, onSelect }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');

  const handleOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => setSearchValue(e.target.value),
    [],
  )

  useEffect(() => {
    if (visible && inputRef.current) {
      inputRef.current.focus();
    } else if (!visible) {
      setSearchValue('');
    }
  }, [visible]);

  return (
    visible ?
    (
      <div className="Search">
        <SearchInput ref={inputRef} onChange={handleOnChange} />
        {!!searchValue && <div className="Search__values"><SearchValues term={searchValue} onSelect={onSelect} /></div>}
      </div>
    ) : null
  );
}
