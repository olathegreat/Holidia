import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import Container from '~/components/Container';
import Card from '~/components/home/card';
import Discovery from '~/components/home/discovery';
import MainHeader from '~/components/home/main-header';
import LoadingIndicator from '~/components/loading-indicator';
// import Card from '~/components/home/card';
// import Discovery from '~/components/home/discovery';
// import MainHeader from '~/components/home/main-header';
// import LoadingIndicator from '~/components/loading-indicator';
import Text from '~/components/text';
import { client } from '~/core/api/client';
import { PROPERTIES } from '~/core/constants/data';
// import { client } from '~/core/api/client';

const Home = () => {
  // const { data, isLoading } = useQuery({
  //   queryKey: ['properties'],
  //   queryFn: async () => {
  //     const response = await client.get('/properties');
  //     return response.data.properties;
  //   },
  // });

  

  // const {data} = useQuery({
  //   queryKey: ['properties-list'],
  //   queryFn: async () => {
  
  //     try{
  //       const { data } = await client.get('/properties-list');

  //     return data.properties;

  //     }catch(err){
  //       console.log("err", err)
  //     }
  //   }
  // });

  // console.log("properties-list",JSON.stringify(data, null, 2));

  // const {data, isLoading} = useQuery({
  //   queryKey: ['properties-list'],
  //   queryFn: async () => {
  //     try {
  //       const { data } = await client.get('/properties');

  //       return data.properties;
  //     } catch (err) {
  //       console.log('err', err);
  //     }
  //   },
  // });
  // console.log("properties-list",JSON.stringify(data, null, 2));
  // if(isLoading){
  //   <View className="flex flex-1 flex-row items-center justify-center">
  //     <Text variant='body' className='text-center'>
  //       Loading
  //     </Text>

  //   </View>
  // }
  
  const {data, isLoading} = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      try {
        const response = await client.get('/properties');

        return response.data.properties;
      } catch (err) {
        console.log('err', err);
      }
    },
  });

  if (!data || isLoading) {
    return <LoadingIndicator />;
  }

  
  

  

  return (
    <Container>
      {/* <Text variant="title">Home</Text> */}

      <MainHeader />

      <FlatList
        // data={PROPERTIES}
        data={data}
        // ListHeaderComponent={() => <Discovery properties={PROPERTIES} />}
        ListHeaderComponent={() => <Discovery properties={data.reverse()} />}
        renderItem={({ item }) => <Card property={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default Home;
