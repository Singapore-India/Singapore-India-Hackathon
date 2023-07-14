import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();
    const carbonFacts = [
        "Planting one tree can absorb up to one ton of carbon dioxide over its lifetime.",
        "Using energy-efficient appliances can reduce carbon emissions by up to 30%.",
        "Walking or cycling instead of driving can significantly lower your carbon footprint.",
        "Reducing meat consumption can help decrease greenhouse gas emissions.",
        "Unplugging electronics when not in use can save energy and reduce carbon emissions.",
        "Renewable energy sources, like solar and wind power, produce little to no carbon emissions.",
        "Buying locally grown produce reduces transportation-related carbon emissions.",
        "Insulating your home properly can lead to significant energy savings.",
        "Using public transportation can reduce carbon emissions by more than 20 times compared to driving.",
        "Composting organic waste helps prevent the release of methane, a potent greenhouse gas.",
        "Air-drying clothes instead of using a dryer saves energy and reduces carbon emissions.",
        "Using reusable water bottles and shopping bags reduces plastic waste and carbon emissions.",
        "Eating a plant-based diet has a lower carbon footprint compared to a meat-heavy diet.",
        "Installing low-flow showerheads and faucets can save water and reduce energy consumption.",
        "Opting for virtual meetings instead of traveling reduces carbon emissions from transportation.",
        "Choosing energy-efficient lighting options, such as LED bulbs, saves electricity.",
        "Properly maintaining vehicles can improve fuel efficiency and reduce carbon emissions.",
        "Using a programmable thermostat can optimize energy usage and reduce carbon emissions.",
        "Supporting companies and organizations that prioritize sustainability helps drive change.",
        "Educating others about carbon footprint reduction can inspire collective action."
      ];
      
      // Function to get a random fact from the array
      function getRandomFact() {
        return carbonFacts[Math.floor(Math.random() * carbonFacts.length)];
      }

      const randomFact = getRandomFact();

      

    return (
      <View style={styles.container}>
 
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>

                <View style={styles.buttonDesign}>

            <Text style={styles.textSign}>I want to save the Planet 🌏</Text>
      
                </View>
            
            </TouchableOpacity>
            <Text style={[styles.tip, {color: colors.text}]}>{randomFact}</Text>
            </View>
        </View>
 
       
      </View>
    );
};

export default SplashScreen;

const {height,width} = Dimensions.get("screen");
const height_logo = height * 0.15;
const width_logo = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ffffff'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: width_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 15,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20
    
  },
  buttonDesign: {
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: '#B05EB5'
  }
  ,tip:{
    marginTop: 20,
    color: '#05375a',
      fontSize: 15,
      fontWeight: 'bold'
    
  }


});

