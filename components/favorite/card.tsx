import { View } from 'react-native';
import React from 'react';
import Text from '../text';
import Image from '../image';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  property: Property;
};

const Card = ({ property }: Props) => {
  return (
    <View className="flex-1 p-2">
      <Image source={property.images[0]} />


      <BlurView
          className='absolute bottom-4 right-4 p-2 rounded-xl overflow-hidden'
            intensity={80}
            tint='light'
      >

        <Ionicons name={property.is_favorite ? 'heart' : 'heart-outline'} size={24} color="white" />

      </BlurView>
    </View>
  );
};

export default Card;
