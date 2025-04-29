import { Pressable, View } from 'react-native';
import Text from '../text';
import Image from '../image';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import CarouselItem from './carousel-item';
import { router } from 'expo-router';
import { useToggleFavorite } from '~/core/hooks/use-toggle-favorite';

type CardProps = {
  property: Property;
};

const Card = ({ property }: CardProps) => {

  const toggleFavorite = useToggleFavorite()

  const onToggleHandler = () =>{
    toggleFavorite.mutate({
      propertyId: property.id,
      currentFavoriteStatus: property.is_favorite
    })
  }
  return (
    <View className="border-b border-gray-200 p-4">
      <View className="relative">
        <Pressable 
           onPress={()=>{
            router.push({
              pathname:"/properties/[id]",
              params:{
                id:property.id
              }
            })
           }}
        >




       <Pressable   onPress={()=>{
        router.push({
          pathname: "/properties/[id]",
          params:{
            id: property.id
          }
        })
       }}>
         <CarouselItem property={property} />

       </Pressable>
        
      
       
        
        </Pressable>

        <View className="">
          <BlurView 
        //   tint='dark' intensity={100} 
          className="absolute bottom-4 left-8 flex-row p-2 rounded-xl overflow-hidden">
            <Ionicons name="star" size={24} color="#fac115" />
            <Text className="mx-2 text-white">5</Text>
          </BlurView>

          <Pressable onPress={onToggleHandler} className="absolute bottom-4 right-8">

            <BlurView className='p-2 overflow-hidden rounded-xl '>
            <Ionicons name={property.is_favorite ? 'heart' : 'heart-outline'} size={24} color="white" />
            </BlurView>
            
          </Pressable>
        </View>

        <View className="px-2">
            <View className="flex-row justify-between items-center py-2">
                <View>
                    <Text variant='subtitle'>{property.name}</Text>
                    <Text variant='caption' className='text-gray-500'>{property.amenities}</Text>
                </View>
                
               
                <View>
                    <Text variant='caption'>{property.country}  starts at ${property.price_per_night} </Text>
                </View>
            </View>

        </View>
      </View>

     
    </View>
  );
};

export default Card;
