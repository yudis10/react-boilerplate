import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

function MovieDetail() {
  const params = useParams();
  const fetchTv = async () => {
    return Axios.get(
      `https://api.themoviedb.org/3/tv/${
        params.tvId
      }?append_to_response=credits,videos,images&api_key=${
        import.meta.env.VITE_APP_KEY
      }`
    ).then((res) => res.data);
  };

  const { isLoading, isError, data, isRefetching } = useQuery(
    ["tvDetail"],
    () => fetchTv(),
    {
      keepPreviousData: true,
    }
  );

  if (isError) return <div>Request Failed</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isRefetching) return <div>Loading...</div>;

  const lastAirDate = new Date(data?.last_air_date).toLocaleDateString(
    "en-us",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div>
      <div className="flex flex-col gap-5 md:flex-row md:gap-10">
        <div className="aspect-[2/3] w-auto md:w-96 flex-shrink-0">
          <img
            className="object-cover w-full h-full"
            src={`${import.meta.env.VITE_IMG_URL}${data.poster_path}`}
            alt={data.original_name}
          />
        </div>
        <div className="grid gap-4 md:place-content-center">
          <h1 className="text-3xl font-bold text-center md:text-left">
            {data.original_name}
          </h1>
          <div className="flex gap-1">
            <span>{data.spoken_languages[0].english_name}</span> /
            <span>{data.episode_run_time} Episode</span> /
            <span>{lastAirDate}</span>
          </div>
          <p>{data.overview}</p>
          <div className="grid grid-cols-2 md:flex md:overflow-x-scroll gap-4">
            {data.seasons.map((item) => (
              <div
                key={item.name}
                className="w-auto md:w-52 md:flex-shrink-0 flex flex-col gap-2"
              >
                <img
                  className="w-full aspect-[2/3]"
                  src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                  alt=""
                />
                <h2 className="text-base font-bold">{item.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-8 mt-5 md:my-8 md:grid-cols-3 empty:hidden">
        {data?.videos.results
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
