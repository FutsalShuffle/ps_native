<?php
require_once dirname(__FILE__).'/../../classes/Main.php';
require_once dirname(__FILE__).'/../../classes/RestApiHelpers.php';
class LelerestapiLoginModuleFrontController extends ModuleFrontController
{
    /** @var bool */
    public $ajax = 1;
    public $errors = [];
    public $result = [];

    public function display()
    {
        $this->login();
        if (empty($this->result)) return $this->ajaxDie(Tools::jsonEncode($this->errors));
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
            $this->errors[] = 'Please enter valid email';
            return false;
        }
        if (!$password) {
            $this->errors[] = 'Please enter password';
            return false;

        }
        if ($this->errors) return false;
        $customer = new Customer();

        if (!$customer->getByEmail($email, $password) && !$customer->id) {
            $this->errors[] = 'Email or password is not correct';
            return false;
        }
        $this->result['success']  = true;
        $this->result['customer'] = RestApiHelpers::CustomerToArray($customer, true);
        return true;
    }
}