import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { apiClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

const SimulatorScreen = () => {
  const [processing, setProcessing] = useState(false);
  const [scoreCard, setScoreCard] = useState<any>(null);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

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

  const submitRequest = async (formData: FormData) => {
    const response = await apiClient.post("/api/tests/evaluate", {
      data: formData,
    });

    return response.data;
  };

  const submitMutation = useMutation({
    mutationFn: submitRequest,
    onSuccess: (data) => {
      setScoreCard(data);
      setProcessing(false);
    },
    onError: (error) => {
      console.log("Error submitting recording:❌", error);
      Toast.error("Failed to submit recording.");
      setProcessing(false);
    },
  });

  const startRecording = async () => {
    try {
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
    } catch (error) {
      console.log("Error starting recording:❌", error);
      Toast.error("Failed to start recording.");
    }
  };

  const stopAndSubmitRecording = async () => {
    if (!recorderState.isRecording) return;

    setProcessing(true);

    try {
      await audioRecorder.stop();
      const uri = audioRecorder.uri;

      if (!uri) throw new Error("Failed to get recording URI.");

      const formData = new FormData();

      formData.append("audio", {
        uri: uri,
        name: "test_audio.m4a",
        type: "audio/m4a",
      } as any);

      submitMutation.mutate(formData);
    } catch (error) {
      console.log("Error stopping recording:❌", error);
      Toast.error("Failed to process recording.");
      setProcessing(false);
    }
  };

  return (
    <SafeAreaView>
      <View className="flex-1 bg-black items-center justify-center p-6">
        {/* Dark Theme, Minimal UI */}
        <Text className="text-white text-2xl font-bold mb-8">FluencyOS</Text>
        <Text className="text-gray-400 text-center mb-12">
          Speak clearly. The examiner is listening.
        </Text>

        {scoreCard ? (
          <View className="bg-gray-900 p-6 rounded-2xl w-full border border-gray-800">
            <Text className="text-white text-xl font-bold mb-4">
              Band: {scoreCard.overallBand}
            </Text>
            <Text className="text-gray-300">
              Fluency: {scoreCard.fluencyScore}
            </Text>
            <Text className="text-gray-300">
              Grammar: {scoreCard.grammarScore}
            </Text>
            {/* Add a reset button to try again */}
          </View>
        ) : (
          <Button
            onPressIn={startRecording}
            onPressOut={stopAndSubmitRecording}
            disabled={processing}
            className={`h-32 w-32 rounded-full items-center justify-center border-4 ${
              recorderState.isRecording
                ? "border-red-500 bg-red-500/20"
                : "border-white bg-white/10"
            }`}
          >
            {processing ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white font-bold uppercase tracking-widest">
                {recorderState.isRecording ? "Recording" : "Hold"}
              </Text>
            )}
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SimulatorScreen;
