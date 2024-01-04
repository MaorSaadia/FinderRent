import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";

// Create a UserContext with default login and logout functions
const UserContext = createContext({
  login: () => {},
  logout: () => {},
});

// Custom hook to manage user data and authentication
function useUsers() {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [id, setId] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [age, setAge] = useState(null);
  const [academic, setAcademic] = useState(null);
  const [department, setDepartment] = useState(null);
  const [yearbook, setYearbook] = useState(null);
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // Function to login the user and save data to AsyncStorage
  const login = useCallback((data, token) => {
    const saveData = async () => {
      const {
        _id,
        userType,
        firstName,
        lastName,
        age,
        academic,
        department,
        yearbook,
        gender,
        email,
        avatar,
      } = data;

      setToken(token);
      setUserType(userType);
      setId(_id);
      setFirstName(firstName);
      setLastName(lastName);
      setAge(age);
      setAcademic(academic);
      setDepartment(department);
      setYearbook(yearbook);
      setGender(gender);
      setEmail(email);
      setAvatar(avatar);

      try {
        // Save user data to AsyncStorage
        await AsyncStorage.setItem("userData", JSON.stringify(data));
      } catch (err) {
        console.log(err);
      }
    };

    saveData();
  }, []);

  // Function to logout the user and remove data from AsyncStorage
  const logout = useCallback(() => {
    const removeData = async () => {
      try {
        // Remove user data from AsyncStorage
        await AsyncStorage.removeItem("userData");
      } catch (err) {
        console.log(err);
      }

      // Clear user state variables
      setToken(null);
      setUserType(null);
      setId(null);
      setFirstName(null);
      setLastName(null);
      setAge(null);
      setAcademic(null);
      setDepartment(null);
      setYearbook(null);
      setGender(null);
      setEmail(null);
      setAvatar(null);
    };

    removeData();
  }, []);

  // Effect to retrieve stored data from AsyncStorage on component mount
  useEffect(() => {
    const getStoredData = async () => {
      try {
        // Retrieve stored user data and token from AsyncStorage
        const storedData = await AsyncStorage.getItem("userData");
        const storedToken = await AsyncStorage.getItem("token");

        if (storedData !== null) {
          // Login user with stored data
          login(JSON.parse(storedData), storedToken);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getStoredData();
  }, [login]);

  // Check if the hook is used outside of the UserProvider
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("UserContext was used outside of the UserProvider");
  }

  // Object containing login, logout functions, and user data
  const userData = {
    context,
    token,
    userType,
    id,
    firstName,
    lastName,
    age,
    gender,
    academic,
    department,
    yearbook,
    email,
    avatar,
  };

  return { login, logout, userData };
}

export { UserContext, useUsers };
