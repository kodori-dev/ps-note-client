import { OJ_TYPE_STRING } from "@/constants/ojType";
import { SolutionSchema } from "../../../types/models/data-contracts";
import LevelChip from "../Chip/LevelChip";
import Chip from "../Chip";

function SolutionCard(props: SolutionSchema) {
  const { problem, member, source_lang, submitted_at, oj_score_label, score_label } = props;
  return (
    <div className="group rounded-sm hover:bg-[#F2F4F6] p-5 flex flex-col gap-2">
      <div className="text-14 text-[#8B95A1]">
        {OJ_TYPE_STRING[problem.oj_type]} · {problem.oj_id} · {<LevelChip level={problem.level} style="mini" />}
      </div>

      <div className="flex gap-2 items-center justify-between">
        <h6 className="text-[#031228b3] dark:text-[#fff] dark:group-hover:text-[#031228b3] font-bold">{problem.name}</h6>
        <Chip type={score_label === "AC" ? "AC" : "WA"}>{score_label}</Chip>
      </div>

      <div className="text-14 text-[#8B95A1]">
        {member.nickname} · {source_lang} · {submitted_at}
      </div>
    </div>
  );
}

export default SolutionCard;
