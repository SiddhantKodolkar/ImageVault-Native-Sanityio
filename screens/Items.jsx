import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getCategoryItemsById } from "../sanity";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, Ionicons } from "@expo/vector-icons";
import Layout from "./Layout";
import { useNavigation } from "@react-navigation/native";
const Items = ({ route }) => {
  const navigation = useNavigation();
  const id = route?.params.param;
  const [items, setItems] = useState(null);
  useEffect(() => {
    getCategoryItemsById(id)
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-[#04020d] relative">
      {!items ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <>
          {items ? (
            <>
              <SafeAreaView className="w-full h-full flex items-center justify-start gap-4">
                <View className="w-full px-6 items-center flex-row justify-between">
                  
                  <Text className="text-2xl text-white font-bold">
                    Wallpapers
                  </Text>
                </View>
                <ScrollView className="w-full h-full ">
                  {items ? (
                    <Layout data={items} screen="Item" />
                  ) : (
                    <ActivityIndicator size="large"></ActivityIndicator>
                  )}
                </ScrollView>
              </SafeAreaView>
            </>
          ) : (
            <Text className="text-white">No items Found</Text>
          )}
        </>
      )}
    </View>
  );
};

export default Items;
