import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as settings from './inquirytype.settings.mjs'
import * as apis from './inquirytype.apis.mjs'
import * as pList from './inquirytype-list.mjs'
import * as pEdit from './inquirytype-edit.mjs'
import * as pEditPartnertypegrid from './inquirytype-partnertypegrid.mjs'
import * as pEditPartnertypeform from './inquirytype-partnertypeform.mjs'
import * as pEditModeltransaksigrid from './inquirytype-modeltransaksigrid.mjs'
import * as pEditModeltransaksiform from './inquirytype-modeltransaksiform.mjs'
import * as pEditItemclassgrid from './inquirytype-itemclassgrid.mjs'
import * as pEditItemclassform from './inquirytype-itemclassform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editpartnertypegrid = $('#pnl_editpartnertypegrid')
const pnl_editpartnertypeform = $('#pnl_editpartnertypeform')
const pnl_editmodeltransaksigrid = $('#pnl_editmodeltransaksigrid')
const pnl_editmodeltransaksiform = $('#pnl_editmodeltransaksiform')
const pnl_edititemclassgrid = $('#pnl_edititemclassgrid')
const pnl_edititemclassform = $('#pnl_edititemclassform')



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
			{panel: pnl_editpartnertypegrid, handler: pEditPartnertypegrid},
			{panel: pnl_editpartnertypeform, handler: pEditPartnertypeform},
			{panel: pnl_editmodeltransaksigrid, handler: pEditModeltransaksigrid},
			{panel: pnl_editmodeltransaksiform, handler: pEditModeltransaksiform},
			{panel: pnl_edititemclassgrid, handler: pEditItemclassgrid},
			{panel: pnl_edititemclassform, handler: pEditItemclassform}			
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