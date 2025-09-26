import SolutionCard from "@/components/Card/SolutionCard";
import { PaginatedSolutionSchema } from "../../../../../types/models/data-contracts";

interface Props {
  data: PaginatedSolutionSchema;
}

function CardSection({ data }: Props) {
  console.log(data.count, data.page, data.size);

  return (
    <div>
      {/* {data.count}개의 문제를 풀었어요. */}
      {data.items.length > 0 ? data.items.map((solution) => <SolutionCard key={solution.id} {...solution} />) : <p>아직 푼 문제가 없어요.</p>}
    </div>
  );
}

export default CardSection;
