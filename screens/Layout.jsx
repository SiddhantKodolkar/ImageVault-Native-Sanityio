import { TouchableOpacity, Image } from "react-native";
import React from "react";
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";

const Layout = ({data,screen}) => {
  return (
    <MasonryList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <CardItem data={item} screen={screen}/>}
      // refreshing={isLoadingNext}
    />
  );
};
const CardItem=({data,screen})=>{
    const navigation=useNavigation();
    const handleClick=()=>{
        navigation.navigate(screen,{param:data._id})
        // parameter will specify which item it has to move to which is indicated by the data.id
        // each item will have a different id
    }
    return (
      <TouchableOpacity 
      onPress={handleClick}
      style={{height:Math.round(Math.random()*100+200)}} className="m-1 rounded-md relative overflow-hidden">
        <Image 
        className="w-full h-full object-cover"
        source={{
          uri:urlFor(data.image).url()
        }}/>
      </TouchableOpacity>
    )
}


export default Layout;
