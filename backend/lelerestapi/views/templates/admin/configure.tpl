{*
* 2007-2021 PrestaShop
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
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2021 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

<script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/header"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/embed@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/paragraph"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/image"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/list"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/delimiter"></script>
<script src="https://cdn.jsdelivr.net/npm/@editorjs/marker"></script>
<script src="https://cdn.jsdelivr.net/npm/editorjs-parser@1/build/Parser.browser.min.js"></script>

<div class="panel">
<div class="row block">
	<div class="col-md-12">
		<form class='block-submit-form' id="editorjsForm" method="post">
		<input type="hidden" id="mobile_index_json" value="asd" name="mobile_index_json">
		<input type="hidden" id="mobile_index_html" value="asd" name="mobile_index_html">
		<input type="hidden" id="submitLelerestapiModule" value="1" name="submitLelerestapiModule">
				<div class="panel-body">
					<div class="form-group">
						<div style="max-width:700px;" id="editorjs" class="editorjs"></div>
					</div>
					<div class="form-group">
						<input type="submit" class="btn btn-primary" value="Сохранить" id="saveEditorJs">
					</div>		
				</div>	
		</form>
	</div>
</div>
</div>

<script>
try {
	var prev_json_data = JSON.parse('{$prev_json}');
} catch (e) {
	var prev_json_data = '';
}


const editor = new EditorJS({
		holder: 'editorjs',
		onReady: () => {
			new DragDrop(editor)
		},
		data: prev_json_data,
		tools: {
			header: {
				class: Header,
				config: {
					placeholder: 'Введите заголовок',
					levels: [1, 2, 3],
					defaultLevel: 2
				},
				
			},
			paragraph: {
				class: Paragraph,
				inlineToolbar: true,
			},

			embed: {
				class: Embed,
				inlineToolbar: true
			},
			// table: {
			// 	class: Table,
			// },		
			image: {
				class: ImageTool,
				config: {
					endpoints: {
						byFile: '/modules/lelerestapi/upload.php', // Your backend file uploader endpoint
						//byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
					}
				}
			},
			list: {
				class: List,
				inlineToolbar: true,
			},
			delimiter: Delimiter,
			marker: {
				class: Marker,
				shortcut: 'CTRL+SHIFT+M',
			}

		},
	});

let saveBtn = document.getElementById('saveEditorJs');
saveBtn.addEventListener('click', function (e) {
	e.preventDefault();
	editor.save().then((outputData) => {

		var data = outputData;
		var form = document.getElementById('editorjsForm');
		saveData(data, form);
	}).catch((error) => {
		console.log('Saving failed: ', error)
	});
});

function saveData(data, form) {
	var parser = new edjsParser();
	var markup = parser.parse(data);
	$('#mobile_index_html').val(markup);
	$('#mobile_index_json').val(JSON.stringify(data));
	$('#editorjsForm').submit();
}

</script>