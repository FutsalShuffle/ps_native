<?php

class FavoriteProductAccount extends FavoriteProduct  
{
    public $id;

	public $id_product;

	public $id_customer;

	public $id_shop;

	public $date_add;

	public $date_upd;
    
    /**
	 * @see ObjectModel::$definition
	 */
	public static $definition = array(
		'table' => 'favorite_product',
		'primary' => 'id_favorite_product',
		'fields' => array(
			'id_product' =>		array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt', 'required' => true),
			'id_customer' =>	array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt', 'required' => true),
			'id_shop' =>		array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt', 'required' => true),
			'date_add' =>		array('type' => self::TYPE_DATE, 'validate' => 'isDate'),
			'date_upd' =>		array('type' => self::TYPE_DATE, 'validate' => 'isDate'),
		),
	);
    
    public function getFavoriteProducts()
	{
		$favoriteProducts = array();
		$res = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS('
			SELECT DISTINCT p.`id_product`
			FROM `'._DB_PREFIX_.'favorite_product` fp
			LEFT JOIN `'._DB_PREFIX_.'product` p ON (p.`id_product` = fp.`id_product`)
			'.Shop::addSqlAssociation('product', 'p').'
			LEFT OUTER JOIN `'._DB_PREFIX_.'product_attribute` pa ON (p.`id_product` = pa.`id_product`)
			'.Shop::addSqlAssociation('product_attribute', 'pa', false).'
			WHERE product_shop.`active` = 1
			'.($this->id_customer ? ' AND fp.id_customer = '.(int)$this->id_customer : '').'
			'.Shop::addSqlRestriction(false, 'fp')
		);
		
		if ($res) {
			foreach ($res as $row) {
				$favoriteProducts[] = $row['id_product'];
			}
		}
		
		return $favoriteProducts;
	}
    
    public function getFavoriteProduct($id_product, $shop = null)
	{
		if (!$shop)
			$shop = Context::getContext()->shop;

		$id_favorite_product = Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue('
			SELECT `id_favorite_product`
			FROM `'._DB_PREFIX_.'favorite_product`
			WHERE `id_customer` = '.(int)$this->id_customer.'
			AND `id_product` = '.(int)$id_product.'
			AND `id_shop` = '.(int)$shop->id
		);

		if ($id_favorite_product)
			return new self($id_favorite_product);
		return null;
	}
    
    
    public function isCustomerFavoriteProduct($id_product, Shop $shop = null)
	{
		if (!$shop)
			$shop = Context::getContext()->shop;

		return (bool)Db::getInstance()->getValue('
			SELECT COUNT(*)
			FROM `'._DB_PREFIX_.'favorite_product`
			WHERE `id_customer` = '.(int)$this->id_customer.'
			AND `id_product` = '.(int)$id_product.'
			AND `id_shop` = '.(int)$shop->id);
	}
}