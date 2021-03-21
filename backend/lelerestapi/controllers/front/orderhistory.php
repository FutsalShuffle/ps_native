<?php
require_once dirname(__FILE__).'/../RestControllerAuth.php';

/**
 * LelerestapiRACartModuleFrontController
 */
class LelerestapiOrderHistoryModuleFrontController extends RestControllerAuth
{
    public function display()
    {
        $history = Order::getCustomerOrders((int)$this->user['id_customer']);
        $this->setResult('history',$history);
        if (!$history) {
            $this->setErrors('history', "Couldn't get history data");
        }
        $this->ajaxDie(Tools::jsonEncode($this->result));
    }
}