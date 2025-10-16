import { StatusBar, StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { CameraView, Camera } from "expo-camera";
import general from "@/constants/General";
import { SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from "@/constants/Theme";
import { useCameraPermissions } from "expo-camera";
import * as Linking from "expo-linking";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [lastScannedData, setLastScannedData] = useState(null);
  const [scanned, setScanned] = useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    if (scanned || data === lastScannedData) return;

    setScanned(true);
    setLastScannedData(data);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const scannedData = data.trim();

    try {
      const canOpenURL = await Linking.canOpenURL(scannedData);

      if (canOpenURL) {
        Alert.alert("QR Code Detected", `Open: ${scannedData}`, [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              setScanned(false);
              setLastScannedData("");
            },
          },
          {
            text: "Open",
            onPress: async () => {
              try {
                await Linking.openURL(scannedData);
              } catch (error) {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Error
                );
                Alert.alert("Error", "Unable to open the link.");
              } finally {
                setTimeout(() => {
                  setScanned(false);
                  setLastScannedData("");
                }, 2000);
              }
            },
          },
        ]);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert(
          "Invalid QR Code",
          "This QR code doesn't contain a valid link.",
          [
            {
              text: "OK",
              onPress: () => {
                setScanned(false);
                setLastScannedData("");
              },
            },
          ]
        );
      }
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Scan Error", "Failed to process QR code.");
      setScanned(false);
      setLastScannedData("");
    }
  };
  
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
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "code128", "pdf417"],
        }}
      />

      {/* Overlay */}
      <View style={{ height: "100%", width: "100%" }}>
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
};
export default CameraScreen;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "black",
    opacity: 0.5,
    width: "17%",
    height: SCREEN_HEIGHT * 0.4,
  },
  middleRow: {
    flexDirection: "row",
  },
  top: { flex: 1 },
  bottom: { flex: 1 },
});
