import * as ImagePicker from 'expo-image-picker';
import React,{useEffect} from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import {  TouchableOpacity } from 'react-native';
import { useRoute } from "@react-navigation/native";

const API_KEY = 'AIzaSyAd6cwX7hq6t0ytO4yqnIJiwtgMuaVuMv0';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
import navigationOptions from "./Challenge.navigationOption";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";


async function callGoogleVisionAsync(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'LABEL_DETECTION',
            maxResults: 1,
          },
        ],
      },
    ],
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  console.log('result',result.responses);
  console.log('callGoogleVisionAsync -> result', result.responses[0].labelAnnotations);

  



  return result.responses[0].labelAnnotations[0].description;
}

export default function Challenge() {
  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [permissions, setPermissions] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const [stepCount, setStepCount] = React.useState(0);
  const [user, setUser] = React.useState(null);

  
  const route = useRoute();

  const { params } = route;
  console.log('props',params.params)

  const askPermissionsAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    } else {
      setPermissions(true);
    }
  };
  // const randomChallenge = routes;


  const takePictureAsync = async () => {
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      base64: true,
    });


    if (!cancelled) {
      setImage(uri);
      setStatus('Loading...');
      // console.log(base64);
      try {
        const result = await callGoogleVisionAsync(base64);
        console.log(result);
        setStatus(result);
        let check  = false
        for (let i = 0; i < params.params.term.length; i++) {
          if(result === params.params.term[i]){
           
            check  = true;
    
            }

        }
        if(check==true){
          axios.post("http://10.1.156.61:8000/api/user/addcoins",{
            "amount": 10,
            "username": "harsh"
          }).then((res) => {
            console.log(res);
            setCompleted(true);

          }).catch((err) => {
            console.log(err);
          });
          setCompleted(true);
        }
        
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }

    
  };
  useEffect(() => {}, [completed]);
  if(completed){
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Challenge Completed</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={{color: 'white'}}>Go to Home</Text>
        </TouchableOpacity>
      </View>)
  }

  const fetchSteps = async () => {
    let result  = await axios.get("https://v1.nocodeapi.com/harshmr/fit/rneUryXiRdGlqISd/aggregatesDatasets?dataTypeName=steps_count")
    console.log(result.data.steps_count[0].value );
    setStepCount(result.data.steps_count[0].value);
    if(result.data.steps_count[0].value >= params.params.term){
      setCompleted(true);

    }
    await AsyncStorage.getItem("userName").then((res) => {
      console.log(res);
      setUser(res);
      // console.log(user);
    });
      
  }

  

  if(params.params.name ==="Walk challenge 🏃‍♂️"){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{params.params.name}</Text>
        <Button style={styles.button } onPress={fetchSteps} title="Check Progress" />
        <Text style={styles.steps}>You have to complete : {params.params.term- stepCount} steps</Text>

        
        </View>
     
    );
         
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{params.params.name}</Text>
      {permissions === false ? (
        <Button style={styles.button} onPress={askPermissionsAsync} title="Ask permissions" />
      ) : (
        <>
          {image && <Image style={styles.image} source={{ uri: image }} />}
          {status && <Text style={styles.text }>{status}</Text>}
          <Button onPress={takePictureAsync} title="Take a Picture" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    fontSize: 30,
    marginTop: 30,
  },
  title:{
    fontSize: 50,
    marginBottom: 30,
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    margin: 5,
  },
  steps:{
    marginTop: 20,
    fontSize: 26,
  }
});

Challenge.navigationOptions = navigationOptions;
