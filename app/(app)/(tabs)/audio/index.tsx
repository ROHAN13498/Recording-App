import AudioList from "@/components/AudioList";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
    async function handleLogout() {
        await supabase.auth.signOut();
        router.push("/")
    }
    useEffect(()=>{
      const checkUserAuthentication = async () => {
        const { data, error } = await supabase.auth.getSession();
      
        if (error) {
          console.error("Error fetching session:", error);
          return false;
        }
      
        if (data.session) {
          console.log("User is authenticated:", data.session.user);
          return true;
        } else {
          console.log("User is not authenticated");
          return false;
        }
      };
      checkUserAuthentication()
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.audioLibraryContainer}>
                <Text style={styles.audioLibrary}>Audio Library</Text>
                <Pressable style={styles.addButtoncontainer}>
                    <Text
                        style={styles.addButton}
                        onPress={() => {
                            router.push("/audio/record");
                        }}
                    >
                        +
                    </Text>
                </Pressable>
            </View>
            <Button title="Logout" onPress={handleLogout} />
            <AudioList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        padding: 10,
    },
    audioLibraryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },
    audioLibrary: {
        fontSize: 32,
    },
    addButtoncontainer: {
        backgroundColor: "#00439C",
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    addButton: {
        fontSize: 35,
        color: "white",
    },
});
