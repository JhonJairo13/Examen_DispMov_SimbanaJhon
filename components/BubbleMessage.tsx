import { View, Text } from 'react-native'

interface BubbleMessageProps {
    message: string;
    type: string;
}

export default function BubbleMessage(
    { message, type }: BubbleMessageProps
) {

    return (
        <View className={`flex ${type === 'user' ? 'flex-row-reverse' : 'flex-row'} justify-start items-center  my-2  `}>
            <Text className='text-2xl'>
                {type === 'user' ? '👨‍🎓' : '🤖'}
            </Text>
            <Text className={`text-sm ${type === 'user' ? 'text-white bg-blue-500' : 'text-black bg-gray-200'} max-w-96 p-2 rounded-2xl`}>
                {message}
            </Text>
        </View>
    )
}