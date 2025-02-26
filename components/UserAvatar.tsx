import { View, Text, Image } from 'react-native'
import React from 'react'

interface UserAvatarProps{
  name:string
  urlAvatar: string
}

export default function UserAvatar (
  {name,urlAvatar}: UserAvatarProps
) {
  return (
    <View className='flex justify-center items-center mt-3' >
        <Image 
            source={{uri:urlAvatar}}  //otra forma que es para cuando queremos de la web la imagen uri:'https://reactnative.dev/img/tiny_logo_png'
            className='w-20 h-20 rounded-full'   
        />
        <Text className='text-2xl'>{name}</Text>
    
    </View>
  )
}