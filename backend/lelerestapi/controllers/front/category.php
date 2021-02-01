<?php
require_once dirname(__FILE__).'/../../classes/Main.php';
require_once dirname(__FILE__).'/../../classes/RestApiHelpers.php';
/**
 * LelerestapiCategoryModuleFrontController
 */
class LelerestapiCategoryModuleFrontController extends ModuleFrontController
{
    /** @var bool */
    public $ajax = 1;
    public $errors = [];
    public $result = [];
    public $category_id;
    public $p = 1;
    public $nbProducts = 15;
    public $id_lang = 1;

    public function __construct()
    {
        parent::__construct();
        $this->category_id = Tools::getValue('id_category');
        if (!$this->category_id) {
            $this->ajaxDie(Tools::jsonEncode('Not Found'));
        }
        if (Tools::getValue('p')) $this->p = Tools::getValue('p');
        if (Tools::getValue('nbProducts')) $this->nbProducts = Tools::getValue('nbProducts');
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
        $category = new Category((int)$this->category_id, false, $this->context->language->id);
        if (!$category->name) {
            $this->errors['success'] = 0;
            $this->errors[] = 'Category doesnt exist';
            return $this->ajaxDie(Tools::jsonEncode($this->errors));
        }
        $this->result['success'] = 1;
        $this->result['category'] = $category;
        $this->result['products'] = $category->getProducts($this->context->language->id, $this->p, $this->nbProducts, null, null, false, true, false, 0, false, null);
        return $this->ajaxDie(Tools::jsonEncode($this->result));
    }
    
}