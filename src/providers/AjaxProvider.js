import Config from '../../Config';

const AjaxProvider = async (action) => {
      let response = await fetch(
        Config.API + action
      );

      let json = await response.json();  
      return json;
}
export default AjaxProvider;
