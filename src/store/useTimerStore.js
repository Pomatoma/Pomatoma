import { create } from "zustand";

export const useTimerStore = create(set => ({
  studyTime: 50,
  breakTime: 10,
  cycles: 1,
  // 상태 변경
  setStudyTime: minutes => set({studyTime: minutes}),
  setBreakTime: minutes => set({studyTime: minutes}),
  setCycles: count => set({cycles: count}),
}))