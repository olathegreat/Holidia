import { StyleSheet, Text, View } from 'react-native'
import { useQuery } from '@tanstack/react-query';
import Container from '~/components/Container'
import Header from '~/components/header'
import {ResponsiveGrid} from "react-native-flexible-grid" 
import { FAVORITES } from '~/core/constants/data'
import Card from '~/components/favorite/card'
import { client } from '~/core/api/client'
import LoadingIndicator from '~/components/loading-indicator'
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

const Favorite = () => {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      try {
        const response = await client.get('/favorites');

        return response.data.favorites;
      } catch (err) {
        console.log('err', err);
      }
    },
  });

  if (!data || isLoading) {
    return <LoadingIndicator />;
  }

  useFocusEffect(
    useCallback(()=>{
        refetch()
    },[refetch])
  )
  return (
    <Container>
      <Header title="Favorite" />

      <View className='flex-1'>

      

      <ResponsiveGrid
          // data={FAVORITES as Property[]}
          data={data as Property[]}
          renderItem={({item}) => (
          <Card property={item}/>
           
          )}
          keyExtractor={(item: Property) => item.id.toString()}
          maxItemsPerColumn={2} 
          itemUnitHeight={256}

      />
      </View>
      
    </Container>
  )
}

export default Favorite

const styles = StyleSheet.create({})