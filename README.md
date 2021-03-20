#
By default this project runs on a website
http://lelerestapi.na4u.ru/

## How to run it (At least for Android devices)
- install Prestashop module from /backend directory (archive it to ZIP first)
- place your website link to /module/lelerestapi in Config.js (Keep in mind, your website need to have SSL in order for it to work on a final .apk/ios build)
- npm install
- yarn install
- npx react-native run-android  (android)


## Already working:
- JWT authorization/register (can't use prestashop cookies/context!)
- Categories, Products with images (slider on product page)
- Cart (add to cart, total cart)
- Placing an order (Can set delivery address, can't choose payment method or carrier)
- Custom page powered by EditorJS in module setings

## TODO:
- Favourite products (Page with a list of current FP + make a button on product page work, backend should be working already)
- Better architecture
- Orders history in profile page
- Carriers on order page


