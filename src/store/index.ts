import { create } from 'zustand';
import { MyPageSlice, createMyPageSlice } from './memberSlice';

type SliceType = MyPageSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createMyPageSlice(...a),
}));
