import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { NavLink } from "react-router-dom";

function InfiniteScroll() {
  const [page, setPage] = useState(1);
  const [tv, setTV] = useState([]);

  const observer = useRef();

  const fetchTV = async (page) => {
    return Axios.get(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${
        import.meta.env.VITE_APP_KEY
      }&page=${page}`
    ).then((res) => res.data);
  };

  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["tv", page],
    () => fetchTV(page),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    setTV((prev) => {
      return [
        ...new Set(prev.concat(data?.results).filter((e) => e !== undefined)),
      ];
    });
  }, [data]);

  const hasMore = page === data?.total_pages ? false : true;
  const loadMoreElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevState) => prevState + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  if (isError) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tv?.map((item, index) => (
          <NavLink
            to={`/tv/${item.id}`}
            key={`${item.id}-${index}`}
            className="card w-full bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="w-full aspect-video object-cover"
                src={`${import.meta.env.VITE_IMG_URL}${item.backdrop_path}`}
                alt={item.name}
              />
            </figure>
            <div className="card-body py-3 px-5">
              <h2 className="card-title text-lg line-clamp-2">{item.name}</h2>
              <div className="pb-2">
                <p className="line-clamp-3 text-sm">{item.overview}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
      <div className="flex flex-col justify-center my-5">
        {isFetching ? (
          <div className="btn btn-block loading mb-4">Fetching...</div>
        ) : null}
        <div className="flex justify-center gap-4">
          <button
            ref={loadMoreElementRef}
            onClick={() => setPage((prevState) => prevState + 1)}
            disabled={!hasMore}
            className="btn bg-blue-600 border-0"
          >
            Load More
          </button>
        </div>
      </div>
    </>
  );
}

export default InfiniteScroll;
