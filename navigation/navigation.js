import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListServer from '../components/list-server';
import DetailServer from '../components/server-detail';
import UserSettings from '../components/user-settings';
import UserData from '../components/infos-user';


const ListServerStack = createStackNavigator();
function ListServerStackScreen() {
    return (
        <ListServerStack.Navigator>
            <ListServerStack.Screen
                name="All servers"
                component={ListServer}
                options={{
                    title: "Assetto Corsa",
                    headerStyle: {
                        backgroundColor: '#0d96d1'
                    },
                    headerTintColor: '#fff',
                }}
            />
            <ListServerStack.Screen
                name="Detail server"
                component={DetailServer}
                options={{
                    title: "Gérer votre serveur AC",
                    headerStyle: {
                        backgroundColor: '#0d96d1'
                    },
                    headerTintColor: '#fff',
                }}
            />
        </ListServerStack.Navigator>
    );
}

const SettingsUserStack = createStackNavigator();
function SettingsUserScreen() {
    return (
        <SettingsUserStack.Navigator>
            <SettingsUserStack.Screen
                name="Settings"
                component={UserSettings}
                options={{
                    title: 'Paramètres',
                    headerStyle: {
                        backgroundColor: '#0d96d1'
                    },
                    headerTintColor: '#fff',
                }}
            />
            <SettingsUserStack.Screen
                name="User data"
                component={UserData}
                options={{
                    title: 'Informations personnelles',
                    headerStyle: {
                        backgroundColor: '#0d96d1'
                    },
                    headerTintColor: '#fff',
                }}
            />
        </SettingsUserStack.Navigator>
    );
}


const bottomMenu = createBottomTabNavigator()
class BottomNavigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <bottomMenu.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === "Servers") {
                                iconName = 'server-network';

                            } else if (route.name === "Settings") {
                                iconName = 'account-edit';

                            }

                            return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: '#0d96d1',
                        inactiveTintColor: '#a6a6a6',
                    }}
                >
                    <bottomMenu.Screen
                        name="Servers"
                        component={ListServerStackScreen}
                        options={{title: 'Serveurs'}}
                    />
                    <bottomMenu.Screen
                        name="Settings"
                        component={SettingsUserScreen}
                        options={{title: 'Paramètres'}}
                    />
                </bottomMenu.Navigator>
            </NavigationContainer>
            
        );
    }
}

export default BottomNavigation