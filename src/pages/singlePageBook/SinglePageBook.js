import React from "react";
import {
  fetchSingleBook,
  selectBook,
} from "../../features/books/singleBookSlice";
import { useDispatch, useSelector } from "react-redux";
import useConstructor from "../../app/useConstructor";
import { SearchField } from "../../app/SearchField";
import { Link } from "react-router-dom";

import noImage from "../../img/no-cover.svg";
import logo from "../../img/logo.svg";

import "./SinglePageBook.css";

export const SinglePageBook = ({ match }) => {
  const { bookId } = match.params;

  const dispatch = useDispatch();
  const book = useSelector(selectBook);

  const bookStatus = useSelector((state) => state.book.status);
  const error = useSelector((state) => state.book.error);

  useConstructor(() => {
    if (bookStatus === "idle" || bookStatus === "succeeded") {
      dispatch(fetchSingleBook(bookId));
    }
  });

  let content;
  console.log("on route change");

  if (bookStatus === "loading") {
    content = (
      <div className="single-page-book-content">
        <div className="loader">Loading...</div>
      </div>
    );
  } else if (bookStatus === "succeeded") {
    content = <SingleBook data={book[0]} />;
  } else if (bookStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="wrapper single-page-book">
      <section>
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
        {content}
      </section>
    </div>
  );
};

export const SingleBook = ({ data }) => {
  const {
    title,
    authors,
    description,
    publishedDate,
    imageLinks,
    infoLink,
  } = data.volumeInfo;

  const image = imageLinks !== undefined ? imageLinks.medium : noImage;
  const dateObject = new Date(publishedDate);
  const date = publishedDate !== undefined ? dateObject.getFullYear() : "";

  const formatList = (array) => {
    let initialStr = "By";

    for (let i = 0; i < array.length; i++) {
      if (i === 0) {
        initialStr += ` ${array[i]}`;
      } else if (i === array.length - 1) {
        initialStr += ` and ${array[i]}`;
      } else {
        initialStr += `, ${array[i]}`;
      }
    }

    return initialStr;
  };

  return (
    <div className="single-page-book-content">
      <div className="cover">
        <img src={image} alt="" srcSet="" />
      </div>
      <div className="info">
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
        <p>{date}</p>
        <p>{formatList(authors)}</p>
        <a href={infoLink}>
          <div className="button">Google link</div>
        </a>
      </div>
    </div>
  );
};
