import { defaultUserSession } from "@/constants/userSession";
import { useQuery } from "@tanstack/react-query";

/**
 * client에서 유저 정보 가져오기
 */
export const useGetUserInfo = () => {
  const obj = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const session = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/session`, { credentials: "include" });
      return await session.json();
    },
    initialData: defaultUserSession,
    staleTime: 60 * (60 * 1000),
    gcTime: Infinity,
  });

  return obj;
};
