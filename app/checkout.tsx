import { Pressable, ScrollView, View } from 'react-native';
import React from 'react';
import Text from '~/components/text';
import Container from '~/components/Container';
import useShoppingCartStore from '~/core/store';
import Header from '~/components/header';
import ImageWithSquircle from '~/components/image-with-squircle';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { PRIMARY } from '~/core/theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Checkout = () => {
  const { item, getTotalPrice } = useShoppingCartStore();

  const {bottom} =useSafeAreaInsets();

  if (!item) {
    return (
      <View className="flex flex-1 flex-row items-center justify-center">
        <Text variant="body" className="text-center">
          Cart is empty
        </Text>
      </View>
    );
  }
  return (
    <Container>
      <ScrollView className="flex-1">
        <View className="px-4">
          <Header title="checkout" />

          <View className="flex flex-row overflow-hidden rounded-2xl bg-[#f3f4f6] p-4">
            <ImageWithSquircle image={item.image} width={96} height={96} borderRadius={24} />

            <View className="ml-4 flex-1">
              <Text variant="body" className="">
                Property
              </Text>
              <Text variant="body" className="">
                {item.name}
              </Text>
            </View>
          </View>

          <View className="my-4 overflow-hidden rounded-2xl bg-[#f3f4f6] p-4">
            <Text variant="subtitle" className="text-center">
              Your Trip
            </Text>

            <View className="mb-4">
              <Text variant="body" className="">
                Dates
              </Text>

              <View className="flex flex-row items-center">
                <Ionicons name="calendar-outline" size={20} className="mr-2" />
                <Text variant="body" className="">
                  {format(new Date(item.startDate), 'EEE, MMM d')} {' - '}
                  {format(new Date(item.startDate), 'EEE, MMM d, yyyy')}
                </Text>
              </View>
            </View>
          </View>

          <View className="my-4 overflow-hidden rounded-2xl bg-[#f3f4f6] p-4">
            <Text className="" variant="body">
              Price Details
            </Text>

            <View className="">
              <View className="flex flex-row items-center justify-between">
                <Text variant="body" className="">
                  ${item.price_per_night} X {item.days} nights
                </Text>
                <Text variant="body" className="text-center">
                  ${getTotalPrice()}
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between">
                <Text variant="body" className="">
                  Cleaning Fee
                </Text>
                <Text variant="body" className="text-center">
                  FREE
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between">
                <Text variant="body" className="">
                  Service Fee
                </Text>
                <Text variant="body" className="text-center">
                  FREE
                </Text>
              </View>

              <View className="my-2 h-[1px] bg-gray-200"></View>
              <View className="my-1 flex flex-row items-center justify-between">
                <Text variant="body" className="">
                  Total (USD)
                </Text>
                <Text variant="body" className="text-center">
                  ${getTotalPrice()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Pressable
        className="flex-grow absolute  left-0 right-0 mx-4"
        onPress={() => {}}
        style={{ borderRadius: 16, backgroundColor: PRIMARY, paddingVertical: 16, bottom: bottom + 12 }}>
        <Text variant="body" className="text-center text-white">
          Confirm and Pay
        </Text>
      </Pressable>
    </Container>
  );
};

export default Checkout;
