import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import general from '@/constants/General';

interface ScanData {
    id: number;
    data: any;
    type: string;
    timestamp: string;
    favorite: boolean;
}

const History = () => {
  const [scanHistory, setScanHistory] = useState<ScanData[]>([]);
const [history,setHistory] = useState<ScanData[]>([])
    const saveToHistory = async (scanData: any) => {
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
                console.log('error loading history ',error)
            }
        }
    }
    // actions 
    const deleteScan = async (id: any) => {
        const updatedHistory = scanHistory.filter(item => item.id !== id);
        setHistory(updatedHistory)
        await AsyncStorage.setItem('scanHistory', JSON.stringify(updatedHistory);
    }
  return (
    <View style={general.container}>
      <Text>History</Text>
    </View>
  )
}

export default History

const styles = StyleSheet.create({})