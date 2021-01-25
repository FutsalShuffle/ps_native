import AsyncStorage from '@react-native-async-storage/async-storage';

const localStorage = {
    async getJwt () {
        try {
          const value = await AsyncStorage.getItem('@token');
          if (value !== null) {
            return value;
          }
          return null
        } catch(e) {
          console.log(e);
          return null;
        }
    },
    async storeJwt (value) {
        try {
          await AsyncStorage.setItem('@token', value)
        } catch (e) {
          console.log(e);
        }
      }
}
export default localStorage;
