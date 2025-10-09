import { StatusBar, Text, View ,Image} from "react-native";
import React from 'react';
import { Colors,Sizes,FONTS, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/Theme";
import CustomButton from "@/components/CustomButton";
import {useCameraPermission} from "expo-camera";

export default function Index() {
  const [permission, requestPermissions] = useCameraPermission();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.white,
      padding:Sizes.padding}}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <Text style={{ ...FONTS.h2, }}>Hey There!</Text>
      <Text style={{ ...FONTS.body3a, textAlign: 'center' }}>Your Files are not stable , they physically deteriorate overtime, Why not try to preserve them.</Text>
      <Image source={require('../assets/images/man.jpg')} style={{ height: SCREEN_HEIGHT * 0.7, width: SCREEN_WIDTH * 0.8 ,resizeMode:'contain'}} />
      <CustomButton title="Request Permissions" onPress={() => requestPermissions}/>
      <CustomButton title="Scan Me"/>
    </View>
  );
}
