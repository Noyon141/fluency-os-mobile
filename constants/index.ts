import { default as onboarding1 } from "@/assets/images/onboarding1.png";
import { default as onboarding2 } from "@/assets/images/onboarding2.png";
import { default as onboarding3 } from "@/assets/images/onboarding3.png";

const images = { onboarding1, onboarding2, onboarding3 };

export const onboarding = [
  {
    id: 1,
    title: "Stuck for Words?",
    description:
      "Stop guessing. Start speaking. Overcome hesitation instantly.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Real-Time Practice",
    description: "Speak naturally and get instant, AI-driven feedback.",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Speak with Confidence",
    description: "Master your fluency. Own every conversation.",
    image: images.onboarding3,
  },
];
