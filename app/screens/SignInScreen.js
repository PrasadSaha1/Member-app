import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AppForm from '../components/AppForm';
import AppFormField from '../components/AppFormField';
import CustomButton from '../components/customButton';
import Logo from '../assets/stemeLogo.png';
import Screen from '../components/Screen';
import SubmitButton from '../components/submitButton';
import { auth } from '../navigation/firebase'

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function SignInScreen({ navigation }) {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      
      if (user) {
        navigation.navigate("Dashboard");
      }
    });

    return unsubscribe;
  }, [])
  const handleSignIn = (email, password) => {
    auth.signInWithEmailAndPassword(email,password).then(userCreditials => {
      const user = userCreditials.user;
      console.log(`Logged in with ${user.email}`);
      console.log(user.password)
    }).catch(error => alert(error.message));
  }
  return (
    <Screen>
      <View style={styles.imageContainer}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.container}>
        <AppForm
          initialValues={{ email: '', password: '' }}
          onSubmit={({email, password}) => handleSignIn(email, password)}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            placeholder="password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton text={'LOGIN'} />
        </AppForm>
        <CustomButton text={'Forgot your password?'} type="TERTIARY" />
        <CustomButton
          style={styles.createAccount}
          text={"Don't have an account? Create one "}
          type="TERTIARY"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </Screen>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  imageContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
  },
  logo: {
    height: 180,
    borderRadius: 90,
    width: 180,
    marginTop: 50,
    marginBottom: 20,
  },
  createAccount: {
    position: 'relative',
    top: 80,
  },
});
