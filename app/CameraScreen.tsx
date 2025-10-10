import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CameraView, Camera } from 'expo-camera'
import general from '@/constants/General'

const CameraScreen = () => {
  return (
    <View style={general.container}>
          <Text style={general.text}>CameraScreen</Text>
          <CameraView
              style={StyleSheet.absoluteFillObject}
              facing='back'
              onBarcodeScanned={({data}) => console.log(data)}
          />
    </View>
  )
}

export default CameraScreen

const styles = StyleSheet.create({})