<?php
require_once dirname(__FILE__).'/../RestController.php';

class LelerestapiLoginModuleFrontController extends RestController
{

    public function display()
    {
        $this->login();
        return $this->ajaxDie(Tools::jsonEncode($this->result));
    }
    
    /**
     * login
     *
     * @return bool
     */
    public function login() {
        $email = Tools::getValue('email');
        $password = Tools::getValue('password');
        if (!$email) {
            $this->setErrors('email', 'Please enter valid email');
        }
        if (!$password) {
            $this->setErrors('password', 'Please enter password');
        }
        if (!empty($this->errors)) $this->ajaxDie(Tools::jsonEncode($this->result));
        $customer = new Customer();
        if (!$customer->getByEmail($email, $password) && !$customer->id) {
            $this->setErrors('customer', 'Email or password is not correct');
        }
        if (!empty($this->errors)) $this->ajaxDie(Tools::jsonEncode($this->result));
        $this->setResult('customer', RestApiHelpers::CustomerToArray($customer, true));
    }
}