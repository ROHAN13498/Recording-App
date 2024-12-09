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
    </Stack> 
  );
};

export default _layout;
