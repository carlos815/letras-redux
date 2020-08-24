import React, { useEffect } from "react";
import { fetchBooks, selectAllBooks } from "../../features/books/booksSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SearchField } from "../../app/SearchField";

import noImage from "../../img/no-cover.svg";
import logo from "../../img/logo.svg";

import "./SearchResults.css";

export const SearchResults = ({ match }) => {
  const { search } = match.params;

  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);

  const bookStatus = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    if (bookStatus === "idle") {
      dispatch(fetchBooks(search));
    }
  }, [bookStatus, dispatch]);

  useEffect(() => {
    dispatch(fetchBooks(search));
  }, [search]);

  let content;

  if (bookStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (bookStatus === "succeeded") {
    content = books.map((book) => {
      return <BookCard key={book.id} data={book} />;
    });
  } else if (bookStatus === "failed") {
    content = <div>{error}</div>;
  } else if (bookStatus === "succeeded-no-matches") {
    content = <div>Your search didn't return anything</div>;
  }

  return (
    <div className="wrapper search-results">
      <section className="">
        <div className="logo">
          <Link to="/">
            <img
              src={logo}
              alt="Letras. Googling books with extra steps"
              srcSet=""
            />
          </Link>
        </div>
        <SearchField />

        <div className="cards-container">{content}</div>
      </section>
    </div>
  );
};

export const BookCard = ({ data }) => {
  const { title, description, publishedDate, imageLinks } = data.volumeInfo;

  const image = imageLinks !== undefined ? imageLinks.thumbnail : noImage;
  const shortenedDescription = description
    ? description.substring(0, 100) + "..."
    : "";
  const dateObject = new Date(publishedDate);
  const date = publishedDate !== undefined ? dateObject.getFullYear() : "";

  return (
    <Link to={`/book/${data.id}`}>
      <div className="book-card">
        <div className="cover">
          <img src={image} alt="" srcSet="" />
        </div>
        <h2>{title}</h2>
        <p>{shortenedDescription}</p>
        <p>{date}</p>
      </div>{" "}
    </Link>
  );
};
