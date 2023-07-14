import { Pedometer } from "expo-sensors";

import React ,{useState,useEffect}from "react";
import { ScrollView,FlatList,View ,Text, StyleSheet, TouchableOpacity} from "react-native";
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
  
  const fetchSteps = async () => {
    // let result  = await axios.get("https://v1.nocodeapi.com/harshmr/fit/rneUryXiRdGlqISd/aggregatesDatasets?dataTypeName=steps_count")
    // console.log(result.data.steps_count[0].value );
    // setStepCount(result.data.steps_count[0].value);
  }

  useEffect(() => {
    fetchSteps();
  }, []);

  const signInHistory = [
  
    { day: 'Wed', signedIn: true, consecutiveDays: 3 },
    { day: 'Thu', signedIn: false, consecutiveDays: 0 },
    { day: 'Fri', signedIn: true, consecutiveDays: 1 },
    { day: 'Sat', signedIn: true, consecutiveDays: 2 },
    { day: 'Sun', signedIn: true, consecutiveDays: 3 },
  ];

  var challenges = [
    { name: "Walk challenge 🏃‍♂️", term: '' },
    { name: "Use Public Transport 🚌", term: ['bus','train','metro'] },
    { name: "Plant a tree 🌳", term: ['plant','tree','sapling'] },
    { name: "Eat Fruits", term: ['fruits'] }
  ];

 var randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
  

  
  // Display the selected challenge
  console.log("Challenge: " + randomChallenge.name);
  console.log("Accepted Term: " + randomChallenge.term);
  
  


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
  
      {signInHistory.map((item, index) => (
        <View key={index} style={styleDailyCheckin.dayContainer}>
          <View  style={sty.container}>

          {/* <Text style={styleDailyCheckin.day}>{item.day}</Text> */}
          {renderSignInStatus(item.signedIn, item.consecutiveDays)}
        </View>
        </View>
      ))}
    </View>

    </View>


<View style={[style.cardContainer, { backgroundColor: '#rgba(51, 153, 102, 0.7)' }]}>
      <Text style={style.cardTitle}>Daily Challenge</Text>
      <View style={style.cardDivider} />
      <View style={style.container}>
        <Text style={style.challengeText}>{randomChallenge.name}</Text>
        <TouchableOpacity style={style.button} 
        onPress={() => {navigator.openChallenges({randomChallenge})}}
        >
          <Text style={style.buttonText}>Accept Challenge</Text>
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
    marginTop:6,
    paddingTop:10
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    
    textAlign:"center",
    textAlignVertical:"center",
    padding:5,
    fontFamily:"Roboto",
    color:"#ffffff"
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#cccccc',
    marginBottom: 16,
  },
  container: {
    alignItems: 'center',
  },
  challengeText: {
    marginBottom: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


const styleDailyCheckin = StyleSheet.create({

  superContainer: {
    backgroundColor: '#E0C350',
    marginVertical: 3,
    marginHorizontal:0,
    paddingVertical: 16,
    paddingHorizontal:5,
    borderRadius: 8,
    paddingTop:10
  },
  Daily:{
    textAlign:"center",
    textAlignVertical:"center",
    padding:5,
    fontSize:20,
    fontWeight:"bold",
    fontFamily:"Roboto",
    color:"#ffffff"
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: ' #000000',
  },
  dayContainer: {
    alignItems: 'center',
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tick: {
    fontSize: 24,
    color: 'green',
  },
  cross: {
    fontSize: 24,
    color: 'red',
  },
  statusContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickContainer: {
    backgroundColor: 'rgba(51, 153, 102, 0.7)', // Greenish background
  },
  crossContainer: {
    backgroundColor: 'rgba(255, 51, 51, 0.7)', // Light red background
  },
  statusText: {
    fontSize: 24,
    color: '#ffffff',
  },
  checkInPoints: {
    fontSize: 18,
    marginTop: 4,
    color: '#ffffff',
    fontFamily: 'Roboto',
  },
  checkInPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});


const sty = StyleSheet.create({
  container: {
    backgroundColor: '#dcdcdc', // Grey background color
    padding: 14,
    borderRadius: 8,
    marginHorizontal:1,
  },
  innerContainer: {
    backgroundColor: '#00FFFF', // Inner container background
    borderRadius: 8,
    padding: 16,
  },
});




export default BudgetScreen;
