import { create } from "zustand";

interface RecordingState {
  isRecording: boolean;
  recordedTime: number;
  setRecording: (isRecording?: boolean) => void;
}

export const useRecordingStore = create<RecordingState>((set) => ({
  isRecording: false,
  recordedTime: 0,
  setRecording: (isRecording) => set({ isRecording }),
}));
