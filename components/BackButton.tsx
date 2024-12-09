import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router, useRouter } from 'expo-router'

const BackButton = () => {
    const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  )
}

export default BackButton