<?php
require_once dirname(__FILE__).'/../../classes/Main.php';
require_once dirname(__FILE__).'/../../classes/RestApiHelpers.php';
/**
 * LelerestapiCategoryModuleFrontController
 */
class LelerestapiProductModuleFrontController extends ModuleFrontController
{
    /** @var bool */
    public $ajax = 1;
    public $errors = [];
    public $result = [];
    public $id_product;
    public $id_lang = 1;

    public function __construct()
    {
        parent::__construct();
        $this->id_product = Tools::getValue('id_product');
        if (!$this->id_product) {
            $this->ajaxDie(Tools::jsonEncode('Not Found'));
        }
        if (Tools::getValue('id_lang')) $this->id_lang = (int)Tools::getValue('id_lang');
        $this->context->language = new Language($this->id_lang);
    }
    
    /**
     * display
     *
     * @return void
     */
    public function display()
    {
        $product = new Product((int)$this->id_product, false, $this->context->language->id);
        if (!$product->id) {
            $this->errors['success'] = 0;
            $this->errors[] = 'Product doesnt exist';
            return $this->ajaxDie(Tools::jsonEncode($this->errors));
        }
        $this->result['success'] = 1;
        $this->result['product'] = $product;
        $this->result['images'] = $product->getImages($this->context->language->id);
        return $this->ajaxDie(Tools::jsonEncode($this->result));
    }
    
}