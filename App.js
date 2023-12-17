import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Linking } from 'react-native';
import * as Location from 'expo-location';

const App = () => {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } else {
        console.log('Permission to access location was denied');
      }
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  const sendLocation = () => {
    try {
      if (location) {
        const { coords } = location;
        const tweet = `latitude is ${coords.latitude} and longitude is ${coords.longitude}`;
        const url = `https://twitter.com/intent/tweet?text=${tweet}`;
        Linking.openURL(url);
      }
    } catch (error) {
      console.log('Error sending location:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <View style={{ marginTop: 10, padding: 10, borderRadius: 10, width: '40%' }}>
        <Button title="Get Location" onPress={getLocation} />
      </View>
      {location && (
        <View>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </View>
      )}
      <View style={{ marginTop: 10, padding: 10, borderRadius: 10, width: '40%' }}>
        <Button title="Send Location" onPress={sendLocation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;