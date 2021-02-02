<?php
/*
* 2007-2015 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2015 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

/**
 * @since 1.5.0
 */
require_once dirname(__FILE__).'/../../classes/Main.php';
require_once dirname(__FILE__).'/../../classes/RestApiHelpers.php';
require_once dirname(__FILE__).'/../../classes/FavoriteProduct.php';

class LelerestapiFavproductsModuleFrontController extends ModuleFrontController
{
	/**
	 * @var int
	 */
	public $ajax = 1;
	public $id_product;
	public $id_lang = 1;

	public function init()
	{
		parent::init();
		$this->user = MainRestApi::validateUser();
		$this->context->language = new Language((int)$id_lang);
		if (!$this->user['cart_id']) $this->ajaxDie(Tools::jsonEncode('Not Allowed'));
		$this->id_product = (int)Tools::getValue('id_product');
	}

	public function getList() 
	{
		$favprod = FavoriteProduct::getInstance($this->user['id_customer']);
		$ids = $favprod->getFavoriteProducts();
		$products = array();
		foreach ($ids as $id_product){
			$prod = get_object_vars(new Product($id_product, true, (int)$this->context->language->id));
			$prod['id_product'] = $prod['id'];
			$cover = Product::getCover($id_product);
			$prod['id_image'] = $cover['id_image'];
			$products[] = $prod;
		}
		$products = Product::getProductsProperties((int)Context::getContext()->language->id, $products);
		return $this->ajaxDie(Tools::jsonEncode(['success'=>1, 'products'=> $products]));
	}

	public function postProcess()
	{
		if (Tools::getValue('action') == 'remove')
			$this->processRemove();
		else if (Tools::getValue('action') == 'add')
			$this->processAdd();
		else if (Tools::getValue('action') == 'list')
			$this->getList();
		exit;
	}

	/**
	 * Remove a favorite product
	 */
	public function processRemove()
	{		
		// check if product exists
		$product = new Product($this->id_product);
		$products = array();
		if (!Validate::isLoadedObject($product)) {
			$result = 'error';
		} else {
			$favprod = FavoriteProduct::getInstance($this->user['id_customer']);
			$favorite_product = $favprod->getFavoriteProduct((int)$product->id);
			if ($favorite_product && $favorite_product->delete()) {
				$result = 'removed';
				$ids = $favprod->getFavoriteProducts();
				foreach ($ids as $id_product){
					$prod = get_object_vars(new Product($id_product, true, (int)$this->context->language->id));
					$prod['id_product'] = $prod['id'];
					$cover = Product::getCover($id_product);
					$prod['id_image'] = $cover['id_image'];
					$products[] = $prod;
				}
				$products = Product::getProductsProperties((int)Context::getContext()->language->id, $products);
			} else {
				$result = 'error';
			}
		}
		die(json_encode(
			array(
				'result' => $result,
				'products' => $products,
			)
		));
	}

	/**
	 * Add a favorite product
	 */
	public function processAdd()
	{
		$product = new Product($this->id_product);
		$products = array();
		// check if product exists
		if (!Validate::isLoadedObject($product)) {
			$result = 'error';
		} else {
			$favprod = FavoriteProduct::getInstance($this->user['id_customer']);
			if($favprod->isCustomerFavoriteProduct((int)$product->id)) {
				$result = 'alreadyFaved';
			} else {
				$favprod->id_product = $product->id;
				$favprod->id_shop = (int)Context::getContext()->shop->id;
				if ($favprod->add()) {
					$result = 'added';
					$ids = $favprod->getFavoriteProducts();
					foreach ($ids as $id_product){
						$prod = get_object_vars(new Product($id_product, true, (int)$this->context->language->id));
						$prod['id_product'] = $prod['id'];
						$cover = Product::getCover($id_product);
						$prod['id_image'] = $cover['id_image'];
						$products[] = $prod;
					}
					$products = Product::getProductsProperties((int)Context::getContext()->language->id, $products);
				} else {
					$result = 'error';
				}
			}
		}
		die(json_encode(
			array(
				'result' => $result,
				'products' => $products,
			)
		));
		
	}
}