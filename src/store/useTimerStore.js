import { create } from "zustand";

export const useTimerStore = create(set => ({
  studyTime: 50,
  breakTime: 10,
  cycles: 1,
  // 상태 변경
  setStudyTime: minutes => set({studyTime: minutes}),
  setBreakTime: minutes => set({breakTime: minutes}),
  setCycles: count => set({cycles: count}),

  // 카운트된 값 저장
  dailyCount: 0,              // 오늘 완료된 사이클 수  
  incrementDaily: () => // 완료될 때마다 증가
    set(state => ({
      dailyCount: state.dailyCount + 1
    })),
  resetDaily: () => 
    set({dailyCount: 0}),     // 매일 자정 값 전송 후 0으로 초기화
}));