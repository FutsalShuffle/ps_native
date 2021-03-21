<?php

require_once dirname(__FILE__).'/../RestControllerAuth.php';

/**
 * LelerestapiVerifyModuleFrontController
 */
class LelerestapiVerifyModuleFrontController extends RestControllerAuth
{

    public function display()
    {
        $this->setResult('customer', $this->user);
        return $this->ajaxDie(Tools::jsonEncode($this->result));
    }

}