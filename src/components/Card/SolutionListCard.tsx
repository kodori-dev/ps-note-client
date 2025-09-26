"use client";

import { SolutionSchema } from "../../../types/models/data-contracts";
import { OJ_TYPE_STRING } from "@/constants/ojType";
import LevelChip from "../Chip/LevelChip";
import Chip from "../Chip";
import { useRouter } from "next/navigation";

function SolutionListCard(props: SolutionSchema) {
  const { problem, member, source_lang, submitted_at, score_label, id } = props;
  const navigate = useRouter();

  return (
    <div
      onClick={() => {
        navigate.push(`/solution/${id}`);
      }}
      className="group hover:cursor-pointer rounded-sm hover:bg-[#F2F4F6] p-3 flex items-center gap-2 text-14 text-[#8B95A1]"
    >
      <span className="basis-[12.5%]">{submitted_at}</span>
      <span className="basis-[12.5%]">{OJ_TYPE_STRING[problem.oj_type]}</span>
      <span className="basis-[12.5%]">
        <LevelChip level={problem.level} style="mini" />
      </span>
      <h6 className="basis-[29.17%] text-[#031228b3] dark:text-[#fff] dark:group-hover:text-[#031228b3] font-bold truncate">
        [{problem.oj_id}] {problem.name}
      </h6>
      <span className="basis-[12.5%]">{source_lang}</span>
      <span className="basis-[8.33%]">{member.nickname}</span>
      <span className="basis-[12.5%]">
        <Chip type={score_label === "AC" ? "AC" : "WA"}>{score_label}</Chip>
      </span>
    </div>
  );
}

export default SolutionListCard;
