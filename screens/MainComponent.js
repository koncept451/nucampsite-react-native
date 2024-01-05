import { Platform, View, StyleSheet, Text, Image } from "react-native";
import { Icon } from "react-native-elements";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import DirectoryScreen from "./DirectoryScreen";
import Constants from "expo-constants";
import HomeScreen from "./HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import logo from '../assets/images/logo.png'
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPartners } from "../features/partners/partnersSlice";
import { fetchCampsites } from "../features/campsites/campsitesSlice";
import { fetchPromotions } from "../features/promotions/promotionsSlice";
import { fetchComments } from "../features/comments/commentsSlice";



const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: '#5637DD' }
};

const AboutNavigator = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen 
                name="About"
                component={AboutScreen}
                options={({ navigation }) => ({ 
                    headerLeft: () => (
                        <Icon
                            name="info-circle"
                            type="font-awesome"
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    ) 
                })}
            />
        </Stack.Navigator>
    )
}

const ContactNavigator = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen 
                name="Contact"
                component={ContactScreen}
                options={({ navigation }) => ({ 
                    title: 'Contact us',
                    headerLeft: () => (
                        <Icon
                            name="address-card"
                            type="font-awesome"
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    ) 
                })}
            />
        </Stack.Navigator>
    )
}

const HomeNavigator = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen 
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({ 
                    title: 'Home',
                    headerLeft: () => (
                        <Icon
                            name="home"
                            type="font-awesome"
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    ) 
                })}
            />
        </Stack.Navigator>
    )
};

const DirectoryNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator 
            initialRouteName='Directory' 
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name="Directory"
                component={DirectoryScreen}
                options={({ navigation }) => ({ 
                    title: 'Campsite Directory',
                    headerLeft: () => (
                        <Icon
                            name="list"
                            type="font-awesome"
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    ) 
                })}
            />
            <Stack.Screen 
                name="CampsiteInfo" 
                component={CampsiteInfoScreen} 
                options={({ route }) => ({
                    title: route.params.campsite.name
                })
                } 
            />   
        </Stack.Navigator>
    )
};

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
            <View style={{ flex: 1 }}>
                <Image source={logo} style={styles.drawerImage} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.drawerHeaderText}>NuCamp</Text>
            </View>
        </View>
        <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
    </DrawerContentScrollView>
)

const Main = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCampsites());
        dispatch(fetchPromotions());
        dispatch(fetchPartners());
        dispatch(fetchComments());
    }, [dispatch]);
    return (
            <View 
                style={{ 
                    flex: 1, 
                    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight 
                    }}
            >
                <Drawer.Navigator
                    drawerContent={CustomDrawerContent}
                    initialRouteName="Home"
                    drawerStyle={{ backgroundColor: '#CEC8FF'}}
                >
                    <Drawer.Screen 
                        name="Home"
                        component={HomeNavigator}
                        options={{ title: 'Home' }}
                    />
                    <Drawer.Screen 
                        name="Directory"
                        component={DirectoryNavigator}
                        options={{ title: 'Directory' }}
                    />
                    <Drawer.Screen 
                        name="About"
                        component={AboutNavigator}
                        options={{ title: 'About' }}
                    />
                    <Drawer.Screen 
                        name="Contact"
                        component={ContactNavigator}
                        options={{ title: 'Contact Us' }}
                    />
                </Drawer.Navigator>
            </View>
        );
};

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 10, 
        color: '#fff', 
        fontSize: 24
    },
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    }
});

export default Main;

