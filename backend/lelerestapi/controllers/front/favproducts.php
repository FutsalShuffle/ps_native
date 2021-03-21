<?php
require_once dirname(__FILE__).'/../RestControllerAuth.php';

class LelerestapiFavproductsModuleFrontController extends RestControllerAuth
{
	public $id_product;

	public function init()
	{
		parent::init();
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

	public function display()
	{
		if ($this->method == 'remove')
			$this->processRemove();
		else if ($this->method == 'add')
			$this->processAdd();
		else if ($this->method == 'list')
			$this->getList();
			
		$this->set403();
		die();
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
			$this->setErrors('errors', 'Not found');
		} else {
			$favprod = FavoriteProduct::getInstance($this->user['id_customer']);
			$favorite_product = $favprod->getFavoriteProduct((int)$product->id);
			if ($favorite_product && $favorite_product->delete()) {
				$ids = $favprod->getFavoriteProducts();
				foreach ($ids as $id_product){
					$prod = get_object_vars(new Product($id_product, true, (int)$this->context->language->id));
					$prod['id_product'] = $prod['id'];
					$cover = Product::getCover($id_product);
					$prod['id_image'] = $cover['id_image'];
					$products[] = $prod;
				}
				$products = Product::getProductsProperties((int)Context::getContext()->language->id, $products);
				$this->setResult('products', $products);
			} else {
				$this->setErrors('errors', 'Could not delete your product');
			}
		}
		return $this->ajaxDie(Tools::jsonEncode($this->result));
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
			$this->setErrors('errors', 'Not found');
		} else {
			$favprod = FavoriteProduct::getInstance($this->user['id_customer']);
			if($favprod->isCustomerFavoriteProduct((int)$product->id)) {
				$this->setErrors('errors', 'Already in favourite');
				return $this->ajaxDie(Tools::jsonEncode($this->result));
			} else {
				$favprod->id_product = $product->id;
				$favprod->id_shop = (int)Context::getContext()->shop->id;
				if ($favprod->add()) {
					$ids = $favprod->getFavoriteProducts();
					foreach ($ids as $id_product){
						$prod = get_object_vars(new Product($id_product, true, (int)$this->context->language->id));
						$prod['id_product'] = $prod['id'];
						$cover = Product::getCover($id_product);
						$prod['id_image'] = $cover['id_image'];
						$products[] = $prod;
					}
					$products = Product::getProductsProperties((int)Context::getContext()->language->id, $products);	
					$this->setResult('products', $products);
				} else {
					$this->setErrors('errors', 'Could not add this product to favourite');
				}
			}
		}
		return $this->ajaxDie(Tools::jsonEncode($this->result));
	}
}