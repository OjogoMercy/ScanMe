import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CameraView, Camera } from 'expo-camera'
import general from '@/constants/General'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/Theme'

const CameraScreen = () => {
  return (
      <View style={general.centered}>
          <StatusBar hidden/>
          <CameraView
              style={StyleSheet.absoluteFillObject}
              facing='back'
              onBarcodeScanned={({data}) => console.log(data)}
          />
          <View style={general.overlay}>
              <View style={general.overlayCam}></View>
          </View>
    </View>
  )
}

export default CameraScreen

const styles = StyleSheet.create({})