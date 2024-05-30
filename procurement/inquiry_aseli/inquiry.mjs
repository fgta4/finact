import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './inquiry.apis.mjs'
import * as pList from './inquiry-list.mjs'
import * as pEdit from './inquiry-edit.mjs'
import * as pEditItemgrid from './inquiry-itemgrid.mjs'
import * as pEditItemform from './inquiry-itemform.mjs'
import * as pEditFilesgrid from './inquiry-filesgrid.mjs'
import * as pEditFilesform from './inquiry-filesform.mjs'
import * as pEditApprovalgrid from './inquiry-approvalgrid.mjs'
import * as pEditApprovalform from './inquiry-approvalform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_edititemgrid = $('#pnl_edititemgrid')
const pnl_edititemform = $('#pnl_edititemform')
const pnl_editfilesgrid = $('#pnl_editfilesgrid')
const pnl_editfilesform = $('#pnl_editfilesform')
const pnl_editapprovalgrid = $('#pnl_editapprovalgrid')
const pnl_editapprovalform = $('#pnl_editapprovalform')



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
			{panel: pnl_edititemgrid, handler: pEditItemgrid},
			{panel: pnl_edititemform, handler: pEditItemform},
			{panel: pnl_editfilesgrid, handler: pEditFilesgrid},
			{panel: pnl_editfilesform, handler: pEditFilesform},
			{panel: pnl_editapprovalgrid, handler: pEditApprovalgrid},
			{panel: pnl_editapprovalform, handler: pEditApprovalform}			
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