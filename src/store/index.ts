import { create } from 'zustand';
import { createMemberSlice, MemberSlice } from './memberSlice';

type SliceType = MemberSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createMemberSlice(...a),
}));
