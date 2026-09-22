import { Link, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Welcome() {
  const router = useRouter();

  function close() {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={close}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.panel}>
        <Text style={styles.brandName}>CramWise</Text>
        <Text style={styles.title}>The best way to study.</Text>
        <Text style={styles.subtitle}>Build momentum, one smart session at a time.</Text>

        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => router.push("/sign-up")}
        >
          <Text style={styles.emailButtonText}>Sign up with email</Text>
        </TouchableOpacity>

        <Link href="/sign-in" style={styles.loginLink}>
          <Text style={styles.loginText}>
            Have an account? <Text style={styles.loginBold}>Log in</Text>
          </Text>
        </Link>

        <TouchableOpacity style={styles.laterLink} onPress={close}>
          <Text style={styles.laterText}>Maybe later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  brandName: {
    fontSize: 40,
    fontWeight: "800",
    color: "#2557D6",
    letterSpacing: -0.8,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#101828",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#5B6B82",
    marginTop: 8,
    marginBottom: 28,
  },
  emailButton: {
    width: "100%",
    backgroundColor: "#2557D6",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 18,
  },
  emailButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  loginLink: { marginTop: 8, alignItems: "center" },
  loginText: { fontSize: 15, color: "#334155" },
  loginBold: { fontWeight: "700", color: "#2557D6" },
  laterLink: { marginTop: 22, alignItems: "center" },
  laterText: { fontSize: 15, color: "#64748B", fontWeight: "600" },
});
