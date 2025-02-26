import { View, Text, Image, Linking} from 'react-native'
import React from 'react'
import UserAvatar from '@/components/UserAvatar'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function TabAbout() {
  return (
    <View className='flex-1 '>
        <UserAvatar name='@JhonJairo13' urlAvatar='https://blog.rocketseat.com.br/content/images/size/w1000/2024/02/native.png'/>
        <Text className='text-4xl font-bold ml-4 mt-4'> 
           Sobre Mi 
        </Text>
        <Text className='text-xs text-justify font-bold mx-4'> 
        Jhon es una persona apasionada por la tecnología y el desarrollo de software, siempre en busca de nuevos retos que lo ayuden a mejorar sus habilidades. Con un interés particular en arquitecturas distribuidas y aplicaciones móviles, ha explorado diversas tecnologías como Docker, Kubernetes y Apache Kafka, además de trabajar con bases de datos distribuidas como MongoDB, Cassandra y DynamoDB. Su enfoque no solo es teórico, sino también práctico, lo que lo ha llevado a desarrollar proyectos innovadores que combinan eficiencia y escalabilidad.
        </Text>
        <Text className='text-4xl font-bold ml-4 mt-4'> 
           Contacto  
        </Text>
        <View>
          <View className='flex flex-row items-center ml-4 mt-4'>
          <Ionicons name="logo-github" size={24} color="black" />
           <Text className='ml-2 color-blue-500 font-bold underline'
            onPress={(e)=> {e.preventDefault()
              Linking.openURL("https://github.com/JhonJairo13")}} 
           >@JhonJairo13
           </Text>
          </View>
          <View className='flex flex-row items-center ml-4 mt-4 '>
          <Ionicons name="logo-linkedin" size={24} color="blue" />
          <Text className='ml-2 color-blue-500 font-bold underline'
            onPress={(e)=> {e.preventDefault()
              Linking.openURL("https://linkedin.com/in/jhon-simba%C3%B1a-b53b6a213/")}} 
           >@JhonJairo13
           </Text>
          </View>
        </View>
    </View>
  )
}