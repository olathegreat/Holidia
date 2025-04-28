import { StyleSheet, View } from 'react-native';
import Text from '../text';
import React from 'react';
import { format } from 'date-fns';
import Image from '../image';
import { SquircleView } from 'expo-squircle-view';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { PRIMARY } from '~/core/theme/colors';
// import { useImageColors } from '../hooks/use-image-colors';

type BookingItemProps = {
  booking: Booking;
};

const CalendarDate = ({ date = new Date() }) => {
  const month = format(date, 'MMM').toUpperCase();
  const day = format(date, 'd');
  const weekday = format(date, 'EEE').toUpperCase();

  return (
    <View className="flex flex-col items-center justify-center rounded-full bg-[#f3f4f6] p-2">
      <View className=" mx-1 flex flex-row  items-center justify-center">
        <Text variant="caption" className="text-center">
          {month}
        </Text>
      </View>

      <View className="items-center py-2">
        <Text variant="subtitle" className="text-center">
          {day}
        </Text>
      </View>
      <View className="items-center p-1">
        <Text variant="caption" className="text-center text-gray-500">
          {weekday}
        </Text>
      </View>
    </View>
  );
};

const BookingItem = ({ booking }: BookingItemProps) => {

    // const {colors} = useImageColors(booking.property.images[0])
  return (
    <View className="mx-4 flex flex-row justify-between ">
      <View className="mr-4">
        <CalendarDate date={booking?.check_in as unknown as Date} />
      </View>

      <View className="roundex-2xl flex-1  overflow-hidden bg-gray-100">
        <View className="h-36 overflow-hidden rounded-2xl rounded-b-none ">
          <Image
            source={booking.property.images[0]}
            style={{
              
              height: 256,
            }}
          />
        </View>



        <View style={{backgroundColor: PRIMARY}} className=" relative overflow-hidden  rounded-2xl rounded-t-none p-6 ">
            <BlurView className='absolute inset-0' intensity={40} tint='dark' />
            
          <View className="flex flex-row items-center px-2 py-2">
            <Ionicons name="location" size={16} color="white" />
            <Text variant="body" className="mx-2 text-white">
              {booking.property.name}, {booking.property.city}, {booking.property.country}
            </Text>
          </View>

          


          <View className='mb-1 flex-row flex justify-between'>

            <View className='my-2'>
            <Text variant='body' className='text-gray-500'>
                Check-in
                </Text>

                <Text variant='body' className='text-white'>
                    {format(new Date(booking.check_in), 'MMM dd, yyyy')}
                </Text>

            </View>


            <View className=''>
            <Text variant='body' className='text-gray-500'>
                Check-out
                </Text>

                <Text variant='body' className='text-white'>
                    {format(new Date(booking.check_out), 'MMM dd, yyyy')}
                </Text>

            </View>

          </View>
        </View>
      </View>
    </View>
  );
};

export default BookingItem;

const styles = StyleSheet.create({});
