import { useCallback, useEffect, useState } from 'react';
import { Instructions } from './components/instructions/Instructions';
import { Search } from './components/search/Search';
import { Trigger } from './components/trigger/Trigger';
import { SelectedOutput } from './components/selected-output/SelectedOutput';
import './App.css';
import { Model } from './common/api/API';

export const App = () => {
  const [selected, setSelected] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  function handleTrigger() {
    setIsSearchVisible(true);
  }

  const handleOnSelect = useCallback((model: Model) => {
    setSelected(model.id);
    setIsSearchVisible(false);
  }, []);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (!isSearchVisible && (e.metaKey || e.ctrlKey) && e.key === 'k') {
        setIsSearchVisible(true);
      }
      if (isSearchVisible && e.key.toLowerCase() === 'escape') {
        setIsSearchVisible(false);
      }
    },
    [isSearchVisible],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    }
  }, [handleKeydown]);

  return (
    <div className="App">
      <Instructions />
      <div className="Implementation">
        <Trigger onTrigger={handleTrigger} />

        <Search visible={isSearchVisible} onSelect={handleOnSelect} />

        <SelectedOutput selected={selected}/>
      </div>
    </div>
  );
}
