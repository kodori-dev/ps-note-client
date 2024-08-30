import {UserType} from "@/types/api/auth";
import {PenaltyType} from "@/types/api/penalty";
import {ProblemType} from "@/types/api/problem";



export interface HomePageRes {
  members: UserType[];
  today_problems: ProblemType[];
  current_week_starred_problems: ProblemType[];
  penalties: PenaltyType[];
  penalty_map: {
    [k: string]: PenaltyType[];
  }
}
