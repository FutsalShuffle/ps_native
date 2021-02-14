<?php
require_once dirname(__FILE__).'/../../classes/Main.php';
require_once dirname(__FILE__).'/../../classes/RestApiHelpers.php';
/**
 * LelerestapiRACartModuleFrontController
 */
class LelerestapiCustomPageModuleFrontController extends ModuleFrontController
{
    /** @var bool */
    public $ajax = 1;
    public $errors = [];
    public $result = [];
    public $id_lang = 1;

    public function display()
    {
        $html = Configuration::get('MOBILE_INDEX_HTML');
        //$result = ['success'=>1, 'html'=> $html];
        echo html_entity_decode(htmlspecialchars_decode($html));
        echo '
        <style>
        mark, .mark {
            background-color: yellow!important;
        }
        .fig-img {
            text-align: center;
        }
        .img-fullwidth {
            width: 100%;
        }
        .img-border {
            border: 1px solid gray;
        }
        .img-bg {
            width: 100%;
            height: 400px;
            object-fit: none;
            background:gray;
        }
        .img {
            max-width: 100%;
        }
        .markup {
            font-size: 16px;
        }
        .embed {
            text-align:center;
            max-height: 550px;
        }
        .embed iframe {
            width: 100%;
            height: -webkit-fill-available;
        }
        @media (max-width: 500px) {
            .embed {
                max-height: 250px;
            }
        }
        @media (max-width: 1000px) {
            .embed {
                max-height: 500px;
            }
        }
        .markup table {
            width:100%;
        }
        .markup table td {
            padding: 10px!important;
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
        }
        .markup table tr {
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
        }
        </style>';
       return;
    }
}