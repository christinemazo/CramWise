import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const quizzes = [
  {
    title: "Programming",
    date: "Yesterday",
    score: 78,
    icon: "code-slash-outline" as const,
  },
  {
    title: "Computer Science",
    date: "Sept 17",
    score: 96,
    icon: "desktop-outline" as const,
  },
];

const bestScores = [
  {
    title: "Programming",
    score: 88,
    icon: "code-slash-outline" as const,
  },
  {
    title: "Computer Science",
    score: 96,
    icon: "desktop-outline" as const,
  },
];

export default function Progress() {
  const averageScore = 85;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Progress</Text>
          <Text style={styles.subtitle}>Track your quiz results</Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="trending-up" size={22} color="#208AEF" />
        </View>
      </View>

      {/* Overall Progress */}
      <View style={styles.progressCard}>
        <View style={styles.progressTop}>
          <View>
            <Text style={styles.progressLabel}>Overall Progress</Text>
            <Text style={styles.progressDescription}>
              Keep improving your scores
            </Text>
          </View>

          <Text style={styles.progressPercentage}>85%</Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${averageScore}%` }]}
          />
        </View>

        <View style={styles.progressBottom}>
          <Text style={styles.progressSmallText}>Overall Score</Text>
          <Text style={styles.progressSmallText}>85 / 100</Text>
        </View>
      </View>

      {/* Recent Quizzes */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Recent Quizzes</Text>
          <Text style={styles.sectionSubtitle}>Your latest quiz results</Text>
        </View>

        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.viewAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {quizzes.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.activityCard}
            activeOpacity={0.75}
          >
            <View style={styles.iconBox}>
              <Ionicons name={item.icon} size={21} color="#208AEF" />
            </View>

            <View style={styles.activityInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>

              <View style={styles.dateRow}>
                <Ionicons name="time-outline" size={13} color="#78879B" />
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>

            <View style={styles.scoreContainer}>
              <Text style={styles.score}>{item.score}%</Text>
              <Ionicons name="chevron-forward" size={17} color="#5F6E82" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Best Scores */}
      <View style={styles.highScoreHeader}>
        <View style={styles.highScoreTitleRow}>
          <View style={styles.trophyBox}>
            <Ionicons name="trophy" size={18} color="#208AEF" />
          </View>

          <View>
            <Text style={styles.sectionTitle}>Best Scores</Text>
            <Text style={styles.sectionSubtitle}>
              Your highest score for each subject
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.highScoreList}>
        {bestScores.map((item, index) => (
          <View
            key={item.title}
            style={[
              styles.highScoreRow,
              index === bestScores.length - 1 && styles.lastRow,
            ]}
          >
            <View style={styles.rankContainer}>
              <Text style={styles.rank}>{index + 1}</Text>
            </View>

            <View style={styles.highScoreIcon}>
              <Ionicons name={item.icon} size={19} color="#208AEF" />
            </View>

            <View style={styles.highScoreInfo}>
              <Text style={styles.highScoreSubject}>{item.title}</Text>
              <Text style={styles.bestLabel}>Highest Score</Text>
            </View>

            <View style={styles.scoreBadge}>
              <Text style={styles.highScoreValue}>{item.score}%</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Score Message */}
      <View style={styles.scoreMessage}>
        <Text style={styles.emoji}>🏆</Text>

        <Text style={styles.scoreTitle}>
          Your quiz scores will show up here
        </Text>

        <Text style={styles.scoreBody}>
          Once you complete quizzes, track your best scores and progress over
          time.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1326",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 110,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 13,
    color: "#78879B",
    marginTop: 5,
  },

  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#102D52",
    alignItems: "center",
    justifyContent: "center",
  },

  progressCard: {
    backgroundColor: "#17263A",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#25364D",
    padding: 18,
    marginBottom: 30,
  },

  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  progressDescription: {
    fontSize: 12,
    color: "#78879B",
    marginTop: 5,
  },

  progressPercentage: {
    fontSize: 25,
    fontWeight: "700",
    color: "#208AEF",
  },

  progressBarBackground: {
    height: 9,
    backgroundColor: "#25364D",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 18,
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: "#208AEF",
    borderRadius: 10,
  },

  progressBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9,
  },

  progressSmallText: {
    fontSize: 11,
    color: "#78879B",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  sectionSubtitle: {
    fontSize: 11,
    color: "#78879B",
    marginTop: 4,
  },

  viewAll: {
    fontSize: 12,
    fontWeight: "600",
    color: "#208AEF",
    paddingBottom: 2,
  },

  list: {
    gap: 10,
  },

  activityCard: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#17263A",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#25364D",
    paddingHorizontal: 13,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#102D52",
    alignItems: "center",
    justifyContent: "center",
  },

  activityInfo: {
    flex: 1,
    marginLeft: 12,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 5,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  date: {
    fontSize: 11,
    color: "#78879B",
  },

  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  score: {
    fontSize: 14,
    fontWeight: "700",
    color: "#208AEF",
  },

  highScoreHeader: {
    marginTop: 30,
    marginBottom: 14,
  },

  highScoreTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  trophyBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#102D52",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  highScoreList: {
    backgroundColor: "#17263A",
    borderWidth: 1,
    borderColor: "#25364D",
    borderRadius: 17,
    overflow: "hidden",
  },

  highScoreRow: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#25364D",
  },

  lastRow: {
    borderBottomWidth: 0,
  },

  rankContainer: {
    width: 28,
    alignItems: "center",
  },

  rank: {
    fontSize: 13,
    fontWeight: "700",
    color: "#78879B",
  },

  highScoreIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: "#102D52",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },

  highScoreInfo: {
    flex: 1,
    marginLeft: 11,
  },

  highScoreSubject: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  bestLabel: {
    fontSize: 10,
    color: "#78879B",
    marginTop: 3,
  },

  scoreBadge: {
    backgroundColor: "#102D52",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  highScoreValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#208AEF",
  },

  scoreMessage: {
    backgroundColor: "#17263A",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#25364D",
    padding: 24,
    marginTop: 20,
    alignItems: "center",
  },

  emoji: {
    fontSize: 40,
    marginBottom: 16,
  },

  scoreTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },

  scoreBody: {
    color: "#9CA3AF",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
