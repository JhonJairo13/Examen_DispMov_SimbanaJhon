import { Tabs } from 'expo-router'
import { View, Text } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function _layout() {
  return (

    <Tabs>
        <Tabs.Screen
        name='index'
        options={{
            title: 'Inicio',
            tabBarIcon:({color}) => (<Entypo name="chat" size={24} color={color} />),
        }}
        />

        <Tabs.Screen
        name='about'
        options={{
            title: 'About',
            tabBarIcon:({color}) => (<Entypo name="check" size={24} color={color} />),
        }}
        />

        <Tabs.Screen
        name='grafico'
        options={{
            title: 'grafico',
            tabBarIcon:({ color }) => (<AntDesign name="barschart" size={24} color={color} />
            ),
          }}
        />


    </Tabs>
      
    
  )
}