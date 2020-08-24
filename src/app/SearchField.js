import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchBooks } from "../features/books/booksSlice";
import { useDispatch } from "react-redux";

import { allWordCharacters } from "../app/regex";

import './SearchField.css'

export const SearchField = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInput(value);
  };



  const history = useHistory();

  const dispatch = useDispatch()
  return (
    <form className='search-field'>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          if (input !== '') {
            const searchQuery = input.replace(allWordCharacters, "")
            setInput(searchQuery)
            dispatch(fetchBooks(searchQuery))
            history.push(`/search/${searchQuery}`);
          }
        }}
      />
    </form>
  );
};


