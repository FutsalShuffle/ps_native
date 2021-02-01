<?php
require_once dirname(__FILE__).'/vendor/autoload.php';
/**
 * RestApiHelpers
 */
class RestApiHelpers{
    
    /**
     * CustomerToArray
     *
     * @param  Customer $customer
     * @param  mixed $withJwt
     * @return array
     */
    public static function CustomerToArray(Customer $customer, $withJwt = false) {
        $arr = [];
        $arr['firstname']   = $customer->firstname;
        $arr['lastname']    = $customer->lastname;
        $arr['email']       = $customer->email;
        $arr['id_customer'] = $customer->id;
        if ($withJwt) $arr['token'] = MainRestApi::createJwt($arr['email']);
        $cart_id = RestApiHelpers::getCustomerCartId($customer);
        if (!$cart_id) {
            $cart = new Cart();
            $cart->id_carrier = 0;
            $cart->setDeliveryOption(null);
            $cart->id_address_delivery = Address::getFirstCustomerAddressId((int) ($customer->id));
            $cart->id_address_invoice = Address::getFirstCustomerAddressId((int) ($customer->id));
            $cart->id_customer = (int) $customer->id;
            $cart->secure_key = $customer->secure_key;
            $cart->id_currency = 1;
            $cart->id_shop = 1;
            $cart->save();
            $cart_id = $cart->id;
        }
        $arr['cart_id'] = $cart_id;
        return $arr;
    }
    
    /**
     * getCustomerCartId
     *
     * @param  Customer $customer
     * @return void
     */
    public static function getCustomerCartId(Customer $customer) {
        $sql = 'SELECT c.`id_cart`
        FROM ' . _DB_PREFIX_ . 'cart c
            WHERE NOT EXISTS (SELECT 1 FROM ' . _DB_PREFIX_ . 'orders o WHERE o.`id_cart` = c.`id_cart`)
            AND c.`id_customer` = ' . (int) $customer->id . '
            ORDER BY c.`date_upd` DESC';
        $id_cart = Db::getInstance()->getValue($sql);
        if (!$id_cart) return false;
        return (int)$id_cart;
    }
}