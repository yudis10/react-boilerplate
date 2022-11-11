import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

function MovieDetail() {
  const params = useParams();
  const fetchMovie = async () => {
    return Axios.get(
      `https://api.themoviedb.org/3/movie/${
        params.movieId
      }?append_to_response=credits,videos,images&api_key=${
        import.meta.env.VITE_APP_KEY
      }`
    ).then((res) => res.data);
  };

  const { isLoading, isError, data, isRefetching } = useQuery(
    ["movieDetail"],
    () => fetchMovie(),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isRefetching) return <div>Refetching...</div>;

  const movie = {
    ...data,
    poster_path: data.poster_path
      ? "https://image.tmdb.org/t/p/w500/" + data.poster_path
      : "https://via.placeholder.com/500x750",
    vote_average: (data.vote_average * 10).toFixed(2) + "%",
    releaseDate: new Date(data.release_date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    genresJoin: data.genres.map((g) => g.name).join(", "),
    crew: data.credits.crew.slice(0, 3),
    cast: data.credits.cast.slice(0, 5).map((c) => ({
      ...c,
      profile_path: c.profile_path
        ? "https://image.tmdb.org/t/p/w300/" + c.profile_path
        : "https://via.placeholder.com/300x450",
    })),
    images: data.images.backdrops.slice(0, 9),
  };

  return (
    <div>
      <div className="flex flex-col gap-5 md:flex-row md:gap-10">
        <div className="aspect-[2/3] w-auto md:w-96 flex-shrink-0">
          <img
            className="object-cover w-full h-full"
            src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="grid gap-4 md:place-content-center">
          <h1 className="text-3xl font-bold text-center md:text-left">
            {movie.title}
          </h1>
          <h2>{movie.tagline}</h2>
          <div className="flex gap-1">
            <span>{movie.spoken_languages[0].name}</span> /
            <span>{movie.runtime} Min</span> / <span>{movie.releaseDate}</span>
          </div>
          <p>{movie.overview}</p>
          <div className="font-bold">{movie.genresJoin}</div>
        </div>
      </div>
      <div className="grid gap-4 my-5 md:grid-cols-3">
        {movie.videos.results
          .filter((item) => item.site == "YouTube")
          .map((trailer) => (
            <div key={trailer.key} className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MovieDetail;
