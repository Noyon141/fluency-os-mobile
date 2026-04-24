import { apiClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUploadAudio = () => {
  return useMutation({
    mutationFn: async (audioUri: string) => {
      // Implementation for uploading audio
      const formData = new FormData();

      const fileName = audioUri.split("/").pop() || "recording.m4a";
      const fileType = fileName.endsWith(".wav") ? "audio/wav" : "audio/m4a";

      formData.append("audioFile", {
        name: fileName,
        uri: audioUri,
        type: fileType,
      } as any);

      const response = await apiClient.post("/api/tests/evaluate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
  });
};
export default useUploadAudio;
