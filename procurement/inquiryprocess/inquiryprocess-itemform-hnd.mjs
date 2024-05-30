let form, obj, opt;

export function init(param) {
	form = param.form;
	obj = param.obj;
	opt = param.opt;

	// form.setDataChangeMessage('<div>Data Berubah, Apakah anda akan <b>membatalkan</b> perubahan ?</div>');

}


export function cbo_proc_trxmodel_id_dataloading(criteria, options) {
	var header_data = form.getHeaderData();

	options.api = `finact/master/trxmodel/list-selector-byinquirytype`;
	criteria.inquirytype_id = header_data.inquirytype_id;
	
}


export function form_dataopened(result, options) {

	console.log(result.record);

	var promptMandatory = form.getDefaultPrompt(true)
	var promptOptional = form.getDefaultPrompt(false)


	var inquirytype_isqtybreakdown = result.record.inquirytype_isqtybreakdown;

	if (inquirytype_isqtybreakdown==1) {
		$('.pnl_edititemform_row.txt_inquirydetil_qty_outstd').hide();
		$('.pnl_edititemform_row.cbo_outstd_trxmodel_id').hide();	
	} else {
		$('.pnl_edititemform_row.txt_inquirydetil_qty_outstd').show();
		$('.pnl_edititemform_row.cbo_outstd_trxmodel_id').show();	
	}


	$('#pnl_edititemform-btn_edit').linkbutton('enable');
	form.setViewMode(false);
	
	var itemmanage_id = result.record.itemmanage_id;

	var inquiry_selectfield = result.record.inquiry_selectfield;
	var showitemasset = inquiry_selectfield.charAt(0)=="1" ? true : false;
	var showitem = inquiry_selectfield.charAt(1)=="1" ? true : false;
	var showitemstock = inquiry_selectfield.charAt(2)=="1" ? true : false;	 
	var showpartner = inquiry_selectfield.charAt(3)=="1" ? true : false;
	var showitemclass = inquiry_selectfield.charAt(4)=="1" ? true : false;
	var itemclassdisabled = inquiry_selectfield.charAt(5)=="1" ? true : false;


	// form_row pnl_edititemform_row cbo_itemasset_id
	var el_asset_class = '.form_row.pnl_edititemform_row.cbo_itemasset_id';
	var el_trxmodel_class = '.form_row.pnl_edititemform_row.cbo_proc_trxmodel_id';
	var el_id_class = '.form_row.pnl_edititemform_row.txt_inquiryitem_id';
	
	var asset_harus_dipilih = false;
	if (itemmanage_id=='AS' || showitemasset) {
		form.itemmanage_isasset = true;

		$('.pnl_edititemform_row.cbo_itemasset_id').show();
		
		// pindahkan ke bawah form_row pnl_edititemform_row cbo_proc_trxmodel_id
		$(el_asset_class).insertAfter($(el_asset_class).parent().find(el_trxmodel_class));


		if (result.record.proc_trxmodel_id=='USE') {
			asset_harus_dipilih = true;
		} else {
			asset_harus_dipilih = false;
		}

		form.setDisable(obj.cbo_itemasset_id, false);


	} else {
		form.itemmanage_isasset = false;
		asset_harus_dipilih = false;

		$('.pnl_edititemform_row.cbo_itemasset_id').hide();
		
		// pindahkan ke bawah form_row pnl_edititemform_row txt_inquiryitem_id
		$(el_asset_class).insertAfter($(el_asset_class).parent().find(el_id_class));
	

		form.setDisable(obj.cbo_itemasset_id, true);

	}



	
	if (asset_harus_dipilih) {
		// asset harus diisi
		obj.cbo_itemasset_id.revalidate({
			required: true, invalidMessage:  'Asset harus diisi', prompt: form.getDefaultPrompt(true).text,
			validType: "requiredcombo['pnl_edititemform-cbo_itemasset_id']",
		});
		form.setValue(obj.cbo_itemasset_id, promptMandatory.value, promptMandatory.text);
	} else {
		// asset boleh kosong
		obj.cbo_itemasset_id.revalidate({
			required: false, invalidMessage: null, prompt: form.getDefaultPrompt(false).text,
			validType: null,
		});	
		form.setValue(obj.cbo_itemasset_id, promptOptional.value, promptOptional.text);
	}

	// if (!form.isEventSuspended()) {};



	if (showitem) {
		$('.pnl_edititemform_row.cbo_item_id').show();
	} else {
		$('.pnl_edititemform_row.cbo_item_id').hide();
	}

	if (showitemstock) {
		$('.pnl_edititemform_row.cbo_itemstock_id').show();
	} else {
		$('.pnl_edititemform_row.cbo_itemstock_id').hide();
	}

	if (showpartner) {
		$('.pnl_edititemform_row.cbo_partner_id').show();
	} else {
		$('.pnl_edititemform_row.cbo_partner_id').hide();
	}

	if (showitemclass) {
		$('.pnl_edititemform_row.cbo_itemclass_id').show();
	} else {
		$('.pnl_edititemform_row.cbo_itemclass_id').hide();
	}

	if (itemclassdisabled) {
		form.setDisable(obj.cbo_itemclass_id, true)
	} else {
		form.setDisable(obj.cbo_itemclass_id, false)
	}

	var isconfirm = form.getValue(obj.chk_inquiryitem_isconfirm);
	if (!isconfirm) {
		setTimeout(()=>{
			form.markDataChanged();
		}, 500);
	}


}



export function cbo_proc_trxmodel_id_selected(value, display, record, args) {
	if (form.isEventSuspended()) {
		return;
	};

	var promptMandatory = form.getDefaultPrompt(true)
	var promptOptional = form.getDefaultPrompt(false)



	if (form.itemmanage_isasset & record.trxmodel_id=='USE') {
		obj.cbo_itemasset_id.revalidate({
			required: true, invalidMessage:  'Asset harus diisi', prompt: form.getDefaultPrompt(true).text,
			validType: "requiredcombo['pnl_edititemform-cbo_itemasset_id']",
		});
		form.setValue(obj.cbo_itemasset_id, promptMandatory.value, promptMandatory.text);

	} else {
		obj.cbo_itemasset_id.revalidate({
			required: false, invalidMessage: null, prompt: form.getDefaultPrompt(false).text,
			validType: null,
		});	
		form.setValue(obj.cbo_itemasset_id, promptOptional.value, promptOptional.text);

	}
}