import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import CardPlaceholder from "../components/CardPlaceholder";

function Home() {
  const [page, setPage] = useState(1);

  const fetchMovies = async (page) => {
    return Axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${
        import.meta.env.VITE_APP_KEY
      }&page=${page}`
    ).then((res) => res.data);
  };

  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["movies", page],
    () => fetchMovies(page),
    {
      keepPreviousData: true,
    }
  );

  if (isError) return <div>Request Failed</div>;
  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
        {Array.from({ length: 20 }, (_, i) => {
          return <CardPlaceholder key={i} />;
        })}
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
        {data?.results.map((item) => (
          <NavLink
            to={`/movie/${item.id}`}
            key={item.id}
            className="card w-full bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="w-full aspect-video object-cover"
                src={`${import.meta.env.VITE_IMG_URL}${item.backdrop_path}`}
                alt={item.title}
              />
            </figure>
            <div className="card-body py-3 px-5">
              <h2 className="card-title text-lg line-clamp-2">{item.title}</h2>
              <div className="pb-2">
                <p className="line-clamp-3 text-sm">{item.overview}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      {isFetching ? (
        <div className="btn btn-block loading">Fetching...</div>
      ) : null}

      <div className="flex justify-center my-5">
        <div className="flex gap-4">
          <button
            onClick={() => setPage((prevState) => Math.max(prevState - 1, 0))}
            disabled={page === 1}
            className="btn bg-blue-600 border-0"
          >
            Prev Page
          </button>

          <button
            onClick={() => setPage((prevState) => prevState + 1)}
            disabled={page === data?.total_pages}
            className="btn bg-blue-600 border-0"
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
