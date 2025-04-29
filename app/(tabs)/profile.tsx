import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import Header from '~/components/header';
import { useQuery } from '@tanstack/react-query';
import ImageWithSquircle from '~/components/image-with-squircle';
import Text from '~/components/text';
import { client } from '~/core/api/client';
import useAuth from '~/core/auth';
import { PRIMARY } from '~/core/theme/colors';
import LoadingIndicator from '~/components/loading-indicator';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';


type UserStat = {
  name: string;
  email: string;
  username: string;
  favorite_properties_count:number;
  bookings_count: number;
  avatar: string;
}
const user: User = {
  avatar: "https://res.cloudinary.com/dbspz5tmg/image/upload/v1738301879/holidia/one_whhjrl.webp",
  bookings: [],
  created_at: '',
  email: 'user@gmail.com',
  id: '',
  name: '',
  properties: [],
  username: 'user',
};
const Profile = () => {

  const {signOut, user} = useAuth();

  const {data, isLoading, refetch} = useQuery<UserStat>({
    queryKey: ['stats'],
    queryFn: async()=>{
      const response = await client.get("users/stats");
      return response.data.stats
    }
  })

  useFocusEffect(
    useCallback(()=>{
      refetch()
    },[refetch])
  )

  if(!data || isLoading || !user){
    return <LoadingIndicator/>
  }
  return (
    <View>
      <Header
        title="profile"
        headerAction={{
          name: 'log-out',
          onPress: () => {
            signOut()
          },
        }}
      />

      <View className="flex flex-row items-center justify-center">
      
        <ImageWithSquircle image={user!.avatar} width={256} height={256} borderRadius={48} />
      </View>

      <View className="mt-4 flex items-center justify-center">
        <Text variant="title" className="text-center">
          {user!.email}
        </Text>
        <Text variant="subtitle" className="text-center">
          @{user!.username}
        </Text>
      </View>

      <View className="m-4 mt-10 flex flex-row flex-wrap justify-around rounded-xl">
        <View className=''>
          <View className=" flex flex-row items-center justify-center bg-gray-100 p-8 rounded-lg">
            <Ionicons name="stats-chart" color={PRIMARY} size={40} />
          </View>

          <View className=" mt-4 flex flex-row items-center justify-center ">
            <Text variant="body" className="text-center">
              Trips
            </Text>
            <Text variant="body" className="mx-4 text-center">
              {data.bookings_count}
            </Text>
          </View>
        </View>

        <View>
          <View className=" flex flex-row items-center justify-center bg-gray-100 p-8 rounded-lg">
            <Ionicons name="heart" color={PRIMARY} size={40} />
          </View>

          <View className=" mt-4 flex flex-row items-center justify-center ">
            <Text variant="body" className="text-center">
              Favorite
            </Text>
            <Text variant="body" className="mx-4 text-center">
              {data.favorite_properties_count}
            </Text>
          </View>
        </View>



        <View>
          <View className=" flex flex-row items-center justify-center bg-gray-100 p-8 rounded-lg">
            <Ionicons name="albums" color={PRIMARY} size={40} />
          </View>

          <View className=" mt-4 flex flex-row items-center justify-center ">
            <Text variant="body" className="text-center">
              Albums
            </Text>
            <Text variant="body" className="mx-4 text-center">
              4
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
