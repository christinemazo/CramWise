import React from "react";
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
    title: "Programming",
    score: 88,
    icon: "code-slash-outline" as const,
  },
];

export default function Progress() {
  const averageScore = 85;

  return (
    
      {/* Header */}
      
        
          Progress
          Track your quiz results
        

        
          
        
      

      {/* Overall Progress */}
      
        
          
            Overall Progress
            
              Keep improving your scores
            
          

          85%
        

        
          
        

        
          Overall Score
          85 / 100
        
      

      {/* Recent Quizzes */}
      
        
          Recent Quizzes
          Your latest quiz results
        

        
          See All
        
      

      
        {quizzes.map((item) => (
          
            
              
            

            
              {item.title}

              
                
                {item.date}
              
            

            
              {item.score}%
              
            
          
        ))}
      

      {/* Best Scores */}
      
        
          
            
          

          
            Best Scores
            
              Your highest score for each subject
            
          
        
      

      
        {bestScores.map((item, index) => (
          
            
              {index + 1}
            

            
              
            

            
              {item.title}
              Highest Score
            

            
              {item.score}%
            
          
        ))}
      

      {/* Motivation / Score Message */}
      
        🏆

        
          Your quiz scores will show up here
        

        
          Once you complete quizzes, track your best scores and progress over
          time.
        
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1629",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 110,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#F8FAFC",
  },
  subtitle: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 2,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#17263A",
    alignItems: "center",
    justifyContent: "center",
  },
  progressCard: {
    backgroundColor: "#17263A",
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#25364D",
  },
  progressTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  progressDescription: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 3,
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
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  viewAll: {
    fontSize: 13,
    fontWeight: "700",
    color: "#208AEF",
  },
  list: {
    gap: 10,
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#17263A",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#25364D",
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#0F1629",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F8FAFC",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "#78879B",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  score: {
    fontSize: 15,
    fontWeight: "700",
    color: "#208AEF",
  },
  highScoreHeader: {
    marginTop: 28,
    marginBottom: 14,
  },
  highScoreTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  trophyBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#17263A",
    alignItems: "center",
    justifyContent: "center",
  },
  highScoreList: {
    backgroundColor: "#17263A",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#25364D",
    overflow: "hidden",
  },
  highScoreRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#25364D",
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  rankContainer: {
    width: 24,
  },
  rank: {
    fontSize: 13,
    fontWeight: "700",
    color: "#78879B",
  },
  highScoreIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#0F1629",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  highScoreInfo: {
    flex: 1,
  },
  highScoreSubject: {
    fontSize: 14,
    fontWeight: "700",
    color: "#F8FAFC",
  },
  bestLabel: {
    fontSize: 11,
    color: "#78879B",
    marginTop: 2,
  },
  scoreBadge: {
    backgroundColor: "#0F1629",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
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
    marginTop: 24,
    alignItems: "center",
  },
  emoji: {
    fontSize: 40,
    marginBottom: 16,
  },
  scoreTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  scoreBody: {
    color: "#9CA3AF",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
});