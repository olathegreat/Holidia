import { Image, Pressable, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Text from '~/components/text';
import Container from '~/components/Container';
import Header from '~/components/header';
import { PRIMARY } from '~/core/theme/colors';
import { client } from '~/core/api/client';
import useAuth from '~/core/auth';
import { router } from 'expo-router';

const Login = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useAuth();


  const handleSignIn = async () =>{
    try{
        const response = await client.post('users/login',{
          email, password
        })
        signIn({
          access: response.data.token,

        })
        router.push('/')
    }catch(e){
      console.log(e)
    }
  }

  return (
    <Container>
      <Header title="Login" />

      <View className="flex-1 p-4">
        <View className="mt-24 flex items-center justify-center">
          <Image
            source={require('assets/logo.png')}
            style={{ height: 40, width: 176 }}
            resizeMode="contain"
          />
        </View>
        <Text variant="subtitle-primary" className="mt-4 text-center">
          Welcome back
        </Text>

        
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
          onPress={handleSignIn}
          style={{ borderRadius: 16, backgroundColor: PRIMARY, paddingVertical: 16 }}>
          <Text variant="button" className="text-center text-white">
            login
          </Text>
        </Pressable>
    </Container>
  );
};

export default Login;
