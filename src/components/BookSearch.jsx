import React, { useState, useRef, useCallback } from "react";
import useBookSearch from "../Hooks/useBookSearch";

export default function BookSearch() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { books, hasMore, loading, error } = useBookSearch(query, pageNumber);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full max-w-xs"
          value={query}
          onChange={handleSearch}
        ></input>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        {books.map((book, index) => {
          if (books.length === index + 1) {
            return (
              <div
                className="border-b border-gray-300 py-2 text-sm"
                ref={lastBookElementRef}
                key={book}
              >
                {book}
              </div>
            );
          } else {
            return (
              <div className="border-b border-gray-300 py-2 text-sm" key={book}>
                {book}
              </div>
            );
          }
        })}
      </div>
      {loading && <div className="btn btn-block loading">Loading...</div>}
      <div>{error && "Error"}</div>
    </>
  );
}
