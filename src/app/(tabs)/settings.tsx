import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";

export default function Setttings() {
  const router = useRouter();
  const { session } = useAuth();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/welcome");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Text style={styles.email}>{session?.user?.email}</Text>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 24,
    paddingTop: 60,
  },
  title: { color: "#fff", fontSize: 26, fontWeight: "800", marginBottom: 8 },
  email: { color: "#9CA3AF", fontSize: 14, marginBottom: 40 },
  signOutButton: {
    backgroundColor: "#334155",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  signOutText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
