import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '@src/infrastructure/store/hooks/reduxActions'

export const ProductsScreen = () => {
    const { user } = useAppSelector((state) => state.auth)
    console.log("user", user);
    
  return (
    <View>
      <Text>ProductsScreen</Text>
    </View>
  )
}


const styles = StyleSheet.create({})