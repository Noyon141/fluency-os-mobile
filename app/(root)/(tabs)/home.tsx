import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";
import { apiClient } from "@/lib/axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

// Dummy data representing what would come from your Backend/API Gatekeeper
type LearnerProfile = {
  name: string;
  level: string;
  streakDays: number;
  avatarUrl: string;
};

type LessonItem = {
  id: string;
  title: string;
  type: "Pronunciation" | "Vocabulary" | "Conversation";
  duration: string;
  status: "Start" | "In Progress" | "Completed";
  points: number;
};

type DailyStats = {
  minutesPracticed: number;
  dailyGoal: number;
  fluencyScore: number;
};

const DUMMY_USER: LearnerProfile = {
  name: "Alex",
  level: "Intermediate B2",
  streakDays: 14,
  avatarUrl: "https://github.com/shadcn.png",
};

const DUMMY_STATS: DailyStats = {
  minutesPracticed: 12,
  dailyGoal: 20,
  fluencyScore: 82,
};

const DUMMY_LESSONS: LessonItem[] = [
  {
    id: "1",
    title: "Mastering the 'R' Sound",
    type: "Pronunciation",
    duration: "5 min",
    status: "Completed",
    points: 50,
  },
  {
    id: "2",
    title: "Ordering at a Cafe",
    type: "Conversation",
    duration: "10 min",
    status: "Start",
    points: 100,
  },
  {
    id: "3",
    title: "Workplace Idioms",
    type: "Vocabulary",
    duration: "8 min",
    status: "Start",
    points: 80,
  },
];

const HomeTab = () => {
  const [loading, setLoading] = useState(false);
  const [dataReconnecting, setDataReconnecting] = useState(true);
  const [userData, setUserData] = useState<any>(null); // For dynamically fetched user data
  const router = useRouter();

  const { data: session } = authClient.useSession();

  // Real API fetch
  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        if (!session?.user?.id) return;

        setDataReconnecting(true);
        const response = await apiClient.get(`/api/users/${session.user.id}`);

        if (isMounted && response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        if (isMounted) setDataReconnecting(false);
      }
    };

    if (session?.user?.id) {
      fetchUserData();
    } else {
      // Simulate fallback for lessons/stats
      const fetchDummyData = setTimeout(() => {
        if (isMounted) setDataReconnecting(false);
      }, 1500);
      return () => {
        isMounted = false;
        clearTimeout(fetchDummyData);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [session?.user?.id]);

  const onSubmit = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setLoading(false);
          Toast.success("Signed out successfully!");
          router.replace("/sign-in");
        },
        onError: () => {
          setLoading(false);
          Toast.error("Failed to sign out.");
        },
        onRequest: () => {
          setLoading(true);
        },
      },
    });
  };

  const renderSkeleton = () => (
    <View className="gap-y-4">
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-3/4 rounded-md" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-1/2 rounded-md" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-3/4 rounded-md" />
        </CardHeader>
      </Card>
    </View>
  );

  const displayUser = userData?.user || userData || DUMMY_USER;

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["top", "left", "right"]}
    >
      <ScrollView contentContainerClassName="p-5 pb-10 gap-6">
        {/* Header Section */}
        <View className="flex-row items-center justify-between">
          <View>
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="text-sm text-muted-foreground font-medium">
                Ready to practice?
              </Text>
              <Badge variant="secondary" className="px-2 py-0">
                <Text className="text-xs">
                  🔥 {displayUser.streakDays || DUMMY_USER.streakDays} Day
                  Streak
                </Text>
              </Badge>
            </View>

            {dataReconnecting ? (
              <Skeleton className="h-8 w-32 mt-1 rounded-md" />
            ) : (
              <Text className="text-2xl font-bold">{displayUser.name}</Text>
            )}

            <Text className="text-sm font-medium text-primary mt-1">
              {displayUser.level || DUMMY_USER.level}
            </Text>
          </View>
          <Avatar className="h-14 w-14" alt="User Avatar">
            <AvatarImage
              source={{
                uri:
                  displayUser.avatarUrl ||
                  displayUser.image ||
                  DUMMY_USER.avatarUrl,
              }}
            />
            <AvatarFallback>
              <Text>{(displayUser.name || "A").charAt(0)}</Text>
            </AvatarFallback>
          </Avatar>
        </View>

        <Separator />

        {/* Daily Stats Section */}
        {dataReconnecting ? (
          <View className="flex-row gap-4">
            <Skeleton className="flex-1 h-24 rounded-xl" />
            <Skeleton className="flex-1 h-24 rounded-xl" />
          </View>
        ) : (
          <View className="flex-row gap-4">
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardDescription>Daily Goal</CardDescription>
                <CardTitle className="text-2xl text-primary">
                  {DUMMY_STATS.minutesPracticed}{" "}
                  <Text className="text-sm text-muted-foreground font-normal">
                    / {DUMMY_STATS.dailyGoal} min
                  </Text>
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardDescription>Fluency Score</CardDescription>
                <CardTitle className="text-2xl text-green-500">
                  {DUMMY_STATS.fluencyScore}%
                </CardTitle>
              </CardHeader>
            </Card>
          </View>
        )}

        {/* Quick Action Button */}
        <Button className="w-full h-14 rounded-xl py-0 flex-row justify-center items-center">
          <Text className="text-lg font-bold">Start Daily Review</Text>
        </Button>

        {/* Recommended Lessons */}
        <View className="gap-3 mt-2">
          <Text className="text-xl font-semibold">Today's Lessons</Text>
          {dataReconnecting
            ? renderSkeleton()
            : DUMMY_LESSONS.map((lesson) => (
                <Card key={lesson.id} className="border-border/50">
                  <CardHeader className="flex-row items-start justify-between pb-3">
                    <View className="flex-1 pr-4">
                      <CardTitle className="text-lg mb-1">
                        {lesson.title}
                      </CardTitle>
                      <CardDescription className="font-medium">
                        {lesson.type} • {lesson.duration}
                      </CardDescription>
                    </View>
                    <Badge
                      variant={
                        lesson.status === "Completed"
                          ? "secondary"
                          : lesson.status === "In Progress"
                            ? "default"
                            : "outline"
                      }
                    >
                      <Text>{lesson.status}</Text>
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-sm text-muted-foreground font-medium">
                        +{lesson.points} XP
                      </Text>
                      {lesson.status !== "Completed" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-full px-4"
                        >
                          <Text className="text-xs font-semibold">
                            {lesson.status === "Start" ? "Begin" : "Continue"}
                          </Text>
                        </Button>
                      )}
                    </View>
                  </CardContent>
                </Card>
              ))}
        </View>

        {/* User Actions */}
        <View className="mt-8 mb-6 gap-4">
          <Button
            onPress={onSubmit}
            disabled={loading}
            className="w-full rounded-xl"
            variant="destructive"
          >
            <Text>Sign out</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTab;
