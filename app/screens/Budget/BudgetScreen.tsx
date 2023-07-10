import { Pedometer } from "expo-sensors";

import React ,{useState,useEffect}from "react";
import { ScrollView ,Text} from "react-native";
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
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("");

  // React.useEffect(() => {

  //   subscribe();
  //   console.log("StepCount",StepCount);
 
  // }, []);
 
  
 
  //  const subscribe = () => {
 
  //   const subscription = Pedometer.watchStepCount((result) => {
 
  //     SetStepCount(result.steps);
 
  //   });

  //   Pedometer.isAvailableAsync().then(

  //     (result) => {
 
  //       setIsPedometerAvailable(String(result));
 
  //     },
 
  //     (error) => {
 
  //       setIsPedometerAvailable(error);
 
  //     }
 
  //   );

  // }


  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    let subscription;

    const startStepCounting = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      if (isAvailable) {
        subscription = Pedometer.watchStepCount((result) => {
          setStepCount(result.steps);
        });
      }
    };

    startStepCounting();
    // Clean up the subscription on unmount
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);
 

  

  return (
    <ScrollView style={styles.container}>
      
      <Text style={{ fontSize: 20, color: "red", textAlign: "center" }}>
      {isPedometerAvailable}
    </Text>
    <Text style={{ fontSize: 20, color: "red", textAlign: "center" }}>{stepCount}</Text>
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

export default BudgetScreen;
