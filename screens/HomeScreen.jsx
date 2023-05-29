import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator,Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Layout from "./Layout";
import { getCategory } from "../sanity";

const HomeScreen = () => {
  const [categories, setCategories] = useState(null)

  useEffect(()=>{
    getCategory()
    .then((data)=>setCategories(data))
    .catch((err)=>alert(err))

  },[])
  
  return (
    <View className="flex-1 items-center justify-center bg-[#04020d] relative">
      <SafeAreaView className="w-full h-full flex items-center justify-start gap-4">
        <View className="w-full px-6 items-center flex-row justify-between">
          <Text className="text-2xl text-white font-bold">Wallpapers</Text>
        </View>
        <ScrollView className="w-full h-full ">
        {categories?(
        <Layout data={categories} screen="Items"/>
        ):(
        <ActivityIndicator size="large"></ActivityIndicator>)
        }
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
