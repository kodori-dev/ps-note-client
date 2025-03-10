"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { HolidaySchema, PenaltySchema } from "../../../../../models";
import { VacationSchema } from "@/types/api/get";
import dayjs from "dayjs";

interface Props {
  data: PenaltySchema[];
  holidays: HolidaySchema[];
  vacations: VacationSchema[];
  initialDate: Date;
  memberId: string;
}

/**
 * 꼬박꼬박 PS일지 - 먼슬리 뷰
 */
function MonthlySection({ data, holidays, vacations, initialDate, memberId }: Props) {
  const vacationEvents = vacations.map((vacation) => {
    const endDate = new Date(vacation.end_date);
    const new_endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1);

    return {
      title: `⛱️ ${vacation.memo}`,
      date: vacation.start_date,
      end: `${dayjs(new_endDate).format("YYYY-MM-DD")}`,
      // backgroundColor: "rgba(255, 236, 178)",
      backgroundColor: "rgba(207, 235, 245)",
      borderColor: "rgba(207, 235, 245)",
      textColor: "#7e7e7e",
    };
  });

  const holidayEvents = holidays.map((holiday) => ({
    title: holiday.name,
    date: holiday.date,
    backgroundColor: "rgba(255,69,71,0.5)",
    borderColor: "rgba(255,69,71,0.3)",
    textColor: "red",
  }));

  let penaltyEvents = [];

  data.forEach(({ day, admitted_solutions, not_admitted_solutions, coupons }) => {
    const sol1 = admitted_solutions.map((sol) => ({
      title: sol.problem.name,
      date: day,
      backgroundColor: "#DDEEDE",
      borderColor: "rgba(187, 220, 189, 0.3)",
      textColor: "#7a7a7a",
      url: `/solution/${sol.id}`,
    }));

    const sol2 = not_admitted_solutions.map((sol) => ({
      title: sol.problem.name,
      date: day,
      backgroundColor: "#FFE0DF",
      borderColor: "#FFE0DF",
      textColor: "#7a7a7a",
      url: `/solution/${sol.id}`,
    }));

    const coupon = coupons.map(({}) => ({
      title: "🎟️ 면제 티켓",
      date: day,
      backgroundColor: "#ECECEC",
      borderColor: "rgba(217, 217, 217, 0.5)",
      textColor: "#7e7e7e",
    }));

    penaltyEvents = penaltyEvents.concat([...sol1, ...sol2, ...coupon]);
  });

  return (
    <>
      <FullCalendar
        customButtons={{
          myPrevBtn: {
            text: "Prev",
            click: () => {
              const newDate = dayjs(initialDate).subtract(1, "month");
              window.location.href = `/attend/${memberId}?yy=${newDate.format("YYYY")}&mm=${newDate.format("MM")}`;
            },
          },
          myNextBtn: {
            text: "Next",
            click: () => {
              const newDate = dayjs(initialDate).add(1, "month");
              window.location.href = `/attend/${memberId}?yy=${newDate.format("YYYY")}&mm=${newDate.format("MM")}`;
            },
          },
          todayBtn: {
            text: "Today",
            click: () => (window.location.href = `/attend/${memberId}`),
          },
        }}
        headerToolbar={{
          center: "todayBtn",
          right: "myPrevBtn,myNextBtn",
        }}
        initialDate={initialDate}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[...penaltyEvents, ...holidayEvents, ...vacationEvents]}
      />
    </>
  );
}

export default MonthlySection;
