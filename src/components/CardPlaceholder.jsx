import React from "react";

function CardPlaceholder() {
  return (
    <div className="card w-full bg-base-100 shadow-xl overflow-hidden">
      <div className="w-full aspect-video bg-gray-400"></div>
      <div className="card-body py-3 px-5">
        <h2 className="card-title text-lg line-clamp-2">Lorem Ipsum</h2>
        <div className="pb-2">
          <p className="line-clamp-3 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            alias culpa pariatur placeat non! Necessitatibus numquam amet ullam
            eveniet? Dolore temporibus et iusto mollitia earum eum iure quas
            consequatur natus!
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardPlaceholder;
