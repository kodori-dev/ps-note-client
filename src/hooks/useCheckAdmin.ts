import { useGetUserInfo } from "./useGetUserInfo";

export const useCheckAdmin = () => {
  const { data: user, isSuccess } = useGetUserInfo();
  return user.isAdmin;
};
