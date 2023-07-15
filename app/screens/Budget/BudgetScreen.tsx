import { Pedometer } from "expo-sensors";

import React, { useState, useEffect } from "react";
import { ScrollView, FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Button } from "components";
import { t } from "utils";
import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";

import styles from "./BudgetScreen.styles";
import { NumberOfDaysVegetarian, ProgressChart } from "./components";
import { selectors } from "./ducks";
import navigationOptions from "./BudgetScreen.navigationOptions";

import axios from "axios";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Leaderboard from "./LeaderBoard";



const BudgetScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);

  const monthlyCarbonBudget = useSelector(selectors.getMonthlyCarbonBudget);

  const foodCurrentMonthEmissions = useSelector(selectors.getCurrentMonthFoodCarbonValue);
  const mealCurrentMonthEmissions = useSelector(selectors.getCurrentMonthMealCarbonValue);
  const transportCurrentMonthEmissions = useSelector(selectors.getCurrentMonthTransportCarbonValue);
  const streamingCurrentMonthEmissions = useSelector(selectors.getCurrentMonthStreamingCarbonValue);
  const purchaseCurrentMonthEmissions = useSelector(selectors.getCurrentMonthPurchaseCarbonValue);
  const fashionCurrentMonthEmissions = useSelector(selectors.getCurrentMonthFashionCarbonValue);
  const electricityCurrentMonthEmissions = useSelector(
    selectors.getCurrentMonthElectricityCarbonValue
  );
  const productScannedCurrentMonthEmissions = useSelector(
    selectors.getCurrentMonthProductScannedCarbonValue
  );
  const customCurrentMonthEmissions = useSelector(selectors.getCurrentMonthCustomCarbonValue);
  const totalCurrentMonthEmissions = useSelector(selectors.getCurrentMonthAllCarbonValue);

  const foodCurrentYearEmissions = useSelector(selectors.getCurrentYearFoodCarbonValue);
  const mealCurrentYearEmissions = useSelector(selectors.getCurrentYearMealCarbonValue);
  const transportCurrentYearEmissions = useSelector(selectors.getCurrentYearTransportCarbonValue);
  const streamingCurrentYearEmissions = useSelector(selectors.getCurrentYearStreamingCarbonValue);
  const purchaseCurrentYearEmissions = useSelector(selectors.getCurrentYearPurchaseCarbonValue);
  const fashionCurrentYearEmissions = useSelector(selectors.getCurrentYearFashionCarbonValue);
  const electricityCurrentYearEmissions = useSelector(
    selectors.getCurrentYearElectricityCarbonValue
  );
  const productScannedCurrentYearEmissions = useSelector(
    selectors.getCurrentYearProductScannedCarbonValue
  );
  const customCurrentYearEmissions = useSelector(selectors.getCurrentYearCustomCarbonValue);
  const totalCurrentYearEmissions = useSelector(selectors.getCurrentYearAllCarbonValue);
  const [stepCount, setStepCount] = useState(0);
  const [coins, setCoins] = useState(0);
  const [couponCount, setCouponCount] = useState(0);

  const [click, clicked] = useState(true);

  const fetchCoins = async () => {
    // let result  = await axios.get("https://v1.nocodeapi.com/harshmr/fit/rneUryXiRdGlqISd/aggregatesDatasets?dataTypeName=steps_count")
    // console.log(result.data.steps_count[0].value );
    // setStepCount(result.data.steps_count[0].value);
    let user;
    AsyncStorage.getItem("userName")
      .then((res) => {
        console.log("res", res);
        user = res;
        axios
          .post("http://10.1.156.61:8000/api/user/getcoins/", {
            username: user,
          })
          .then((res) => {
            console.log(res.data.coins);
            setCoins(res.data.coins);
            axios
              .post("http://10.1.156.61:8000/api/user/getcoupons/", {
                username: user,
              })
              .then((res) => {
                console.log(res.data);
                setCouponCount(res.data.coupons.length);
              })
              .catch((err) => {
                console.log(err);
              });
            // setCompleted(true);
          })
          .catch((err) => {
            console.log(err);
          });
        // console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const getLeaderboard = async () => {
    let userArray = await axios.get("http://10.1.156.61:8000/api/user/getleaderboard/");
    console.log(userArray[0].data.username);
  }


  useEffect(() => {
    fetchCoins();
  }, [couponCount]);

  useEffect(()=> {
    getLeaderboard();
  })

  const [signInHistory, setSignInHistory] = useState([]);
  const [today, setToday] = useState("");


  const signInHistory1 = [
  
    { day: 'Wed', signedIn: true, consecutiveDays: 3 },
    { day: 'Thu', signedIn: false, consecutiveDays: 0 },
    { day: 'Fri', signedIn: true, consecutiveDays: 1 },
    { day: 'Sat', signedIn: true, consecutiveDays: 2 },
    { day: 'Sun', signedIn: false, consecutiveDays: 0 },
  ];
  

  useEffect(() => {
    updateSignInHistory();
  }, []);

  var leaderboardData = [
    { name: "Harsh", score: 100 },
    { name: "Piyush", score: 80 },
    { name: "Tong", score: 70 },
    { name: "Johannes", score: 90 },
  ];

  var challenges = [
    { name: "Walk challenge 🏃‍♂️", term: 1000 },
    // { name: "Use Public Transport 🚌", term: ['Bus','Train','Metro'] },
    // { name: "Plant a tree 🌳", term: ['Plant','Tree','Sapling'] },
    // { name: "Eat Fruits", term: ['fruits'] }
  ];

  var randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];

  let props = randomChallenge;

  // Display the selected challenge
  console.log("Challenge: " + randomChallenge.name);
  console.log("Accepted Term: " + randomChallenge.term);

  const getCurrentDate = () => {
    const today1 = new Date();
    console.log("Todays Day" + today1);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDay = days[today1.getDay()];
    setToday(currentDay);
    return currentDay;
  };

  const updateSignInHistory = () => {
    const currentDate = getCurrentDate();
    const updatedHistory = [...signInHistory];
    const todaySignIn = {
      day: currentDate,
      signedIn: true,
      consecutiveDays: 0,
    };

    if (updatedHistory.length > 0) {
      const lastDay = updatedHistory[0].day;

      if (currentDate === lastDay) {
        todaySignIn.consecutiveDays = updatedHistory[0].consecutiveDays + 1;
      }
    }

    updatedHistory.unshift(todaySignIn);
    setSignInHistory(updatedHistory.slice(0, 7)); // Keep only the last 5 days
  };

  const handleCheckIn = () => {
    const updatedHistory = signInHistory.map((item) => {
      if (item.day === today && !item.signedIn) {
        return { ...item, signedIn: true };
      }
      return item;
    });

    setSignInHistory(updatedHistory);
  };


  const renderSignInStatus = (signedIn, consecutiveDays) => {
    let containerStyle = styleDailyCheckin.crossContainer;
    let textContent = '✖';
  
    if (signedIn) {
      containerStyle = styleDailyCheckin.tickContainer;
      textContent = '✔';
    }
  
    return (
      <View>

      <View style={[styleDailyCheckin.statusContainer, containerStyle]}>
        <Text style={styleDailyCheckin.statusText}>{textContent}</Text>
        
      </View>
      { (
         <View >
          <Text style={styleDailyCheckin.checkInPoints}>{consecutiveDays} ⭐</Text>
  
        </View>
        )}
      </View>
    );
  };
  
  return (
    <ScrollView style={styles.container}>
       <View style={styleDailyCheckin.superContainer}>
        <Text style={styleDailyCheckin.Daily}>Daily Check-in 📅</Text>
        <View style={styleDailyCheckin.container}>
          {signInHistory1.slice(0, 5).map((item, index) => (
            <View key={index} style={styleDailyCheckin.dayContainer}>
            <View  style={style.container}>
  
            {renderSignInStatus(item.signedIn, item.consecutiveDays)}
          </View>
          </View>
          ))}
          
        </View>
        {signInHistory.length > 0 && (
          <Text style={styleDailyCheckin.finalStreak}>
            Current Streak: {signInHistory[0].consecutiveDays} 
          </Text>
        )}
        {click && <TouchableOpacity
            style={style.button}
            onPress={() => {
              updateSignInHistory();
              clicked(false);
              alert("User Checked In")
            }}
          >
            <Text style={style.buttonText}>Check-In Now</Text>

          </TouchableOpacity>}
      </View>

      <View style={[style.cardContainer, { backgroundColor: "#rgba(51, 153, 102, 0.7)" }]}>
        <Text style={style.cardTitle}>Daily Challenge</Text>
        <View style={style.cardDivider} />
        <View style={style.container}>
          <Text style={style.challengeText}>{randomChallenge.name}</Text>
          <TouchableOpacity
            style={style.button}
            // onPress={() => {navigator.openChallenges()(props={randomChallenge})}}
            onPress={() => {
              console.log("props", props);
              navigation.navigate("Challenge", {
                screen: "Challenge",
                params: props,
              });
            }}
          >
            <Text style={style.buttonText}>Accept Challenge</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[{ display: "flex", flexDirection: "row" }]}>
        <View
          style={[
            style.cardContainer,
            { backgroundColor: "#rgba(51, 153, 102, 0.7)", width: "48%", marginRight: "1.52%" },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("props", props);
              navigation.navigate("Marketplace", {
                screen: "Marketplace",
                params: props,
              });
            }}
          >
            <View style={style.cardDivider} />
            <View style={style.container}>
              <Text style={style.challengeText}>Coin Balance 🪙</Text>
              <Text style={[{ fontSize: 50 }]}>{coins}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            style.cardContainer,
            { backgroundColor: "#rgba(51, 153, 102, 0.7)", width: "48%", marginLeft: "1.6%" },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("props", props);
              navigation.navigate("Coupons", {
                screen: "Coupons",
                params: props,
              });
            }}
          >
            <View style={style.cardDivider} />
            <View style={style.container}>
              <Text style={style.challengeText}>All Coupons 🏷️</Text>

              <Text style={[{ fontSize: 50 }]}>{couponCount}</Text>

              {/* <TouchableOpacity style={style.button} 
        // onPress={() => {navigator.openChallenges()(props={randomChallenge})}}
        onPress={() => {
          console.log('props',props);
          navigation.navigate("Challenge", {
            screen: "Challenge",
            params: props,
          });
        }}
        >
          <Text style={style.buttonText}>Accept Challeng</Text>
        </TouchableOpacity> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Text style={{ fontSize: 20, color: "red", textAlign: "center" }}>{stepCount}</Text> */}
      <ProgressChart
        isMonth
        totalEmissions={totalCurrentMonthEmissions}
        foodEmissions={foodCurrentMonthEmissions}
        mealEmissions={mealCurrentMonthEmissions}
        transportEmissions={transportCurrentMonthEmissions}
        streamingEmissions={streamingCurrentMonthEmissions}
        purchaseEmissions={purchaseCurrentMonthEmissions}
        fashionEmissions={fashionCurrentMonthEmissions}
        electricityEmissions={electricityCurrentMonthEmissions}
        productScannedEmissions={productScannedCurrentMonthEmissions}
        customEmissions={customCurrentMonthEmissions}
        monthlyEmissionsBudget={monthlyCarbonBudget}
      />
      <Button.Primary
        icon={"calendar"}
        style={styles.monthlyBudgetButton}
        fullWidth
        text={t("BUDGET_SCREEN_SET_MONTHLY_BUDGET")}
        onPress={() => navigator.openMontlyBudget()}
      />
      <NumberOfDaysVegetarian />
      <ProgressChart
        totalEmissions={totalCurrentYearEmissions}
        foodEmissions={foodCurrentYearEmissions}
        mealEmissions={mealCurrentYearEmissions}
        transportEmissions={transportCurrentYearEmissions}
        streamingEmissions={streamingCurrentYearEmissions}
        purchaseEmissions={purchaseCurrentYearEmissions}
        fashionEmissions={fashionCurrentYearEmissions}
        electricityEmissions={electricityCurrentYearEmissions}
        productScannedEmissions={productScannedCurrentYearEmissions}
        customEmissions={customCurrentYearEmissions}
        monthlyEmissionsBudget={monthlyCarbonBudget}
      />
      <View style={style.containers}>
        
        <Leaderboard data={leaderboardData} />
      </View>
    </ScrollView>
  );
};

BudgetScreen.navigationOptions = navigationOptions();

const style = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    padding: 16,
    paddingVertical: 24,
    marginHorizontal: 0,
    // marginTop: 16,
    elevation: 3,
    marginTop: 6,
    paddingTop: 10,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: "bold",

    textAlign: "center",
    textAlignVertical: "center",
    padding: 5,
    fontFamily: "Roboto",
    color: "#ffffff",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#cccccc",
    marginBottom: 16,
  },
  container: {
    alignItems: "center",
    
  },
  containers: {
    backgroundColor: "light-green",
    paddingBottom: 14,
    borderRadius: 14,
    borderColor: "rgba(51, 153, 102, 0.7)",
    borderWidth: 2,
    marginVertical: 24,
    paddingTop: 10,
    marginHorizontal: 2,
    flex: 1,
  },
  challengeText: {
    marginBottom: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const styleDailyCheckin = StyleSheet.create({
  superContainer: {
    backgroundColor: "rgba(51, 153, 102, 0.7)",
    marginVertical: 3,
    marginHorizontal: 0,
    paddingVertical: 16,
    paddingHorizontal: 5,
    borderRadius: 8,
    paddingTop: 10,
  },
  Daily: {
    textAlign: "center",
    textAlignVertical: "center",
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#ffffff",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayContainer: {
    alignItems: "center",
  },
  day: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tickContainer: {
    backgroundColor: "rgba(51, 153, 102, 0.7)",
  },
  crossContainer: {
    backgroundColor: "rgba(255, 51, 51, 0.7)",
  },
  statusContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 24,
    color: "#ffffff",
  },
  checkInPoints: {
    fontSize: 18,
    marginTop: 4,
    color: "#ffffff",
    fontFamily: "Roboto",
  },
  streak: {
    fontSize: 14,
    color: "#888888",
    marginTop: 4,
    fontFamily: "Roboto",
    textAlign: "center",
  },
  finalStreak: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
});

export default BudgetScreen;
