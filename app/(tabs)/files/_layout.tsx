import BackButton from "@/components/BackButton";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Your Documents",
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="preview"
        options={{
          headerTitle: "Your Documents",
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
          headerLeft:BackButton
        }}
      />
    </Stack>
  );
};

export default _layout;
