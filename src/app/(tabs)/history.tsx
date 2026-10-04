import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const recentQuizzes = [
  {
    title: "Biology",
    date: "Today",
    score: 92,
    icon: "flask-outline" as const,
  },
  {
    title: "Programming",
    date: "Yesterday",
    score: 78,
    icon: "code-slash-outline" as const,
  },
  {
    title: "Mathematics",
    date: "Sept 18",
    score: 85,
    icon: "calculator-outline" as const,
  },
  {
    title: "Computer Science",
    date: "Sept 17",
    score: 96,
    icon: "desktop-outline" as const,
  },
];

const topScores = [
  {
    title: "Computer Science",
    score: 96,
    icon: "desktop-outline" as const,
  },
  {
    title: "Mathematics",
    score: 95,
    icon: "calculator-outline" as const,
  },
  {
    title: "Biology",
    score: 92,
    icon: "flask-outline" as const,
  },
  {
    title: "Programming",
    score: 88,
    icon: "code-slash-outline" as const,
  },
];

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <Text style={styles.greeting}>
          Track Your Progress
        </Text>

        <Text style={styles.title}>
          Progress
        </Text>

        {/* Overall Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>
                Overall Progress
              </Text>

              <Text style={styles.progressSubtitle}>
                Keep learning and improving!
              </Text>
            </View>

            <Text style={styles.progressScore}>
              87%
            </Text>
          </View>

          <View style={styles.progressBar}>
            <View style={styles.progressFill} />

            <View style={styles.progressRemaining} />
          </View>
        </View>

        {/* Recent Quizzes */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Recent Quizzes
          </Text>

          <Text style={styles.viewAll}>
            View all
          </Text>
        </View>

        {recentQuizzes.map((item, index) => (
          <View
            key={index}
            style={styles.quizCard}
          >
            {/* Icon */}
            <View style={styles.iconBox}>
              <Ionicons
                name={item.icon}
                size={22}
                color="#3B82F6"
              />
            </View>

            {/* Quiz Information */}
            <View style={styles.quizInfo}>
              <Text style={styles.quizTitle}>
                {item.title}
              </Text>

              <Text style={styles.quizDate}>
                Quiz • {item.date}
              </Text>

              {/* Quiz Progress */}
              <View style={styles.smallProgress}>
                <View
                  style={[
                    styles.smallProgressFill,
                    {
                      flex: item.score,
                    },
                  ]}
                />

                <View
                  style={[
                    styles.smallProgressRemaining,
                    {
                      flex: 100 - item.score,
                    },
                  ]}
                />
              </View>
            </View>

            {/* Score */}
            <Text style={styles.quizScore}>
              {item.score}%
            </Text>
          </View>
        ))}

        {/* Top Scores */}
        <Text style={styles.topScoresTitle}>
          Top Scores
        </Text>

        <View style={styles.topScoresCard}>
          {topScores.map((item, index) => (
            <View
              key={index}
              style={[
                styles.topScoreRow,
                index === topScores.length - 1 &&
                  styles.lastTopScoreRow,
              ]}
            >
              <Text style={styles.rank}>
                {index + 1}
              </Text>

              <Ionicons
                name={item.icon}
                size={20}
                color="#3B82F6"
              />

              <Text style={styles.subject}>
                {item.title}
              </Text>

              <Text style={styles.topScore}>
                {item.score}%
              </Text>
            </View>
          ))}
        </View>

        {/* Motivation */}
        <View style={styles.motivationCard}>
          <View style={styles.motivationIcon}>
            <Ionicons
              name="sparkles-outline"
              size={22}
              color="#3B82F6"
            />
          </View>

          <View style={styles.motivationText}>
            <Text style={styles.motivationTitle}>
              Keep your momentum going!
            </Text>

            <Text style={styles.motivationSubtitle}>
              Review your weaker subjects and improve
              your next scores.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  /* Main Screen */
  container: {
    flex: 1,
    backgroundColor: "#0F1629",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 110,
  },

  /* Header */
  greeting: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#F8FAFC",
    marginBottom: 22,
  },

  /* Overall Progress */
  progressCard: {
    backgroundColor: "#3B82F6",
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  progressSubtitle: {
    fontSize: 12,
    color: "#E0EAFF",
    marginTop: 5,
  },

  progressScore: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  progressBar: {
    height: 8,
    flexDirection: "row",
    backgroundColor: "#6B8EF5",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
  },

  progressFill: {
    flex: 87,
    height: "100%",
    backgroundColor: "#FFFFFF",
  },

  progressRemaining: {
    flex: 13,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  /* Recent Quizzes */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#F8FAFC",
  },

  viewAll: {
    fontSize: 13,
    fontWeight: "700",
    color: "#3B82F6",
  },

  quizCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C293C",
    borderRadius: 17,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },

  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#162A47",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  quizInfo: {
    flex: 1,
  },

  quizTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F8FAFC",
  },

  quizDate: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 3,
    marginBottom: 7,
  },

  /* Quiz Progress */
  smallProgress: {
    height: 5,
    flexDirection: "row",
    backgroundColor: "#334155",
    borderRadius: 10,
    overflow: "hidden",
  },

  smallProgressFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
  },

  smallProgressRemaining: {
    height: "100%",
    backgroundColor: "#334155",
  },

  quizScore: {
    fontSize: 14,
    fontWeight: "800",
    color: "#3B82F6",
    marginLeft: 10,
  },

  /* Top Scores */
  topScoresTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#F8FAFC",
    marginTop: 18,
    marginBottom: 12,
  },

  topScoresCard: {
    backgroundColor: "#1C293C",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#334155",
    overflow: "hidden",
  },

  topScoreRow: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },

  lastTopScoreRow: {
    borderBottomWidth: 0,
  },

  rank: {
    width: 25,
    fontSize: 12,
    fontWeight: "700",
    color: "#94A3B8",
  },

  subject: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#F8FAFC",
    marginLeft: 10,
  },

  topScore: {
    fontSize: 14,
    fontWeight: "800",
    color: "#3B82F6",
  },

  /* Motivation */
  motivationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C293C",
    borderRadius: 17,
    padding: 15,
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#334155",
  },

  motivationIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#162A47",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  motivationText: {
    flex: 1,
  },

  motivationTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#F8FAFC",
    marginBottom: 3,
  },

  motivationSubtitle: {
    fontSize: 11,
    lineHeight: 16,
    color: "#94A3B8",
  },
});