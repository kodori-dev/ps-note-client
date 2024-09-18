import { StateCreator } from 'zustand';

export interface MyPageSlice {
  isInfoEdit: string;
  setIsInfoEdit: (isEdit: string) => void;
}

export const createMyPageSlice: StateCreator<MyPageSlice> = (set) => ({
  isInfoEdit: '',
  setIsInfoEdit: (isEdit) => set((state) => ({ ...state, isInfoEdit: isEdit })),
});
