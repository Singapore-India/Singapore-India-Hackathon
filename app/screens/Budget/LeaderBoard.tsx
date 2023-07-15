import React from "react";
import { View, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";

import { Text } from "components";

interface LeaderboardProps {
  data: {
    name: string;
    score: number;
  }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  const chartData = data.map((item) => item.score);
  const chartLabels = data.map((item) => item.name);

  const maxScore = Math.max(...chartData);
  const maxScoreIndex = chartData.indexOf(maxScore);
  const highestScorePerson = chartLabels[maxScoreIndex];

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    fillShadowGradient: "#90CAF9",
    color: (opacity = 1) => `rgba(51, 153, 102, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
  };

  return (
    <View style={styles.container}>
      <View style={styles.superContainer}>
        <Text.H3 style={styles.header}>LeaderBoard</Text.H3>
        <BarChart
          data={{
            labels: chartLabels,
            datasets: [{ data: chartData }],
          }}
          width={300}
          height={300}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          yAxisLabel="Number of Coins"
          yAxisSuffix=" pts"
          fromZero
          withInnerLines={false}
          withHorizontalLabels={false}
          showBarTops={false}
          style={styles.chart}
          flatColor={true}
          showValuesOnTopOfBars={true}
          gridMin={0}
          gridMax={Math.max(...chartData) * 1.2} // Adjust multiplier to fit the chart nicely
        />
        <Text.H3 style={styles.highestScoreText}>{`Highest Score: ${highestScorePerson}`}</Text.H3>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  superContainer: {
    backgroundColor: "rgba(51, 153, 102)",
    marginVertical: 3,
    marginHorizontal: 0,
    paddingVertical: 16,
    paddingHorizontal: 5,
    borderRadius: 8,
    paddingTop: 10,
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    marginTop: 26,
    marginBottom: 20,
    flex: 1,
    alignItems: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  highestScoreText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Leaderboard;
