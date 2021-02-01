<?php
require_once dirname(__FILE__).'/../../classes/Main.php';
require_once dirname(__FILE__).'/../../classes/RestApiHelpers.php';
/**
 * LelerestapiVerifyModuleFrontController
 */
class LelerestapiVerifyModuleFrontController extends ModuleFrontController
{
    /** @var bool */
    public $ajax = 1;
    public $errors = [];
    public $result = [];

    public function display()
    {
        $customer = MainRestApi::validateUser();
        if (!$customer) $this->result['success'] = false;
        else {
            $this->result['success'] = true;
            $this->result['customer'] = $customer;
        }
        return $this->ajaxDie(Tools::jsonEncode($this->result));
    }


}