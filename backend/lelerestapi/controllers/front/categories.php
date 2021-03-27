<?php
require_once dirname(__FILE__).'/../RestController.php';

/**
 * LelerestapiCategoriesModuleFrontController
 */
class LelerestapiCategoriesModuleFrontController extends RestController
{

    public static $cache = [];

    public function display()
    {
        $category = new Category((int)Configuration::get('PS_HOME_CATEGORY'), $this->context->language->id);
        $this->setResult('categories', $this->getCategories($category));
        return $this->ajaxDie(Tools::jsonEncode($this->result));
    }
    
    /**
     * getCategories
     *
     * @param  Category $category
     * @return void
     */
    private function getCategories($category)
    {
        if (!isset(self::$cache[$category->id])) {
            $range = '';
            $maxdepth = 4;
            if (Validate::isLoadedObject($category)) {
                if ($maxdepth > 0) {
                    $maxdepth += $category->level_depth;
                }
                $range = 'AND nleft >= '.(int)$category->nleft.' AND nright <= '.(int)$category->nright;
            }

            $resultIds = array();
            $resultParents = array();
            $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS('
                SELECT c.id_parent, c.id_category, cl.name, cl.description, cl.link_rewrite
                FROM `'._DB_PREFIX_.'category` c
                INNER JOIN `'._DB_PREFIX_.'category_lang` cl ON (c.`id_category` = cl.`id_category` AND cl.`id_lang` = '.(int)$this->context->language->id.Shop::addSqlRestrictionOnLang('cl').')
                INNER JOIN `'._DB_PREFIX_.'category_shop` cs ON (cs.`id_category` = c.`id_category` AND cs.`id_shop` = '.(int)$this->context->shop->id.')
                WHERE (c.`active` = 1 OR c.`id_category` = '.(int)Configuration::get('PS_HOME_CATEGORY').')
                AND c.`id_category` != '.(int)Configuration::get('PS_ROOT_CATEGORY').'
                '.((int)$maxdepth != 0 ? ' AND `level_depth` <= '.(int)$maxdepth : '').'
                '.$range.'
                AND c.id_category IN (
                    SELECT id_category
                    FROM `'._DB_PREFIX_.'category_group`
                    WHERE `id_group` IN ('.pSQL(implode(', ', Customer::getGroupsStatic((int)$this->context->customer->id))).')
                )
                ORDER BY `level_depth` ASC, '.(Configuration::get('BLOCK_CATEG_SORT') ? 'cl.`name`' : 'cs.`position`').' '.(Configuration::get('BLOCK_CATEG_SORT_WAY') ? 'DESC' : 'ASC'));
            foreach ($result as &$row) {
                $resultParents[$row['id_parent']][] = &$row;
                $resultIds[$row['id_category']] = &$row;
            }

            self::$cache[$category->id] = $this->getTree($resultParents, $resultIds, $maxdepth, ($category ? $category->id : null));
        }

        return self::$cache[$category->id];
    }
    
    /**
     * getTree
     *
     * @param  mixed $resultParents
     * @param  mixed $resultIds
     * @param  mixed $maxDepth
     * @param  mixed $id_category
     * @param  mixed $currentDepth
     * @return array
     */
    public function getTree($resultParents, $resultIds, $maxDepth, $id_category = null, $currentDepth = 0)
    {
        if (is_null($id_category)) {
            $id_category = $this->context->shop->getCategory();
        }

        $children = [];

        if (isset($resultParents[$id_category]) && count($resultParents[$id_category]) && ($maxDepth == 0 || $currentDepth < $maxDepth)) {
            foreach ($resultParents[$id_category] as $subcat) {
                $children[] = $this->getTree($resultParents, $resultIds, $maxDepth, $subcat['id_category'], $currentDepth + 1);
            }
        }

        if (isset($resultIds[$id_category])) {
            $link = $this->context->link->getCategoryLink($id_category, $resultIds[$id_category]['link_rewrite']);
            $name = $resultIds[$id_category]['name'];
            $desc = $resultIds[$id_category]['description'];
        } else {
            $link = $name = $desc = '';
        }

        return [
            'id' => $id_category,
            'link' => $link,
            'name' => $name,
            'desc'=> $desc,
            'children' => $children
        ];
    }
}