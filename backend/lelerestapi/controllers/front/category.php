<?php
require_once dirname(__FILE__).'/../RestController.php';

/**
 * LelerestapiCategoryModuleFrontController
 */
class LelerestapiCategoryModuleFrontController extends RestController
{
    public $category_id;
    public $p = 1;
    public $nbProducts = 15;

    public function __construct()
    {
        parent::__construct();
        $this->category_id = Tools::getValue('id_category', 0);
        if (!$this->category_id) {
            $this->set404();
            $this->ajaxDie(Tools::jsonEncode('Not Found'));
        }
        $this->p = (int)Tools::getValue('p', 1);
        $this->nbProducts = (int)Tools::getValue('nbProducts', 15);
        $this->id_lang = (int)Tools::getValue('id_lang', 1);
        $this->context->language = new Language($this->id_lang);
    }
    
    /**
     * display
     *
     * @return void
     */
    public function display()
    {
        $category = new Category((int)$this->category_id, false, $this->context->language->id);
        if (!$category->name) {
            $this->setErrors('category', 'Category doesnt exist');
            $this->set404();
            return $this->ajaxDie(Tools::jsonEncode($this->errors));
        }
        $this->setResult('category', $category);
        $this->setResult('products', $category->getProducts($this->context->language->id, $this->p, $this->nbProducts, null, null, false, true, false, 0, false, null));
        return $this->ajaxDie(Tools::jsonEncode($this->result));
    }
    
}