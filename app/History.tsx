import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = () => {
  const [scanHistory, setScanHistory] = useState([]);

    const saveToHistory = async (scanData) => {
        const newScan = {
            id: Date.now(),
            data: scanData,
            type: 'url',
            timestamp: new Date().toISOString(),
            favorite: false
        };
        const updatedHistory = [newScan, ...scanHistory];
        setScanHistory(updatedHistory);
  
        await AsyncStorage.setItem('scanHistory', JSON.stringify(updatedHistory))

        useEffect(() => {
            loadScanhistory();
        }
            , [])
        const loadScanhistory = async () => {
            try {
                const history = await AsyncStorage.getItem('scanHistory')
                if (history) setScanHistory(JSON.parse(history))
            } catch (error) {
                console.log('error loading history ')
            }
        }
    }
  return (
    <View>
      <Text>History</Text>
    </View>
  )
}

export default History

const styles = StyleSheet.create({})