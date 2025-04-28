import { Ionicons } from '@expo/vector-icons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlashList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
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

type Props = {};

const SafeFlashList = Platform.select({
  ios: FlashList,
  android: BottomSheetFlashList as any,
});

const Property = ({}: Props) => {
  const { id } = useLocalSearchParams();

  const property = PROPERTIES.find((_property) => _property.id === id) as unknown as Property;

  const { calendarActiveDateRanges, onCalendarDayPress } = useDateRange();

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
  return (
    <Container>
      <Header title="property" />

      <ScrollView className="bg-gray-100 p-4">
        <Propertyimage
          imageUrl={property?.images[1]}
          isFavorite={property?.is_favorite}
          rating={5}
        />

        <Text variant="subtitle-primary" className="mt-4">
          {property?.name}
        </Text>

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

      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between bg-white p-4 shadow-md">
        <Pressable
          className="flex-grow"
          onPress={() => bottomSheetRef.current?.expand()}
          style={{ borderRadius: 16, backgroundColor: PRIMARY, paddingVertical: 16 }}>
          <Text variant="body" className="text-center text-white">
            Book Now
          </Text>
        </Pressable>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        index={-1}
        enablePanDownToClose={true}
        enableDynamicSizing={false}>
        <BottomSheetView style={{ flex: 1 }}>
          <Text variant="body" className="text-center text-gray-500">
            Price
          </Text>

          <BottomSheetView style={{ flex: 1 }}>
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
            onPress={()=>{
                bottomSheetRef.current?.close()
            }}
            className="m-8 flex flex-row items-center justify-center p-4 gap-2 rounded-xl z-50">
            <Ionicons name="checkmark-circle" color={'white'} size={20} />
            <Text variant="button" className="text-center">
              Confirm
            </Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>

      
    </Container>
  );
};

export default Property;
