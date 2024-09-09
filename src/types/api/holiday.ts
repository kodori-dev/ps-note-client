export interface HolidayType {
  id: number;
  name: string;
  date: string;
}

export type GetHolidayRes = HolidayType[];
