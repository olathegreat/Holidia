import { FlatList, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Text from '~/components/text'
import Container from '~/components/Container'
import Header from '~/components/header'
import { Ionicons } from '@expo/vector-icons'
import { PROPERTIES } from '~/core/constants/data'
import Card from '~/components/search/card'
import { useQuery } from '@tanstack/react-query';
import { client } from '~/core/api/client'
import {useDebounce} from '@uidotdev/usehooks'
import LoadingIndicator from '~/components/loading-indicator'


type Props = {

}

const Search = ({}:Props) => {
    const [searchQuery, setSearchQuery] = useState('');

    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    const {data:properties, isLoading} = useQuery({
      queryKey: ['properties-search', debouncedSearchQuery],
      queryFn: async()=>{

        if(debouncedSearchQuery){
          const response = await client.get(`properties/search?city=${debouncedSearchQuery}`);
          return response.data.properties
        }else{
          return []
        }
        
      },
      staleTime: 1000 * 60
    })
  
    // if(!data || isLoading){
    //   return <LoadingIndicator/>
    // }
  return (
    <Container>
      <Header   title="search"/>


      <View className='flex mx-4 flex-row items-center justify-center rounded-xl bg-gray-100 px-4 py-2'>
      <View className='flex py-3 flex-row items-center justify-center '>
        <Ionicons name='search' size={20} color='grey' />  
        <TextInput className='ml-2 flex-1'
           placeholder='Search by city....'
           value={searchQuery}
           onChangeText={setSearchQuery}
           returnKeyType='search'
        />
        </View>
      </View>


      <FlatList
      
         data={PROPERTIES}
         renderItem={({item})=>(
            <Card property={item}/>
         )}


         ListFooterComponent={isLoading? <LoadingIndicator/>: null}
      
      />
    </Container>
  )
}

export default Search