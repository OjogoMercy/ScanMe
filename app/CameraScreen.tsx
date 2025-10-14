import { Linking, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CameraView, Camera } from 'expo-camera'
import general from '@/constants/General'
import { SCREEN_HEIGHT, SCREEN_WIDTH, Sizes } from '@/constants/Theme'

const CameraScreen = () => {
  return (
    <View style={general.centered}>
      <StatusBar hidden />
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
              onBarcodeScanned={
                  
                  ({ data }) => Linking.openURL(data)}
      />
      <View style={{ height: "100%", width: "100%" }}>
        <View style={general.overlay}></View>
              <View style={styles.middleRow}>
                  <View style={styles.overlay} />
                  <View style={general.overlayCam}></View>
                  <View style={ styles.overlay} />
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