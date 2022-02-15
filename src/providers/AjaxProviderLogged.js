import localStorage from '../localstorage/LocalStorage';
import Config from '../../Config';
const AjaxProviderLogged = async action => {
  let token = await localStorage.getJwt();
  console.log('url: ', Config.API + action);
  let headersConf=  {
    'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
    Vary: 'Authorization,Accept-Encoding',
    'Content-Type': 'text/html; charset=utf-8',
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Content-Length': '1355',
    Authorization: 'Bearer ' + token,
  }
  console.log('headers: ', headersConf);
  if (!token) return null;
  try {
    let response = await fetch(Config.API + action, {
      headers: headersConf,
    });
    if (response.ok) {
      let json = await response.json();
      console.log('AjaxProviderLogged ok', json);
      return json;
    } else {
      console.log('AjaxProviderLogged else', response);
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};
export default AjaxProviderLogged;
