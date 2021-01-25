import localStorage from '../localstorage/LocalStorage';
import Config from '../../Config';
const AjaxProviderLogged = async (action) => {
    let token = await localStorage.getJwt();
    if (!token) return null;
    try {
      let response = await fetch(
        Config.API + action,  {
          headers: {
            'Authorization': 'Bearer '+ token
          },
        }
      );
      let json = await response.json();
      return json;
    }catch (e) {
        console.log(e);
    }
}
export default AjaxProviderLogged;