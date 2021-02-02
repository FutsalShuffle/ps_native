<?php

require_once('FavoriteProductAccount.php');

abstract class FavoriteProduct extends ObjectModel
{
	public $id_product;

	public $id_customer;
    
    public static function getInstance($customer_id)
    {
        $fv = new FavoriteProductAccount();
        $fv->id_customer = $customer_id;
        return $fv;
    }
	
}
