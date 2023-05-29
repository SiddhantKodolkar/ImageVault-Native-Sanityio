import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,

} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { getItemById, urlFor } from "../sanity";

import * as FileSystem from "expo-file-system"
import * as Permissions from "expo-permissions"
import * as MediaLibrary from "expo-media-library"
import moment from 'moment';
// route provided by react naviagtion by default
// we can extract parameters from the route
const Item = ({ route }) => {
  const navigation = useNavigation();
  const id = route?.params?.param;
  const [item, setItem] = useState(null)
  useEffect(()=>{
    getItemById(id)
    .then((data)=>{
      setItem(data)
      console.log(data)})
    .catch((err)=>alert(err))
  },[])

  const handleDownload = async () => {
    let date = moment().format('YYYYMMDDhhmmss')
    let fileUri = FileSystem.documentDirectory + `${date}.jpg`;
    try {
        const res = await FileSystem.downloadAsync(urlFor(item?.image).url(), fileUri)
        saveFile(res.uri)
    } catch (err) {
        console.log("FS Err: ", err)
    }
}

const saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status === "granted") {
        try {
            const asset = await MediaLibrary.createAssetAsync(fileUri);
            const album = await MediaLibrary.getAlbumAsync('Pictures');
            if (album == null) {
                await MediaLibrary.createAlbumAsync('Picturesr', asset, false);
                alert('Image Saved')
            } else {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                alert('Image Saved')
            }
        } catch (err) {
            console.log("Save err: ", err)
        }
    } else if (status === "denied") {
        alert("please allow permissions to download")
    }
}

  return (
    <View className="flex-1 items-center justify-center bg-[#04020d] relative">
      {!item ? (
        <ActivityIndicator></ActivityIndicator>
        ) : item?
        (<>
          <Image
            className="w-full h-full object-cover"
            source={{
              uri: urlFor(item.image).url()
            }}
          />
          <SafeAreaView className="absolute h-full w-full">
            <TouchableOpacity
              onPress={() => navigation.navigate("Items",{
                param:item.category[0]._ref
              })}
              className="flex mt-4 px-4"
            >
              <Ionicons name="arrow-back" size={42} color="white" />
            </TouchableOpacity>
            <View className="w-full h-full relative ">
              <View className=" absolute bottom-24 inset-x-0 p-4">
                <BlurView
                  className="p-4 flex-row items-center justify-between"
                  intensity={80}
                  tint="dark"
                >
                  <View className="flex items-start justify-between gap-3">
                    <Text className="text-2xl text-white font-bold">{item?.title}</Text>
                    <Text className="text-white font-bold">{item?.description}</Text>
                  </View>
                  <TouchableOpacity onPress={handleDownload}>
                    <Ionicons
                    size={24}
                    color="white"
                    name="md-cloud-download-sharp"
                    />
                  </TouchableOpacity>
                </BlurView>
              </View>
            </View>
          </SafeAreaView>
        </>
      ):null}
    </View>
  );
};

export default Item;
