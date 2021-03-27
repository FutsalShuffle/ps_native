<?php

require_once dirname(__FILE__).'/../RestControllerAuth.php';

/**
 * LelerestapiCarriersModuleFrontController
 */
class LelerestapiCarriersModuleFrontController extends RestControllerAuth
{

    public function display()
    {
        $cart = new Cart((int)$this->user['cart_id']);
        $country = new Country((int)Tools::getValue('id_country', 1));
        $carriers = Carrier::getCarriersForOrder((int)$country->id_zone, null, $cart);
        $this->setResult('carriers', $carriers);
        return $this->ajaxDie(Tools::jsonEncode($this->result));
    }

}