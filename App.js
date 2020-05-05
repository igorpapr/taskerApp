import * as React from 'react';
import {AsyncStorage, Button, Text, TextInput, View, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskDetails from './screens/taskdetails';
import Home from './screens/home';

export const AuthContext = React.createContext();

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  const submit = () => {
    if (username.length > 3 && password.length > 3){
      signIn({ username, password });
    }else{
      Alert.alert("Username or password is too short!");
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={submit} />
    </View>
  );
}


function LoadingScreen() {
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
}

const Stack = createStackNavigator();


export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(`Failed to restore token: ${e}`)
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        try{
          let response = await fetch("http://192.168.1.4:8080/api/auth/login", 
          {
              method: 'post',
              headers: new Headers({
                Accept: 'application/json',
                'Content-type':'application/json'
              }),
              body: JSON.stringify({
                username:data.username,
                password:data.password
            })
          });
          let json = await response.json();
          await AsyncStorage.setItem('userToken',json.token);
          dispatch({ type: 'SIGN_IN', token: json.token });
        }catch (error){
          Alert.alert("Something went wrong while trying to authenticate user");
          console.error(error);
        }
      },
      signOut: async () => {
        console.log('Signing out');
        await AsyncStorage.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' }) },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={LoadingScreen} />
          ) : state.userToken == null ? (
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            <>
            <Stack.Screen 
              name="Home"  
              component= {Home}
              options={{
                  title: 'My Tasks'
              }}
              />
            <Stack.Screen 
              name="TaskDetails"  
              component= {TaskDetails}
              options={{
                  title: 'Task Details'
              }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}