<?php
require_once dirname(__FILE__).'/../RestController.php';
/**
 * LelerestapiCustomPageModuleFrontController
 */
class LelerestapiCustomPageModuleFrontController extends RestController
{
    public static $cache = [];

    public function display()
    {
       if (!isset(self::$cache['page'])) {
            $slides = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS('
                    SELECT hs.`id_homeslider_slides` as id_slide, hss.`position`, hss.`active`, hssl.`title`,
                    hssl.`url`, hssl.`legend`, hssl.`description`, hssl.`image`
                    FROM '._DB_PREFIX_.'homeslider hs
                    LEFT JOIN '._DB_PREFIX_.'homeslider_slides hss ON (hs.id_homeslider_slides = hss.id_homeslider_slides)
                    LEFT JOIN '._DB_PREFIX_.'homeslider_slides_lang hssl ON (hss.id_homeslider_slides = hssl.id_homeslider_slides)
                    WHERE id_shop = '.(int)$this->context->shop->id.'
                    AND hssl.id_lang = '.(int)$this->context->language->id.
                    ' AND hss.`active` = 1
                    ORDER BY hss.position'
            );

            foreach ($slides as &$slide) {
                $slide['image_url'] = $this->context->link->getMediaLink(_MODULE_DIR_.'ps_imageslider/images/'.$slide['image']);
            }
            $html = Configuration::get('MOBILE_INDEX_HTML');
            self::$cache['page']['html'] = utf8_encode(html_entity_decode(htmlspecialchars_decode($html)));
            self::$cache['page']['slides'] = $slides;
            self::$cache['page']['success'] = true;
            //$this->setResult('html', utf8_encode(html_entity_decode(htmlspecialchars_decode($html))));
            //$this->setResult('slides', $slides);
       }
       $this->ajaxDie(Tools::jsonEncode(self::$cache['page']));
    }
}