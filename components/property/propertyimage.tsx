import { View} from 'react-native'
import React from 'react'
import ImageWithSquircle from '../image-with-squircle'
import { WIDTH } from '~/core/utils/layout'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import Text from '../text'


type Props={
    imageUrl:string ;
    rating?:number;
    isFavorite?:boolean;
}


const Propertyimage = ({imageUrl, rating=5, isFavorite=false}:Props) => {
  return (
    <View className='relative'>

        <View className='flex flex-row items-center justify-center'>
        <ImageWithSquircle image={imageUrl} width={WIDTH - 40}/>
        </View>

        <BlurView className='absolute bottom-8 flex flex-row items-center gap-2 left-8 p-2 rounded-xl overflow-hidden'>
            <Ionicons name="star" size={24} color={"#facc15"} />


            <Text variant="body" className='text-center text-white'>
                {rating}
                </Text>
        </BlurView>


        <BlurView className='absolute bottom-8 flex flex-row items-center gap-2 right-8 p-2 rounded-xl overflow-hidden'>
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={"white"} />


            
        </BlurView>
      
    </View>
  )
}

export default Propertyimage