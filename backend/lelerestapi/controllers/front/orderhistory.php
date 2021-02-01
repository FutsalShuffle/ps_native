<?php
require_once dirname(__FILE__).'/../../classes/Main.php';
require_once dirname(__FILE__).'/../../classes/RestApiHelpers.php';
/**
 * LelerestapiRACartModuleFrontController
 */
class LelerestapiOrderHistoryModuleFrontController extends ModuleFrontController
{
    /** @var bool */
    public $ajax = 1;
    public $errors = [];
    public $result = [];
    public $user;
    public $method = '';
    public $id_lang = 1;

    public function __construct()
    {
        parent::__construct();
        $this->user = MainRestApi::validateUser();
        $this->method = Tools::getValue('method');
        if (!$this->user['id_customer']) $this->ajaxDie(Tools::jsonEncode('Not Allowed'));
    }

    public function display()
    {
        $history = Order::getCustomerOrders((int)$this->user['id_customer']);
        if (!$history) $this->errors[] = "Couldn't get history data";
        if (!empty($this->errors)) return $this->ajaxDie(Tools::jsonEncode(['success' => 0, 'errors' => $this->errors]));
        $this->result['success'] = 1;
        $this->result['history'] = $history;
        $this->ajaxDie(Tools::jsonEncode($this->result));
    }
}