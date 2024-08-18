'use client';

import { MouseEvent, useEffect, useState } from 'react';
import NoStarIcon from '../../../public/icon-star-f.svg';
import StarIcon from '../../../public/icon-star-t.svg';

interface Props {
  isStar: boolean;
  stars: number;
}

function StarButton({ isStar, stars }: Props) {
  const [stared, setStared] = useState(isStar);

  useEffect(() => {
    setStared(isStar);
  }, [isStar]);

  const handleClickStar = (e: MouseEvent) => {
    e.preventDefault();
    setStared((prev) => !prev);
  };

  return (
    <button onClick={handleClickStar} className="absolute top-2 right-2 flex flex-col items-center hover:cursor-pointer">
      {stared ? <StarIcon /> : <NoStarIcon />}
      <p className="text-12 text-gray-3">{stars}</p>
    </button>
  );
}

export default StarButton;
