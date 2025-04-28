import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import Squircle from 'react-native-squircle';
import { FlatList, Pressable, View } from 'react-native';
import ImageWithSquircle from '../image-with-squircle';
import Text from '../text';

type DiscoveryProps = {
  properties: Property[];
};

const Discovery = ({ properties }: DiscoveryProps) => {
  return (
    <>
    
      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 16,
          paddingVertical: 16,
          paddingHorizontal: 24,
          backgroundColor: '#f5f5f5',
          flexDirection: 'row',
          alignItems: 'center',
        }}
       
      >
        <Ionicons name="search" size={24} color={'gray'} />
        <View style={{ marginHorizontal: 16 }}>
          <Text style={{ color: 'gray' }}>Where to ?</Text>
        </View>
      </View>

      <FlatList
        data={properties.reverse()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 8 }}>
            <ImageWithSquircle image={item.images[1]} width={196} height={224} />
            
            {/* Blur Container */}
            <View style={{
              position: 'absolute',
              bottom: 16,
              left: 24,
              right: 24,
              borderRadius: 24,
              overflow: 'hidden',
            }}>
              <BlurView 
                intensity={100}  
                tint="dark" 
                style={{
                  padding: 16,
                }}
              >
                <Pressable
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{ color: 'white', opacity: 0.9 }}>from ${item.price_per_night}</Text>
                  </View>
                  <Ionicons name="arrow-forward-outline" size={16} color={'white'} />
                </Pressable>
              </BlurView>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default Discovery;