import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";
import { apiClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define your expected data type here

type TestType = "TOEFL" | "IELTS" | "OET";
type Status = "COMPLETED" | "FAILED";

interface HomeData {
  id: string;
  testType: TestType; // Changed from array to a single string
  status: Status; // Changed from array to a single string
  completedAt: string | null; // Dates come back as strings from API
  startedAt: string;
}

interface ApiResponse {
  data?: HomeData[];
  message?: string;
}

const HomeTab = () => {
  const { data: session } = authClient.useSession();

  // Template for TanStack Query HTTP GET request via apiClient
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["home-data"],
    queryFn: async () => {
      // Make sure your backend route strictly matches this endpoint
      const response = await apiClient.get<ApiResponse>("/api/tests/history");

      // Your backend wraps the array in an object like: { data: [...] }
      return response.data.data || [];
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerClassName="p-5 gap-6"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {/* Header Section */}
        <View className="flex-col gap-1">
          <Text className="text-2xl font-bold text-foreground">
            Welcome{session?.user?.name ? `, ${session.user.name}` : ""}
          </Text>
          <Text className="text-sm text-muted-foreground">
            Here is your daily overview.
          </Text>
        </View>

        {/* Async State Management */}
        {isLoading ? (
          // Loading State
          <View className="items-center justify-center p-12">
            <ActivityIndicator size="large" />
            <Text className="mt-4 text-muted-foreground text-sm">
              Loading data...
            </Text>
          </View>
        ) : isError ? (
          // Error State
          <View className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
            <Text className="text-destructive font-semibold">
              Failed to load data
            </Text>
            <Text className="text-sm mt-1 text-destructive/80">
              {error instanceof Error
                ? error.message
                : "An unknown error occurred"}
            </Text>
          </View>
        ) : (
          // Success State - Map real data here
          <View className="gap-4">
            {/* TODO: Replace this comment block with your real data mapping */}

            {data?.length === 0 ? (
              <Text className="text-muted-foreground">
                No test history found.
              </Text>
            ) : (
              data?.map((item) => (
                <View
                  key={item.id}
                  className="bg-card p-4 rounded-xl border border-border shadow-sm flex-row justify-between items-center"
                >
                  <View className="flex-col gap-1">
                    <Text className="text-lg font-semibold text-card-foreground">
                      {item.testType}
                    </Text>
                    <Text className="text-sm text-muted-foreground">
                      {item.startedAt
                        ? new Date(item.startedAt).toLocaleDateString()
                        : "Unknown date"}
                    </Text>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      item.status === "COMPLETED"
                        ? "bg-green-500/10 border border-green-500/20"
                        : "bg-destructive/10 border border-destructive/20"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        item.status === "COMPLETED"
                          ? "text-green-600 dark:text-green-400"
                          : "text-destructive"
                      }`}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTab;
