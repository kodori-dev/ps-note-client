"use client";

import { MouseEvent, useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";

interface Props {
  problemId: number;
  isStar: boolean;
  stars: number;
  isSolve: boolean;
}

function StarButton({ problemId, isStar, stars, isSolve }: Props) {
  const [star, setStar] = useState({ state: isStar, num: stars });
  const user = useGetUserInfo();

  const handleClickStar = (e: MouseEvent) => {
    e.preventDefault();
    if (star.state) setStar({ state: !star.state, num: --star.num });
    else setStar({ state: !star.state, num: ++star.num });
  };

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      try {
        if (!user.data) throw Error();
        if (star.state === isStar) return;
        if (star.state) {
          const res = await api("POST", "/problem-stars", { problem_id: problemId, star: true });
        } else {
          const res = await api("POST", "/problem-stars", { problem_id: problemId, star: false });
        }
      } catch (err) {}
    }, 2000);

    return () => clearTimeout(debounceTimer);
  }, [star]);

  return (
    <button onClick={handleClickStar} className="group/star z-10 absolute top-2 right-2 flex flex-col items-center hover:cursor-pointer">
      {star.state ? <IoHeartSharp size={24} fill="#FF4547" /> : <IoHeartOutline size={24} />}
      <p className="text-12 text-gray-3">{star.num}</p>
      {/* {!isSolve && (
        <span className="hidden group-hover/star:inline-block text-12 absolute whitespace-nowrap -right-44 -top-[6px] px-2 py-[2px] bg-black/30 text-white rounded-md z-modal">
          문제를 풀어야 추천할 수 있어요.
        </span>
      )} */}
    </button>
  );
}

export default StarButton;
