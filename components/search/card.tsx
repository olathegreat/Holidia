import { View,  Pressable } from 'react-native';
import ImageWithSquircle from '../image-with-squircle';
import { WIDTH } from '~/core/utils/layout';
import { Ionicons } from '@expo/vector-icons';
import Text from '../text';

type Props = {
  property: Property;
};

const Card = ({ property }: Props) => {
  return (
    <Pressable className="border-b border-gray-200 p-4">
      <View className="relative ">
        <View className="mb-4 flex overflow-hidden">
          <ImageWithSquircle width={WIDTH - 40} image={property.images[1]} />
        </View>

        <View className="absolute  top-6 right-6">
          <Ionicons name={property.is_favorite ? "heart" : "heart-outline"} size={24} color="white" />
        </View>
      </View>


      <View className='px-2'>


        <View className='flex flex-row items-center justify-center'>
            <Text variant="body" className=''>
                {property.name}, {property.city}, {property.country}    

            </Text>

        </View>

      </View>
    </Pressable>
  );
};

export default Card;
