import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './payment.apis.mjs'
import * as pList from './payment-list.mjs'
import * as pEdit from './payment-edit.mjs'
import * as pEditDetilgrid from './payment-detilgrid.mjs'
import * as pEditDetilform from './payment-detilform.mjs'
import * as pEditPayment from './payment-payment.mjs'
import * as pEditReferencegrid from './payment-referencegrid.mjs'
import * as pEditReferenceform from './payment-referenceform.mjs'
import * as pEditResponsegrid from './payment-responsegrid.mjs'
import * as pEditResponseform from './payment-responseform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editdetilgrid = $('#pnl_editdetilgrid')
const pnl_editdetilform = $('#pnl_editdetilform')
const pnl_editpayment = $('#pnl_editpayment')
const pnl_editreferencegrid = $('#pnl_editreferencegrid')
const pnl_editreferenceform = $('#pnl_editreferenceform')
const pnl_editresponsegrid = $('#pnl_editresponsegrid')
const pnl_editresponseform = $('#pnl_editresponseform')



var pages = fgta4pages;
var slider = fgta4pageslider;


export const SIZE = {width:0, height:0}


export async function init(opt) {
	// $ui.grd_list = new fgta4grid()
	// $ui.grd_edit = new fgta4grid()

	global.fgta4grid = fgta4grid
	global.fgta4form = fgta4form

	$ui.apis = apis
	document.getElementsByTagName("body")[0].style.margin = '5px 5px 5px 5px'

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_list, handler: pList},
			{panel: pnl_edit, handler: pEdit},
			{panel: pnl_editdetilgrid, handler: pEditDetilgrid},
			{panel: pnl_editdetilform, handler: pEditDetilform},
			{panel: pnl_editpayment, handler: pEditPayment},
			{panel: pnl_editreferencegrid, handler: pEditReferencegrid},
			{panel: pnl_editreferenceform, handler: pEditReferenceform},
			{panel: pnl_editresponsegrid, handler: pEditResponsegrid},
			{panel: pnl_editresponseform, handler: pEditResponseform}			
		], opt)

	$ui.setPages(pages)


	document.addEventListener('OnButtonHome', (ev) => {
		if (ev.detail.cancel) {
			return
		}

		ev.detail.cancel = true;
		ExitModule();
	})
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	



	await PreloadData()

}


export function OnSizeRecalculated(width, height) {
	SIZE.width = width
	SIZE.height = height
}

export async function ExitModule() {
	$ui.home();
}



async function PreloadData() {
	
}