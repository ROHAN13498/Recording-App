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

interface SignUpProps {
  onToggleSignUp: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onToggleSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (username && password) {
      const email = `${username}@gmail.com`;
      console.log(email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error(error);
        Alert.alert("Error", error.message);
        return;
      }

      await supabase.from("usernames").insert([
        { username, userid: data.user?.id },
      ]);
      
      router.push("/audio");
      Alert.alert("Sign Up", `Account created for ${username}!`);
    } else {
      Alert.alert("Error", "Please fill out all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      <Pressable onPress={onToggleSignUp}>
        <Text style={styles.toggleText}>
          Already have an account? Sign In
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