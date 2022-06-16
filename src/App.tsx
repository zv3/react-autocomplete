import React from 'react';
import Autocomplete from './components/Autocomplete/Autocomplete';
import { ChangeEvent, useState } from 'react';
import GithubAPI from './api/Github';
import { AutocompleteOption } from './components/Autocomplete/types';
import { capitalize } from './helpers/utils';
import './App.css';

function App() {
  const [menuOptions, setMenuOptions] = useState<AutocompleteOption[]>([]);
  const [searchText, setSearchText] = useState('');

  const loadData = async (query: string) => {
    const topics = await GithubAPI.searchTopics(query);

    const newOptions: AutocompleteOption[] = topics.map((item) => ({
      label: capitalize(item.name),
      value: item.name,
    }));

    setMenuOptions(newOptions);
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    loadData(e.target.value);
  };

  const onSelectHandler = (option: AutocompleteOption) => {
    setSearchText(option.label);
  };

  return (
    <div className="topic-input">
      <Autocomplete
        onSelect={onSelectHandler}
        onChange={onChangeInputHandler}
        options={menuOptions}
        searchText={searchText}
        placeholder="Search GitHub topic..."
      />
    </div>
  );
}

export default App;
