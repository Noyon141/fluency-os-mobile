import { SocialConnections } from "@/components/forms/social-connections";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  type TextInput,
  View,
} from "react-native";

export function SignInForm() {
  const passwordInputRef = React.useRef<TextInput>(null);

  const router = useRouter();
  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onSubmit() {
    // TODO: Submit form and navigate to protected screen if successful
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
    >
      <View className="gap-6">
        <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
          <CardHeader>
            <CardTitle className="text-center text-xl sm:text-left">
              Sign in to FluencyOS
            </CardTitle>
            <CardDescription className="text-center sm:text-left">
              Welcome back! Please sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-6">
            <View className="gap-6">
              <View className="gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  keyboardType="email-address"
                  autoComplete="email"
                  autoCapitalize="none"
                  onSubmitEditing={onEmailSubmitEditing}
                  returnKeyType="next"
                  submitBehavior="submit"
                />
              </View>
              <View className="gap-1.5">
                <Input
                  ref={passwordInputRef}
                  id="password"
                  placeholder="••••••••"
                  secureTextEntry
                  returnKeyType="send"
                  onSubmitEditing={onSubmit}
                />
                <View className="flex-row items-center">
                  <Label htmlFor="password">Password</Label>
                  <Button
                    variant="link"
                    size="sm"
                    className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                    onPress={() => {
                      // TODO: Navigate to forgot password screen
                    }}
                  >
                    <Text className="text-xs text-muted-foreground leading-4 -mb-1 underline ">
                      Forgot your password?
                    </Text>
                  </Button>
                </View>
              </View>
              <Button className="w-full" onPress={onSubmit}>
                <Text>Continue</Text>
              </Button>
            </View>
            <Text className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Pressable
                onPress={() => {
                  router.push("/(auth)/sign-up");
                }}
              >
                <Text className="text-sm underline underline-offset-4">
                  Sign up
                </Text>
              </Pressable>
            </Text>
            <View className="flex-row items-center">
              <Separator className="flex-1" />
              <Text className="text-muted-foreground px-4 text-sm">or</Text>
              <Separator className="flex-1" />
            </View>
            <SocialConnections />
          </CardContent>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
