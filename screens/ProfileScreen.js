import { useContext } from 'react';
import { View, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import { Title, Text, TouchableRipple } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Color } from '../constants/colors';
import { UserContext, useUsers } from '../context/UserContext';
import { useDarkMode } from '../context/DarkModeContext';
import DarkModeSwitch from '../components/ui/DarkModeSwitch';

const ProfileScreen = ({ navigation }) => {
  const auth = useContext(UserContext);
  const { userData } = useUsers();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const userType =
    userData?.userType?.charAt(0).toUpperCase() +
    userData?.userType?.slice(1).toLowerCase();

  async function logoutHandler(auth, navigation) {
    try {
      await AsyncStorage.removeItem('token');
      auth.logout();
      navigation.navigate('SignInScreen');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={styles.avatar}>
          <ImageBackground
            style={{ height: 90, width: 90 }}
            imageStyle={{
              borderRadius: 50,
              borderWidth: 0.5,
              borderColor: Color.gray,
            }}
            source={{
              uri: userData.avatar?.url,
            }}
          />
          <View>
            <Title style={styles.title}>
              {userData.firstName} {userData.lastName}
            </Title>
          </View>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>{userType} Profile</Text>
      </View>

      {userData.userType === 'student' ? (
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon
              name="map-marker-radius-outline"
              color={Color.icon}
              size={20}
            />
            <Text style={styles.text}>{userData.academic}</Text>
          </View>

          <View style={styles.row}>
            <Icon name="school-outline" color={Color.icon} size={20} />
            <Text style={styles.text}>{userData.department}</Text>
          </View>

          <View style={styles.row}>
            <Icon name="calendar-blank-outline" color={Color.icon} size={20} />
            <Text style={styles.text}>{userData.yearbook}</Text>
          </View>

          <View style={styles.row}>
            <Icon name="email-outline" color={Color.icon} size={20} />
            <Text style={styles.text}>{userData.email}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.userInfoSection}>
          {/* <View style={styles.row}>
            <Icon name="phone-outline" color={Color.icon} size={20} />
            <Text style={styles.text}>אין</Text>
          </View> */}

          <View style={styles.row}>
            <Icon name="email-outline" color={Color.icon} size={20} />
            <Text style={styles.text}>{userData.email}</Text>
          </View>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.infoTitle}>Other</Text>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color={Color.icon} size={25} />
            <Text style={styles.menuItemText}>Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('SecurityScreen')}>
          <View style={styles.menuItem}>
            <Icon name="shield-lock-outline" color={Color.icon} size={25} />
            <Text style={styles.menuItemText}>Security</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => logoutHandler(auth, navigation)}>
          <View style={styles.menuItem}>
            <Icon name="logout-variant" color={Color.icon} size={25} />
            <Text style={styles.menuItemText}>LogOut</Text>
          </View>
        </TouchableRipple>

        {/* <View style={styles.menuItem}>
          <Icon name="theme-light-dark" color={Color.icon} size={25} />
          <DarkModeSwitch
            value={true}
            color={Color.Brown400}
            onToggle={toggleDarkMode}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  avatar: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    marginTop: 5,
    marginBottom: 25,
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    marginBottom: 20,
    marginHorizontal: 30,
    marginTop: -20,
    borderBottomWidth: 0.6,
    borderColor: Color.Blue500,
  },
  infoTitle: {
    fontWeight: '800',
    fontSize: 15,
    color: Color.Blue900,
    marginBottom: 5,
  },
  text: {
    color: Color.icon,
    marginLeft: 10,
    fontFamily: 'varelaRound',
  },

  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  menuWrapper: {
    marginTop: -15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: Color.icon,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'varelaRound',
  },
});
