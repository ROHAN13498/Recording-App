import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { SignUp } from "@/components/Signup";
import { SignIn } from "@/components/Signin";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      } else if (data.session) {
        router.push("/welcome");
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const toggleSignUp = () => setIsSignUp(!isSignUp);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Checking authentication...</Text>
      </View>
    );
  }

  return isSignUp ? 
    <SignUp onToggleSignUp={toggleSignUp} /> : 
    <SignIn onToggleSignUp={toggleSignUp} />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
});

export default Auth;