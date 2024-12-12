import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";

interface SignInProps {
  onToggleSignUp: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ onToggleSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (username && password) {
      try {
        const { data, error } = await supabase
          .from("usernames")
          .select("userid")
          .eq("username", username);

        if (error) {
          console.error("Error fetching user data:", error);
          Alert.alert("Error", "An error occurred. Please try again.");
          return;
        }

        if (data.length === 0) {
          Alert.alert("Error", "Username not found.");
          return;
        }

        // Get the email using the user's ID
        const userId = data[0].userid;
        const { data: userData, error: userError } =
          await supabase.auth.admin.getUserById(userId);

        if (userError) {
          console.error("Error fetching user email:", userError);
          Alert.alert("Error", "An error occurred. Please try again.");
          return;
        }

        const email = userData.user.email;
        if (!email) {
          return;
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          console.error("Sign-in error:", signInError);
          Alert.alert("Error", "Invalid email or password.");
          return;
        }
        router.push("/audio");
        Alert.alert("Sign In", `Welcome, ${username}!`);
      } catch (error) {
        console.error("Unexpected error:", error);
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } else {
      Alert.alert("Error", "Please enter both username and password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
      <Pressable onPress={onToggleSignUp}>
        <Text style={styles.toggleText}>
          Don't have an account? Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleText: {
    marginTop: 15,
    color: "#007BFF",
    fontSize: 14,
  },
});