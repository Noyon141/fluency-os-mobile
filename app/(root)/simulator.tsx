import { Text } from "@/components/ui/text";
import useUploadAudio from "@/hooks/useUploadAudio";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
} from "expo-audio";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

const SimulatorScreen = () => {
  const [scoreCard, setScoreCard] = useState<any>(null);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  // Bring in our TanStack mutation
  const { mutate: uploadAudio, isPending } = useUploadAudio();

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Toast.error("Permission to access microphone was denied");
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  const toggleRecording = async () => {
    if (audioRecorder.isRecording) {
      await audioRecorder.stop();
      const uri = audioRecorder.uri;
      setRecordingUri(uri);

      console.log("Recording stopped. URI:", uri);
    } else {
      await audioRecorder.prepareToRecordAsync();
      await audioRecorder.record();

      console.log("Recording started");
    }
  };

  const handleUpload = () => {
    if (!recordingUri) return;

    uploadAudio(recordingUri, {
      onSuccess: (data) => {
        Toast.success("Audio uploaded successfully!");
        setRecordingUri(null); // Reset after upload
      },
      onError: (error) => {
        Toast.error("Upload failed. Please try again.");
        console.error(error);
      },
    });
  };

  return (
    <SafeAreaView>
      <View className="p-4 items-center bg-black">
        <Pressable
          onPress={toggleRecording}
          className={`w-20 h-20 rounded-full items-center justify-center ${audioRecorder.isRecording ? "bg-red-500" : "bg-white"}`}
        >
          <Text
            className={
              audioRecorder.isRecording ? "text-white" : "text-black font-bold"
            }
          >
            {audioRecorder.isRecording ? "Stop" : "Record"}
          </Text>
        </Pressable>

        {recordingUri && !audioRecorder.isRecording && (
          <Pressable
            onPress={handleUpload}
            disabled={isPending}
            className="mt-6 bg-blue-500 px-6 py-3 rounded-lg"
          >
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-lg">
                Send to Server
              </Text>
            )}
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SimulatorScreen;
