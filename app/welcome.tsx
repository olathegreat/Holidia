import { View, Image, Pressable } from 'react-native';
import React from 'react';
import Container from '~/components/Container';
import Header from '~/components/header';
import Text from '~/components/text';
import { PRIMARY } from '~/core/theme/colors';
import { router } from 'expo-router';

const Welcome = () => {
  return (
    <Container>
      <View className="flex flex-1  items-center justify-center px-4">
        <View className='flex flex-1 flex-row items-center justify-center'>
        <Image
          source={require('assets/logo.png')}
          style={{ height: 40, width: 176 }}
          resizeMode="contain"
        />
        </View>

        <Pressable
          className="mt-4 w-full items-center p-4"
          onPress={() => {router.push('/signup')}}
          style={{ borderRadius: 16, backgroundColor: PRIMARY, paddingVertical: 16 }}>
          <Text variant="button" className="text-center text-white">
            Sign up for free
          </Text>
        </Pressable>
        <Pressable
          className="mt-4 w-full items-center p-4"
          onPress={() => {router.push('/login')}}
          style={{ borderRadius: 16, paddingVertical: 16 }}>
          <Text variant="button" className="text-center text-primary">
            Already signed up? Login
          </Text>
        </Pressable>
      </View>
    </Container>
  );
};

export default Welcome;
