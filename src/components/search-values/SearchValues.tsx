import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Model, search } from '../../common/api/API';

import './SearchValues.css';

type SearchValuesProps = {
  term: string;
  onSelect: (model: Model) => void;
}

const useSearch = (term: string) => {
  const results = useMemo(() => search(term), [term]);
  const mapByType = useMemo(() => results.reduce((acc, curr) => ({
    ...acc,
    [curr.item.type]: acc[curr.item.type] ? [...acc[curr.item.type], curr.item] : [curr.item],
  }), {} as { [key: string]: Model[]}), [results]);
  return {results, mapByType};
}

export const SearchValues = ({ term, onSelect }: SearchValuesProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  const { mapByType, results } = useSearch(term);

  const handleModelSelection = useCallback((id: Model['id']) => {
    const model = results.find(model => model.item.id === id);
    if (model) {
      onSelect(model.item);
    }
  }, [onSelect, results]);

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    const focusable: HTMLButtonElement[] = Array.from(rootRef.current?.querySelectorAll('.SearchValues__model') || []);
    const currentFocus = document.activeElement as HTMLButtonElement;
    if (e.key === 'ArrowUp') {
      const index = focusable.indexOf(currentFocus);
      if (currentFocus && index > 0) {
        focusable[index - 1]?.focus();
      } else {
        focusable[0]?.focus();
      }
    }

    if (e.key === 'ArrowDown') {
      const index = focusable.indexOf(currentFocus);
      if (currentFocus && index < focusable.length) {
        focusable[index + 1]?.focus();
      }
    }
  }, []);

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeydown);
    return () => {
      document.body.removeEventListener('keydown', handleKeydown);
    }
  }, [handleKeydown]);

  return (
    <div className="SearchValues" ref={rootRef}>{
      Object.keys(mapByType)
      .map(type => ({
        type,
        num: mapByType[type].length
      }))
      .sort((a, b) => b.num - a.num)
      .map(({ type }) => {
        const models = mapByType[type];
        return (
          <div className="SearchValues__type-wrapper" key={type}>
            <div className="SearchValues__type">{type}</div>
            {models.map(model => (
              <button className="SearchValues__model" key={model.id} data-id={model.id} onClick={() => handleModelSelection(model.id)}>
                <span className="SearchValues__model-title"><strong>{model.id}</strong>{model.author ? ` by - ${model.author}` : ''}</span>
                <p className="SearchValues__model-updated">Updated: {model.modified}</p>
              </button>
            ))}
          </div>
        )
      })
    }</div>
  )
}
