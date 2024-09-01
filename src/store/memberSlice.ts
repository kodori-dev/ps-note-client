import { PostSignUpRes } from '@/types/api/auth';
import { StateCreator } from 'zustand';

export interface MemberSlice {
  member: PostSignUpRes | null;
  setMember: (mem: PostSignUpRes) => void;
}

export const createMemberSlice: StateCreator<MemberSlice> = (set) => ({
  member: null,
  setMember: (mem) => set((state) => ({ ...state, member: mem })),
});
