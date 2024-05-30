import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './itemasset.apis.mjs'
import * as pList from './itemasset-list.mjs'
import * as pEdit from './itemasset-edit.mjs'
import * as pEditSpecgrid from './itemasset-specgrid.mjs'
import * as pEditSpecform from './itemasset-specform.mjs'
import * as pEditFilesgrid from './itemasset-filesgrid.mjs'
import * as pEditFilesform from './itemasset-filesform.mjs'
import * as pEditDepregrid from './itemasset-depregrid.mjs'
import * as pEditDepreform from './itemasset-depreform.mjs'
import * as pEditBookinggrid from './itemasset-bookinggrid.mjs'
import * as pEditBookingform from './itemasset-bookingform.mjs'
import * as pEditMovinggrid from './itemasset-movinggrid.mjs'
import * as pEditMovingform from './itemasset-movingform.mjs'
import * as pEditMaintenancegrid from './itemasset-maintenancegrid.mjs'
import * as pEditMaintenanceform from './itemasset-maintenanceform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editspecgrid = $('#pnl_editspecgrid')
const pnl_editspecform = $('#pnl_editspecform')
const pnl_editfilesgrid = $('#pnl_editfilesgrid')
const pnl_editfilesform = $('#pnl_editfilesform')
const pnl_editdepregrid = $('#pnl_editdepregrid')
const pnl_editdepreform = $('#pnl_editdepreform')
const pnl_editbookinggrid = $('#pnl_editbookinggrid')
const pnl_editbookingform = $('#pnl_editbookingform')
const pnl_editmovinggrid = $('#pnl_editmovinggrid')
const pnl_editmovingform = $('#pnl_editmovingform')
const pnl_editmaintenancegrid = $('#pnl_editmaintenancegrid')
const pnl_editmaintenanceform = $('#pnl_editmaintenanceform')



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
			{panel: pnl_editspecgrid, handler: pEditSpecgrid},
			{panel: pnl_editspecform, handler: pEditSpecform},
			{panel: pnl_editfilesgrid, handler: pEditFilesgrid},
			{panel: pnl_editfilesform, handler: pEditFilesform},
			{panel: pnl_editdepregrid, handler: pEditDepregrid},
			{panel: pnl_editdepreform, handler: pEditDepreform},
			{panel: pnl_editbookinggrid, handler: pEditBookinggrid},
			{panel: pnl_editbookingform, handler: pEditBookingform},
			{panel: pnl_editmovinggrid, handler: pEditMovinggrid},
			{panel: pnl_editmovingform, handler: pEditMovingform},
			{panel: pnl_editmaintenancegrid, handler: pEditMaintenancegrid},
			{panel: pnl_editmaintenanceform, handler: pEditMaintenanceform}			
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