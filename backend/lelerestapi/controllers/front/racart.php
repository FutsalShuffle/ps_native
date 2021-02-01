<?php
require_once dirname(__FILE__).'/../../classes/Main.php';
require_once dirname(__FILE__).'/../../classes/RestApiHelpers.php';
/**
 * LelerestapiRACartModuleFrontController
 */
class LelerestapiRACartModuleFrontController extends ModuleFrontController
{
    /** @var bool */
    public $ajax = 1;
    public $errors = [];
    public $result = [];
    public $user;
    public $method = '';
    public $id_lang = 1;

    public function __construct()
    {
        parent::__construct();
        $this->user = MainRestApi::validateUser();
        $this->method = Tools::getValue('method');
        if (!$this->user['cart_id']) $this->ajaxDie(Tools::jsonEncode('Not Allowed'));
        if (!$this->method) $this->ajaxDie(Tools::jsonEncode('Not Allowed'));
    }

    public function display()
    {
        if ($this->method == 'addToCart') $this->addToCart();
        if ($this->method == 'getMyCart') $this->getMyCart();
        if ($this->method == 'getAvailableCountries') $this->getAvailableCountries();
        if ($this->method == 'updateQty') $this->updateQuantity();
        if (!empty($this->errors)) return $this->ajaxDie(Tools::jsonEncode(['success' => 0, 'errors' => $this->errors]));
        return $this->ajaxDie(Tools::jsonEncode($this->success));
    }
    
    /**
     * addToCart
     *
     * @return Cart|bool
     */
    public function addToCart() {
        $cart = new Cart($this->user['cart_id']);
        $id_product = Tools::getValue('id_product');
        $quantity = Tools::getValue('quantity', 1);
        $id_product_attribute = Tools::getValue('id_product_attribute', null);
        if (!$id_product) $this->errors[] = 'No product specified';
        if (!empty($this->errors)) return false;
        $cart->updateQty($quantity, $id_product, $id_product_attribute);
        $this->success[] = 'Product was added to cart!';
        $this->success['cart'] = $cart->getProducts();
        return $cart;
    }
    
    /**
     * getMyCart
     *
     * @return Cart|bool
     */
    public function getMyCart() {
        $cart = new Cart($this->user['cart_id']);
        $this->success['success'] = true;
        $this->success['cart'] = $cart->getProducts();
        return $cart;
    }

    public function getAvailableCountries() {
        $countrylist = Country::getCountries($this->id_lang, true);
        $this->success['success'] = true;
        $this->success['countries'] = $countrylist;
        return true;
    }

    public function getAvailableCarriers() {
        return;
    }

    public function updateQuantity() {
        $cart = new Cart($this->user['cart_id']);
        if (!Tools::getValue('quantity', false)) $this->errors[] = "Can't set a 0 quantity";
        if (!empty($this->errors)) return false;
        if ($cart->updateQty(
            Tools::getValue('quantity'),
            Tools::getValue('id_product'),
            Tools::getValue('id_product_attribute'),
            0,
            Tools::getValue('op', 'up'),
            0,
            null,
            true,
            false
        )) {
            $this->success['success'] = true;
            $this->success['cart'] = $cart->getProducts();
        }
        else {
            $this->errors[] = "Error occured";
            return false;
        } 
    }
}