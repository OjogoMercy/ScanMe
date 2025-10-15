import {  StatusBar, StyleSheet, Text, View ,Alert} from 'react-native'
import React, { useState } from 'react'
import { CameraView, Camera } from 'expo-camera'
import general from '@/constants/General'
import { SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from '@/constants/Theme'
import { useCameraPermissions } from "expo-camera";
import * as Linking from 'expo-linking'
import * as Haptics from 'expo-haptics'

const CameraScreen = () => {
   const [hasPermission, setHasPermission] = React.useState(null);
  // const permissionStatus = Boolean(permissions?.granted)

const [scanned, setScanned] = useState(false);

React.useEffect(() => {
  (async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  })();
}, []);

const handleBarCodeScanned = async ({ data }) => {
  if (scanned) return; 

  setScanned(true);
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

  const scannedData = data.trim();
// regEx to check if the   QRcode is valid 
  const isURL = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(scannedData);

  if (isURL) {
    Alert.alert("Valid QR Code", "Opening link...");
    try {
      await Linking.openURL(scannedData);
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Error", "Unable to open the link.");
    }
  } else {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    Alert.alert(
      "Invalid QR Code",
      "This QR code doesn't contain a valid link."
    );
  }
  setTimeout(() => setScanned(false), 10000);
};

React.useEffect(() => {
  (async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  })();
}, []);

if (hasPermission === null) {
  return (
    <View style={general.centered}>
      <Text>Requesting camera permission...</Text>
    </View>
  );
}
if (hasPermission === false) {
  return (
    <View style={general.centered}>
      <Text>No access to camera</Text>
    </View>
  );
}

  return (
    <View style={general.centered}>
      <StatusBar hidden />
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarCodeScanned}
      />

      {/* Overlay */}
      <View style={{ height: '100%', width: '100%' }}>
        <View style={general.overlay}></View>
        <View style={styles.middleRow}>
          <View style={styles.overlay} />
          <View style={general.overlayCam}></View>
          <View style={styles.overlay} />
        </View>
        <View style={general.overlay}></View>
      </View>
    </View>
  );

  }
export default CameraScreen

const styles = StyleSheet.create({
  overlay: {
        backgroundColor: 'black',
    opacity:0.5,width:'15%',height: SCREEN_HEIGHT * 0.4
  },
  middleRow: {
    flexDirection: "row",
  },
  top: { flex: 1 },
  bottom: { flex: 1 },
});