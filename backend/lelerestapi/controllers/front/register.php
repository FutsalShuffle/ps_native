<?php
require_once dirname(__FILE__).'/../../classes/Main.php';
require_once dirname(__FILE__).'/../../classes/RestApiHelpers.php';
/**
 * LelerestapiRegisterModuleFrontController
 */
class LelerestapiRegisterModuleFrontController extends ModuleFrontController
{
    /** @var bool */
    public $ajax   = 1;
    public $errors = [];
    public $result = [];

    public function display()
    {
        if ($this->createAccount()) $this->ajaxDie(Tools::jsonEncode($this->result));
        $this->ajaxDie(Tools::jsonEncode($this->errors));
    }
    
    /**
     * createAccount
     *
     * @return bool
     */
    public function createAccount() {
        $firstname = Tools::getValue('firstname');
        $lastname  = Tools::getValue('lastname');
        $email     = Tools::getValue('email');
        $firstname = Tools::getValue('firstname');
        $password  = Tools::getValue('password');
        if (!$firstname || !$lastname) {
            $this->errors[] = 'Please enter your name';
        }
        if (!$email) {
            $this->errors[] = 'Please enter valid email';
        }
        if (!$password) {
            $this->errors[] = 'Please enter password';
        }
        if (!empty($this->errors))  {
            $this->errors['success'] = false;
            return false;
        }
        $customer = new Customer();
        if ($customer->getByEmail($email) && $customer->id) {
            $this->errors[] = 'User with this email already exists!';
            return false;
        }
        $customer->firstname = $firstname;
        $customer->lastname  = $lastname;
        $customer->email     = $email;
        $customer->passwd    = Tools::encrypt($password);
        $customer->deleted   = false;
        if ($customer->add()) {
            $this->result['success'] = true;
            $this->result['customer']  = RestApiHelpers::CustomerToArray($customer, true);
            return true;
        }
        $this->errors[] = 'Couldnt create a new user, sorry!';
        return false;
    }
}