import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './recv.apis.mjs'
import * as pList from './recv-list.mjs'
import * as pEdit from './recv-edit.mjs'
import * as pEditItemsgrid from './recv-itemsgrid.mjs'
import * as pEditItemsform from './recv-itemsform.mjs'
import * as pEditRegistergrid from './recv-registergrid.mjs'
import * as pEditRegisterform from './recv-registerform.mjs'
import * as pEditMultiadd from './recv-multiadd.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_edititemsgrid = $('#pnl_edititemsgrid')
const pnl_edititemsform = $('#pnl_edititemsform')
const pnl_editregistergrid = $('#pnl_editregistergrid')
const pnl_editregisterform = $('#pnl_editregisterform')
const pnl_editmultiadd = $('#pnl_editmultiadd')



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
			{panel: pnl_edititemsgrid, handler: pEditItemsgrid},
			{panel: pnl_edititemsform, handler: pEditItemsform},
			{panel: pnl_editregistergrid, handler: pEditRegistergrid},
			{panel: pnl_editregisterform, handler: pEditRegisterform},
			{panel: pnl_editmultiadd, handler: pEditMultiadd}			
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