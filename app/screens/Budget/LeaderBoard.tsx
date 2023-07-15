import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

interface LeaderboardProps {
  data: {
    name: string;
    score: number;
  }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  const chartData = data.map(item => item.score);
  const chartLabels = data.map(item => item.name);

  const maxScore = Math.max(...chartData);
  const maxScoreIndex = chartData.indexOf(maxScore);
  const highestScorePerson = chartLabels[maxScoreIndex];

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    fillShadowGradient: '#90CAF9',
    color: (opacity = 1) => `rgba(51, 153, 102, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
  };

  return (
    <View style={styles.container}>
        <View style={styles.superContainer}>
      <BarChart
        data={{
          labels: chartLabels,
          datasets: [{ data: chartData }],
        }}
        width={300}
        height={300}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        yAxisLabel=""
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
      <Text style={styles.highestScoreText}>{`Highest Score: ${highestScorePerson}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    superContainer: {
        backgroundColor: 'rgba(51, 153, 102)',
        marginVertical: 3,
        marginHorizontal:0,
        paddingVertical: 16,
        paddingHorizontal:5,
        borderRadius: 8,
        paddingTop:10
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Leaderboard;
