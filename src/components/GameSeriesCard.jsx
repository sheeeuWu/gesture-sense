/* eslint-disable react/prop-types */
import React from "react";

const GameSeriesCard = ({ game }) => {
  return (
    <div className="w-full sm:w-48 mx-4 my-4 max-w-xs min-w-[200px]">
      <div className="h-32 w-full">
        <img
          className="h-full w-full object-cover object-left-top"
          src={game.imageUrl}
          alt={game.title}
        />
        <div className="bg-blue-600 p-2">
          <p className="font-bold text-sm">{game.title}</p>
          <p className="text-xs text-left mt-1">{game.description}</p>
        </div>
      </div>
    </div>
  );
};

export default GameSeriesCard;
