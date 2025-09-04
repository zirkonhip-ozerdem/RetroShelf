import React from 'react';
import {NavigationContainer, DefaultTheme, Theme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image} from 'react-native';
import CatalogScreen from '../features/catalog/screens/CatalogScreen';
import ShelfScreen from '../features/shelf/screens/ShelfScreen';
import {colors} from '../shared/theme/colors';

type RootTabParamList = {
  Movies: undefined;
  Books: undefined;
  Shelf: undefined;
  History: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const darkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bg,
    card: colors.card,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
  },
};

function Placeholder({label}: {label: string}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: colors.text, fontSize: 18}}>{label}</Text>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer theme={darkTheme}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            height: 72, // navbar yüksekliği artırıldı
            paddingBottom: 6,
            paddingTop: 6,
          },
          tabBarLabelStyle: {
            fontSize: 18, // label fontu büyütüldü
            fontWeight: '800',
          },
          tabBarIcon: ({focused, size}) => {
            let iconSource;

            switch (route.name) {
              case 'Movies':
                iconSource = require('../../assets/icons/tom.png');
                break;
              case 'Books':
                iconSource = require('../../assets/icons/jerry.png');
                break;
              case 'Shelf':
                iconSource = require('../../assets/icons/mickey.png');
                break;
              case 'History':
                iconSource = require('../../assets/icons/bugs.png');
                break;
              case 'Settings':
                iconSource = require('../../assets/icons/tweety.png');
                break;
            }

            const iconSize = size + 10; // ikonları biraz büyüttük

            return (
              <Image
                source={iconSource}
                style={{
                  width: iconSize,
                  height: iconSize,
                  opacity: focused ? 1 : 0.6,
                }}
                resizeMode="contain"
              />
            );
          },
        })}>
        <Tab.Screen
          name="Movies"
          options={{title: 'Movies'}}>
          {() => <CatalogScreen initialType="movie" title="Movies" />}
        </Tab.Screen>
        <Tab.Screen
          name="Books"
          options={{title: 'Books'}}>
          {() => <CatalogScreen initialType="book" title="Books" />}
        </Tab.Screen>
        <Tab.Screen
          name="Shelf"
          options={{title: 'Shelf'}}>
          {() => <ShelfScreen />}
        </Tab.Screen>
        <Tab.Screen
          name="History"
          options={{title: 'History'}}>
          {() => <Placeholder label="History (Geçmiş) — yakında" />}
        </Tab.Screen>
        <Tab.Screen
          name="Settings"
          options={{title: 'Settings'}}>
          {() => <Placeholder label="Settings — yakında" />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
