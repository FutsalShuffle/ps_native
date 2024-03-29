<?php

require_once dirname(__FILE__).'/../classes/Main.php';
require_once dirname(__FILE__).'/../classes/RestApiHelpers.php';

class RestController extends ModuleFrontController
{
    public $ajax = 1;
    public $result = [];
    public $method = '';
    public $id_lang;

    public function init()
	{
		parent::init();
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

    public function set404()
    {
        header("HTTP/1.0 404 Not Found");
    }

}