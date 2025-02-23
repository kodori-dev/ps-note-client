import Button from "@/components/Button";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface Props {
  all: number;
  todayAttendNum: number;
  attend: "already" | "notYet" | "coupon";
  nickname: string;
  isCoupon?: boolean;
  isMe?: boolean;
  today: string;
}

const TODAY_RESULT = {
  already: "문제를 이미 풀었어요.",
  notYet: "문제를 풀지 않았어요.",
  coupon: "면제 티켓을 사용했어요.",
};

/**
 * 오늘 전 멤버 출석 현황
 * @param isCoupon [본인] 이번 주 쿠폰 여부
 * @param isMe [본인] 해당 멤버의 페이지를 조회하는 사람이 본인인지
 */
function AllTodaySection({
  today,
  all,
  todayAttendNum,
  attend,
  nickname,
  isCoupon = false,
  isMe = false,
}: Props) {
  return (
    <article className="w-[386px] bg-white rounded-md py-6 px-5 shadow-lg flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-24 leading-tight">
          <span className="font-700">오늘의 출석 현황</span>을<br /> 한 눈에
          확인하세요!
        </h3>
        <p className="text-12 text-gray-4 text-end">기준: {today}</p>
      </div>
      <div className="flex justify-center">
        <CircularProgress
          color="#0090fe"
          value={(todayAttendNum / all) * 100}
          size="216px"
          boxSize={216}
          borderWidth="14px"
        >
          <CircularProgressLabel>
            <div className="text-gray-4 text-16">
              <span className="text-40 font-700 text-primary">
                {todayAttendNum}
              </span>
              /{all}
            </div>
          </CircularProgressLabel>
        </CircularProgress>
      </div>
      <p className="text-center mb-3">
        <span className="font-700">{nickname}</span> 님은 오늘{" "}
        {TODAY_RESULT[attend]}
      </p>
      <div className="flex gap-6">
        <Button
          disabled={!isMe || !isCoupon}
          theme="secondary"
          roundSize="sm"
          heightSize="sm"
          customStyle="w-full"
        >
          오늘은 Skip!
        </Button>
        <Button
          disabled={!isMe}
          heightSize="sm"
          roundSize="sm"
          customStyle="w-full"
        >
          Check-In
        </Button>
      </div>
    </article>
  );
}

export default AllTodaySection;
