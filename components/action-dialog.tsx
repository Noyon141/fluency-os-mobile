import React from "react";

import { useActionStore } from "@/store/useActionStore";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Text } from "./ui/text";

// const executeRequest = async () => {
//   const response = await apiClient.post("/api/tests/evaluate");

//   return response.data;
// };

export const ActionDialog = () => {
  const { isOpen, setOpen } = useActionStore();

  const router = useRouter();

  // const { data, error, isPending, mutate } = useMutation({
  //   mutationFn: executeRequest,
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  //   onError: (error) => {
  //     Toast.error(error.message);
  //   },
  // });

  const handleEvaluate = () => {
    setOpen(false);
    router.replace("/(root)/simulator");
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start Evaluation</DialogTitle>
            <DialogDescription>
              Launch the simulator to begin your evaluation session.
            </DialogDescription>
          </DialogHeader>

          <View className="py-4">
            <Text className="text-muted-foreground text-sm">
              Ready to jump in? Ensure you're in a quiet environment, then click
              the button below to start.
            </Text>
          </View>

          <View className="flex-row justify-end gap-2 mt-2">
            <Button variant="outline" onPress={() => setOpen(false)}>
              <Text>Cancel</Text>
            </Button>
            <Button onPress={handleEvaluate}>
              <Text>Evaluate</Text>
            </Button>
          </View>
        </DialogContent>
      </Dialog>
    </>
  );
};
