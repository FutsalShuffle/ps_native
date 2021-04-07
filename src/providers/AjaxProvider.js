import Config from '../../Config';

const AjaxProvider = async (action) => {
  try {
    let response = await fetch(
      Config.API + action
    );
    if (response.ok) {
      let json = await response.json();
      return json;
    }
    return null;
  } catch (e) {
    console.log(e);
  }

}
export default AjaxProvider;
