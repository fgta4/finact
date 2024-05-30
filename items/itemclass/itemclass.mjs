import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as settings from './itemclass.settings.mjs'
import * as apis from './itemclass.apis.mjs'
import * as pList from './itemclass-list.mjs'
import * as pEdit from './itemclass-edit.mjs'
import * as pEditAccountgrid from './itemclass-accountgrid.mjs'
import * as pEditAccountform from './itemclass-accountform.mjs'
import * as pEditFilesgrid from './itemclass-filesgrid.mjs'
import * as pEditFilesform from './itemclass-filesform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editaccountgrid = $('#pnl_editaccountgrid')
const pnl_editaccountform = $('#pnl_editaccountform')
const pnl_editfilesgrid = $('#pnl_editfilesgrid')
const pnl_editfilesform = $('#pnl_editfilesform')



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

	opt.variancedata = global.setup.variancedata;
	settings.setup(opt);

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_list, handler: pList},
			{panel: pnl_edit, handler: pEdit},
			{panel: pnl_editaccountgrid, handler: pEditAccountgrid},
			{panel: pnl_editaccountform, handler: pEditAccountform},
			{panel: pnl_editfilesgrid, handler: pEditFilesgrid},
			{panel: pnl_editfilesform, handler: pEditFilesform}			
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