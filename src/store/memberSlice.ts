import { StateCreator } from 'zustand';

export interface MyPageSlice {
  isInfoEdit: boolean;
  setIsInfoEdit: (isEdit: boolean) => void;
}

export const createMyPageSlice: StateCreator<MyPageSlice> = (set) => ({
  isInfoEdit: false,
  setIsInfoEdit: (isEdit) => set((state) => ({ ...state, isInfoEdit: isEdit })),
});
