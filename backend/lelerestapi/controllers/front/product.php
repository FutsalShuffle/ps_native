<?php
require_once dirname(__FILE__).'/../RestController.php';
/**
 * LelerestapiCategoryModuleFrontController
 */
class LelerestapiProductModuleFrontController extends RestController
{
    /** @var bool */
    public $id_product;

    public function __construct()
    {
        parent::__construct();
        $this->id_product = (int)Tools::getValue('id_product');
        if (!$this->id_product) {
            $this->ajaxDie(Tools::jsonEncode('Not Found'));
        }
    }
    
    /**
     * display
     *
     * @return void
     */
    public function display()
    {
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
        WHERE p.id_product = ' . $this->id_product;
        $row = Db::getInstance(_PS_USE_SQL_SLAVE_)->getRow($sql);
        if (!is_array($row)) {
            $this->errors['success'] = 0;
            $this->errors[] = 'Product doesnt exist';
            return $this->ajaxDie(Tools::jsonEncode($this->errors));
        }
        $this->setResult('product', Product::getProductProperties($this->context->language->id, $row));
        $this->setResult('images', Image::getImages($this->context->language->id, $this->id_product));
        if (Combination::isFeatureActive()) {
            $combinations = Db::getInstance()->executeS('SELECT pa.*, product_attribute_shop.*
            FROM `' . _DB_PREFIX_ . 'product_attribute` pa
            ' . Shop::addSqlAssociation('product_attribute', 'pa') . '
            WHERE pa.`id_product` = ' . (int) $this->id_product . '
            GROUP BY pa.`id_product_attribute`');


            if ($combinations) {
                $attribute_separator = ', ';
                $attribute_value_separator = ' - ';
                $product_attributes = array();
                foreach ($combinations as $combination) {
                    $product_attributes[] = (int) $combination['id_product_attribute'];
                }

                $lang = Db::getInstance()->executeS('SELECT pac.id_product_attribute, GROUP_CONCAT(agl.`name`, \'' . pSQL($attribute_value_separator) . '\',al.`name` ORDER BY agl.`id_attribute_group` SEPARATOR \'' . pSQL($attribute_separator) . '\') as attribute_designation
                        FROM `' . _DB_PREFIX_ . 'product_attribute_combination` pac
                        LEFT JOIN `' . _DB_PREFIX_ . 'attribute` a ON a.`id_attribute` = pac.`id_attribute`
                        LEFT JOIN `' . _DB_PREFIX_ . 'attribute_group` ag ON ag.`id_attribute_group` = a.`id_attribute_group`
                        LEFT JOIN `' . _DB_PREFIX_ . 'attribute_lang` al ON (a.`id_attribute` = al.`id_attribute` AND al.`id_lang` = ' . (int) $this->context->language->id . ')
                        LEFT JOIN `' . _DB_PREFIX_ . 'attribute_group_lang` agl ON (ag.`id_attribute_group` = agl.`id_attribute_group` AND agl.`id_lang` = ' . (int) $this->context->language->id . ')
                        WHERE pac.id_product_attribute IN (' . implode(',', $product_attributes) . ')
                        GROUP BY pac.id_product_attribute');

                foreach ($lang as $k => $row) {
                    $combinations[$k]['attribute_designation'] = $row['attribute_designation'];
                }
                foreach ($combinations as $key => $row) {
                    $cache_key = $row['id_product'] . '_' . $row['id_product_attribute'] . '_quantity';
                    if (!Cache::isStored($cache_key)) {
                        $result = StockAvailable::getQuantityAvailableByProduct($row['id_product'], $row['id_product_attribute']);
                        Cache::store(
                            $cache_key,
                            $result
                        );
                        $combinations[$key]['quantity'] = $result;
                    } else {
                        $combinations[$key]['quantity'] = Cache::retrieve($cache_key);
                    }
                }
                $this->setResult('combinations', $combinations);
                foreach ($this->result['combinations'] as $comb) {
                    if ($comb['default_on']) {
                        $this->result['product']['price'] = (float)$this->result['product']['price'] - (float)$comb['price'];
                    }
                }
            }
        };
        return $this->ajaxDie(Tools::jsonEncode($this->result));
    }
    
}