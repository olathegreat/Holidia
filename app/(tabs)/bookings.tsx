import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '~/components/header'
import { FlatList } from 'react-native-gesture-handler'
import { BOOKINGS } from '~/core/constants/data'
import BookingItem from '~/components/bookings/bookingItem'

const Bookings = () => {
  return (
    <View>
      <Header title="Bookings" />


      <FlatList
          data={BOOKINGS}
          renderItem={({item}) => (
           <BookingItem booking={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
          className='h-full'
          ItemSeparatorComponent={() => <View className='h-4' />}
          showsVerticalScrollIndicator={false}
      />

    </View>
  )
}

export default Bookings

const styles = StyleSheet.create({})