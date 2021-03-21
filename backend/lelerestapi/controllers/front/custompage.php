<?php
require_once dirname(__FILE__).'/../RestController.php';
/**
 * LelerestapiCustomPageModuleFrontController
 */
class LelerestapiCustomPageModuleFrontController extends RestController
{
    /** @var bool */
    public function display()
    {
       $html = Configuration::get('MOBILE_INDEX_HTML');
       $this->setResult('html', utf8_encode(html_entity_decode(htmlspecialchars_decode($html))));
       $this->ajaxDie(Tools::jsonEncode($this->result));
    }
}