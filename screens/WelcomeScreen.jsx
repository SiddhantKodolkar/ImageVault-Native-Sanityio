import { View, Text, Image, TouchableOpacity} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
      <View className="flex-1 items-center justify-center bg-[#04020d] relative">
        <Image
          className="w-full h-full object-cover"
          source={{
            uri: "https://th.bing.com/th/id/R.de05e942542d31cd17040582bfb55de4?rik=JdlgBYwlf93koA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f11%2fDark-Phone-Wallpaper-Full-HD.jpg&ehk=VO1An%2b%2bRgk2f8CJKtYXnc0i7R4xSq%2fYd2crPLDBTsSw%3d&risl=&pid=ImgRaw&r=0",
          }}
        />
        <SafeAreaView className="absolute z-10 inset-0 flex items-center justify-start">
          <View className="justify-start -left-16 -top-16 flex px-4">
            <Text className="text-3xl text-white font-extralight">
              ImageVault
            </Text>
            <Text className="text text-white tracking-wider font-bold">
              4K Image Bliss at Your Fingertips
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            className="w-full -bottom-72"
          >
            <View className="w-full bg-white p-4 flex-row justify-center items-center rounded-full">
              <Text className="text-center  font-bold text-black">
                Get Started
              </Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
  );
};
// https://nativepixel.sanity.studio/desk
export default WelcomeScreen;
