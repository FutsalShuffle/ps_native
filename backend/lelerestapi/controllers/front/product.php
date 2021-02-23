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
        $product = new Product((int)$this->id_product, true, $this->context->language->id);
        if (!$product->id) {
            $this->errors['success'] = 0;
            $this->errors[] = 'Product doesnt exist';
            return $this->ajaxDie(Tools::jsonEncode($this->errors));
        }
        $sql = 'SELECT p.*, product_shop.*, stock.`out_of_stock` out_of_stock, pl.`description`, pl.`description_short`,
        pl.`link_rewrite`, pl.`meta_description`, pl.`meta_keywords`, pl.`meta_title`, pl.`name`, pl.`available_now`, pl.`available_later`,
        p.`ean13`, p.`isbn`, p.`upc`, p.`mpn`, image_shop.`id_image` id_image, il.`legend`,
        DATEDIFF(product_shop.`date_add`, DATE_SUB("' . date('Y-m-d') . ' 00:00:00",
        INTERVAL ' . (Validate::isUnsignedInt(Configuration::get('PS_NB_DAYS_NEW_PRODUCT')) ? Configuration::get('PS_NB_DAYS_NEW_PRODUCT') : 20) . '
        DAY)) > 0 AS new
        FROM `' . _DB_PREFIX_ . 'product` p
        LEFT JOIN `' . _DB_PREFIX_ . 'product_lang` pl ON (
            p.`id_product` = pl.`id_product`
            AND pl.`id_lang` = ' . (int) $this->context->language->id . Shop::addSqlRestrictionOnLang('pl') . '
        )
        ' . Shop::addSqlAssociation('product', 'p') . '
        LEFT JOIN `' . _DB_PREFIX_ . 'image_shop` image_shop
            ON (image_shop.`id_product` = p.`id_product` AND image_shop.cover=1 AND image_shop.id_shop=' . (int) $this->context->shop->id . ')
        LEFT JOIN `' . _DB_PREFIX_ . 'image_lang` il ON (image_shop.`id_image` = il.`id_image` AND il.`id_lang` = ' . (int) $this->context->language->id . ')
        ' . Product::sqlStock('p', 0) . '
        WHERE p.id_product = ' . (int) $product->id;
        $row = Db::getInstance(_PS_USE_SQL_SLAVE_)->getRow($sql);

        $this->result['product'] = Product::getProductProperties($this->context->language->id, $row);
        $this->result['success'] = 1;
        //$this->result['product'] = $product;
        $this->result['images'] = Image::getImages($this->context->language->id, $product->id);
        $this->result['combinations'] = $product->getAttributesResume($this->context->language->id);
        foreach ($this->result['combinations'] as $comb) {
            if ($comb['default_on']) {
                $this->result['product']['price'] = (float)$this->result['product']['price'] - (float)$comb['price'];
            }
        }
        return $this->ajaxDie(Tools::jsonEncode($this->result));
    }
    
}