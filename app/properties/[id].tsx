import { Ionicons } from '@expo/vector-icons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlashList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { nanoid } from 'nanoid/non-secure';
import { toast } from 'sonner-native';
import { FlashList } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { useCallback, useMemo, useRef } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';
import Container from '~/components/Container';
import Header from '~/components/header';
import AmenitiesList from '~/components/property/amenities-list';
import Propertyimage from '~/components/property/propertyimage';
import Text from '~/components/text';
import { Calendar, useDateRange } from '@marceloterreiro/flash-calendar';
import { PROPERTIES } from '~/core/constants/data';
import { PRIMARY } from '~/core/theme/colors';
import { today } from '~/core/constants';
import { calendarTheme } from '~/core/theme/calendar-theme';
import useShoppingCartStore from '~/core/store';
import { differenceInDays } from 'date-fns';
import LoadingIndicator from '~/components/loading-indicator';
import { client } from '~/core/api/client';
import { useQuery } from '@tanstack/react-query';

type Props = {};

const SafeFlashList = Platform.select({
  ios: FlashList,
  android: BottomSheetFlashList as any,
});

const Property = ({}: Props) => {
  const { id } = useLocalSearchParams();

  const { data: property, isLoading } = useQuery<Property>({
    queryKey: ['property' + id],
    queryFn: async () => {
      const { data } = await client.get(`/properties/${id}`);
      return data.property;
    },
  });

  const { addItem } = useShoppingCartStore();

  const { calendarActiveDateRanges, onCalendarDayPress } = useDateRange();

  console.log({ calendarActiveDateRanges });

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['60%'], []);

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={'close'}
      />
    );
  }, []);

  const calculateDays = () => {
    if (!calendarActiveDateRanges[0]?.startId) return 0;
    if (!calendarActiveDateRanges[0]?.endId) return 1;

    const startDate = new Date(calendarActiveDateRanges[0].startId);
    const endDate = new Date(calendarActiveDateRanges[0].endId);

    return differenceInDays(endDate, startDate) + 1;
  };

  const hasSelectedDates = Boolean(calendarActiveDateRanges[0]?.startId);

  if (isLoading || !property) {
    return <LoadingIndicator />;
  }
  const days = calculateDays();
  const totalPrice = days * property.price_per_night;
  return (
    <Container>
      <Header title="Property" />

      <ScrollView className="bg-gray-100 p-4">
        <Propertyimage
          imageUrl={property?.images[1]}
          isFavorite={property?.is_favorite}
          rating={5}
        />

        <View className="flex flex-row items-center justify-between">
          <Text variant="subtitle-primary" className="mt-4">
            {property.name}
          </Text>
          <View className="flex flex-row items-center justify-center">
            <Ionicons name="pricetag" size={12} color={PRIMARY} />
            <Text variant="body-primary" className="ml-2">
              ${property.price_per_night} per night
            </Text>
          </View>
        </View>

        <View className="mt-2 flex flex-row items-center">
          <Ionicons name="location" size={16} color={PRIMARY} />

          <Text variant="body-primary" className="mt-4">
            {property?.city}, {property?.country}
          </Text>
        </View>

        <Text variant="body" className="mt-1 text-gray-700">
          {property?.description}
        </Text>

        <AmenitiesList amenities={property.amenities} />
      </ScrollView>

      

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        index={-1}
        enablePanDownToClose={true}
        enableDynamicSizing={false}>
        <BottomSheetView style={{ flex: 1 }}>
        <View className="my-4 flex flex-row items-center justify-between px-4">
            <View className="flex flex-row items-center justify-center">
              <Ionicons name="wallet" color={PRIMARY} size={24} />
              <Text variant="subtitle" className="mx-4">
                Price : ${hasSelectedDates ? totalPrice : property.price_per_night}
                {!hasSelectedDates && ' per night'}
              </Text>
            </View>
          </View>
          <BottomSheetView style={{ flex: 1, paddingHorizontal: 4 }}>
            
              <Calendar.List
                CalendarScrollComponent={SafeFlashList}
                calendarActiveDateRanges={calendarActiveDateRanges}
                calendarMinDateId={today}
                onCalendarDayPress={onCalendarDayPress}
                theme={calendarTheme}
              />
            
          </BottomSheetView>

          <Pressable
            style={{ backgroundColor: PRIMARY }}
            onPress={() => {
              bottomSheetRef.current?.close();

              if (!hasSelectedDates) {
                console.log('please select a date');
                return;
              }
              const selectedRange = calendarActiveDateRanges[0];
              if (!selectedRange?.startId) {
                console.log('Start date is required');
                return;
              }
              const cartItem: ICartItem = {
                id: 'cart' + nanoid(),

                image: property.images[0],
                name: property.name,
                product: property.id,
                price_per_night: property.price_per_night,
                quantity: 1,
                startDate: selectedRange.startId,
                endDate: selectedRange.endId ?? selectedRange.startId,
                days: calculateDays(),
              };
              console.log({ cartItem });
              addItem(cartItem);
              bottomSheetRef.current?.close();
            }}
            className="z-50 m-8 flex flex-row items-center justify-center gap-2 rounded-xl p-4">
            <Ionicons name="checkmark-circle" color={'white'} size={20} />
            <Text variant="button" className="text-center">
              Confirm
            </Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>


      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between bg-white p-4 shadow-md">
        {hasSelectedDates ? (
          <Pressable
            className="mr-4"
            onPress={() => {
              bottomSheetRef.current?.expand();
            }}>
            <View className="flex flex-row items-center">
              <Ionicons name="pricetag" color={PRIMARY} size={16} />
              <Text variant="body-primary" className="text-center">
                ${totalPrice}
              </Text>
            </View>
            <Text variant="caption" className="text-center underline">
              {days === 1 ? '1 Night' : `${days} nights`}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            className="mr-4 flex flex-row items-center"
            onPress={() => {
              bottomSheetRef.current?.expand();
            }}>
            <Ionicons name="calendar-outline" size={24} color={PRIMARY} />
            <Text variant="body-primary" className="ml-2 text-center underline">
              Select dates
            </Text>
          </Pressable>
        )}

        <Pressable
          className="flex-grow"
          onPress={() => {
            toast.success('Property added to cart');
            router.push('/checkout');
          }}
          style={{ borderRadius: 16, backgroundColor: PRIMARY, paddingVertical: 16 }}>
          <Text variant="body" className="text-center text-white">
            Book Now
          </Text>
        </Pressable>
      </View>
    </Container>
  );
};

export default Property;
