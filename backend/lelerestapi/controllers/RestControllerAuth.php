<?php

require_once dirname(__FILE__).'/../classes/Main.php';
require_once dirname(__FILE__).'/../classes/RestApiHelpers.php';
require_once dirname(__FILE__).'/../classes/FavoriteProduct.php';

class RestControllerAuth extends ModuleFrontController
{
    public $ajax = 1;
    public $result = [];
    public $method = '';
    public $id_lang;
    public $user;

    public function init()
	{
		parent::init();
        $this->user = MainRestApi::validateUser();
        if (!$this->user) {
            $this->set403();
            die();
        }
        $this->id_lang = Tools::getValue('id_lang', 1);
        $this->method = Tools::getValue('method');
		$this->context->language = new Language((int)$this->id_lang);
	}

    public function setResult($key, $value)
    {
        $this->result['success'] = 1;
        $this->result[$key] = $value;
    }

    public function setErrors($key, $value)
    {
        $this->result['success'] = 0;
        $this->result['errors'][$key] = $value;
    }
    public function set403()
    {
        header('HTTP/1.0 403 Forbidden');
    }

}