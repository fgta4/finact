import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './ordercontract.apis.mjs'
import * as pList from './ordercontract-list.mjs'
import * as pEdit from './ordercontract-edit.mjs'
import * as pEditItemgrid from './ordercontract-itemgrid.mjs'
import * as pEditItemform from './ordercontract-itemform.mjs'
import * as pEditTermgrid from './ordercontract-termgrid.mjs'
import * as pEditTermform from './ordercontract-termform.mjs'
import * as pEditAttachgrid from './ordercontract-attachgrid.mjs'
import * as pEditAttachform from './ordercontract-attachform.mjs'
import * as pEditApprovalgrid from './ordercontract-approvalgrid.mjs'
import * as pEditApprovalform from './ordercontract-approvalform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_edititemgrid = $('#pnl_edititemgrid')
const pnl_edititemform = $('#pnl_edititemform')
const pnl_edittermgrid = $('#pnl_edittermgrid')
const pnl_edittermform = $('#pnl_edittermform')
const pnl_editattachgrid = $('#pnl_editattachgrid')
const pnl_editattachform = $('#pnl_editattachform')
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
			{panel: pnl_edittermgrid, handler: pEditTermgrid},
			{panel: pnl_edittermform, handler: pEditTermform},
			{panel: pnl_editattachgrid, handler: pEditAttachgrid},
			{panel: pnl_editattachform, handler: pEditAttachform},
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