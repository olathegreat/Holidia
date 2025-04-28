import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '~/components/Container'
import Header from '~/components/header'
import {ResponsiveGrid} from "react-native-flexible-grid" 
import { FAVORITES } from '~/core/constants/data'
import Image from '~/components/image'
import Card from '~/components/favorite/card'

const Favorite = () => {
  return (
    <Container>
      <Header title="Favorite" />

      <View className='flex-1'>

      

      <ResponsiveGrid
          data={FAVORITES as Property[]}
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