import { Image, Pressable, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Text from '~/components/text';
import Container from '~/components/Container';
import Header from '~/components/header';
import { PRIMARY } from '~/core/theme/colors';
import useAuth from '~/core/auth';
import { router } from 'expo-router';
import { toast } from 'sonner-native';
import { client } from '~/core/api/client';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn , setUser} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    try {
      if (!email || !password || !name) {
        console.log('All fields are required');
        return;
      }
      setIsLoading(true);
      const signUpResponse = await client.post('/users', {
        name,
        email,
        password,
      });
      console.log(signUpResponse.data);
      const loginResponse = await client.post<{ token: string; user: User }>('users/login', {
        email,
        password,
      });
      setUser(loginResponse.data.user);
      console.log(loginResponse.data);

      signIn({
        access: loginResponse.data.token,
      });
      setIsLoading(false);
      router.push('/');
      toast.success('Welcome to the app');
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header title="Sign Up" />

      <View className="flex-1 p-4">
        <View className="mt-24 flex items-center justify-center">
          <Image
            source={require('assets/logo.png')}
            style={{ height: 40, width: 176 }}
            resizeMode="contain"
          />
        </View>
        <Text variant="subtitle-primary" className="mt-4 text-center">
          Let's get started
        </Text>

        <TextInput
          className="mt-4 rounded-xl bg-gray-100 px-4 py-6"
          placeholder="Name"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          className="mt-4 rounded-xl bg-gray-100 px-4 py-6"
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          className="mt-4 rounded-xl bg-gray-100 px-4 py-6"
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
        />

       
      </View>
      <Pressable
            className="mt-4 mx-4"
          onPress={handleRegister}
          style={{ borderRadius: 16, backgroundColor: PRIMARY, paddingVertical: 16 }}>
          <Text variant="button" className="text-center text-white">
            Sign Up
          </Text>
        </Pressable>
    </Container>
  );
};

export default Signup;
