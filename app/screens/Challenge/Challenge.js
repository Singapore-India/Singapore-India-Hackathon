import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

const API_KEY = 'AIzaSyAd6cwX7hq6t0ytO4yqnIJiwtgMuaVuMv0';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
import navigationOptions from "./Challenge.navigationOption";

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

  const askPermissionsAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    } else {
      setPermissions(true);
    }
  };

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
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }
  };

  return (
    <View style={styles.container}>
      {permissions === false ? (
        <Button onPress={askPermissionsAsync} title="Ask permissions" />
      ) : (
        <>
          {image && <Image style={styles.image} source={{ uri: image }} />}
          {status && <Text style={styles.text}>{status}</Text>}
          <Button onPress={takePictureAsync} title="Take a Picture" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    margin: 5,
  },
});

Challenge.navigationOptions = navigationOptions;