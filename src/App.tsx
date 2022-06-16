import React from 'react';
import Autocomplete from "./components/Autocomplete/Autocomplete";
import {ChangeEvent, useState} from "react";
import GithubAPI from "./api/Github";
import {AutocompleteOption} from "./components/Autocomplete/types";
import {capitalize} from "./helpers/utils";
import './App.css';

function App() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [menuOptions, setMenuOptions] = useState<AutocompleteOption[]>([]);
  const [searchText, setSearchText] = useState('');

  const loadData = async (query: string) => {
    setIsLoading(true);
    const topics = await GithubAPI.searchTopics(query);

    const newOptions: AutocompleteOption[] = topics.map(item => ({
      label: capitalize(item.name),
      value: item.name,
    }));

    setMenuOptions(newOptions);
    setIsLoading(false);
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    loadData(e.target.value)
  };

  const onSelectHandler = (option: AutocompleteOption) => {
    setTopic(option.label);
    setSearchText(option.label)
  };

  return (
    <div className="topic-input">
      <Autocomplete
        onSelect={onSelectHandler}
        onChange={onChangeInputHandler}
        options={menuOptions}
        value={topic}
        searchText={searchText}
        placeholder="Search GitHub topic..."
        loading={isLoading}
      />
    </div>
  );
}

export default App;
