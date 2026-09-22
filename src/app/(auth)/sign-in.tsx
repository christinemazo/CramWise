import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    if (!email || !password) {
      Alert.alert("Missing info", "Enter an email and password.");
      return;
    }
    signIn(email);
    router.replace("/");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace("/")
        }
      >
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.panel}>
        <Text style={styles.eyebrow}>Welcome back</Text>
        <Text style={styles.title}>Sign in</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#7A869A"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#7A869A"
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <Link href="/sign-up" style={styles.link}>
          <Text style={styles.linkText}>Don&apos;t have an account? Sign up</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#EDF4FF",
  },
  panel: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 28,
    shadowColor: "#183B7A",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    alignSelf: "center",
  },
  closeButton: {
    position: "absolute",
    top: 56,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: { fontSize: 20, color: "#3A4A61", fontWeight: "700" },
  eyebrow: {
    color: "#2557D6",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 20,
    color: "#101828",
    letterSpacing: -0.6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D9E2F2",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
    backgroundColor: "#F8FAFF",
    fontSize: 16,
    color: "#0F172A",
  },
  button: {
    backgroundColor: "#2557D6",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  link: { marginTop: 18, alignItems: "center" },
  linkText: { color: "#475569", fontSize: 15 },
});
