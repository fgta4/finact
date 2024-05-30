import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as settings from './itemstock.settings.mjs'
import * as apis from './itemstock.apis.mjs'
import * as pList from './itemstock-list.mjs'
import * as pEdit from './itemstock-edit.mjs'
import * as pEditBarcodegrid from './itemstock-barcodegrid.mjs'
import * as pEditBarcodeform from './itemstock-barcodeform.mjs'
import * as pEditPropgrid from './itemstock-propgrid.mjs'
import * as pEditPropform from './itemstock-propform.mjs'
import * as pEditPositiongrid from './itemstock-positiongrid.mjs'
import * as pEditPositionform from './itemstock-positionform.mjs'
import * as pEditCompoundgrid from './itemstock-compoundgrid.mjs'
import * as pEditCompoundform from './itemstock-compoundform.mjs'
import * as pEditConversiongrid from './itemstock-conversiongrid.mjs'
import * as pEditConversionform from './itemstock-conversionform.mjs'
import * as pEditPicturegrid from './itemstock-picturegrid.mjs'
import * as pEditPictureform from './itemstock-pictureform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editbarcodegrid = $('#pnl_editbarcodegrid')
const pnl_editbarcodeform = $('#pnl_editbarcodeform')
const pnl_editpropgrid = $('#pnl_editpropgrid')
const pnl_editpropform = $('#pnl_editpropform')
const pnl_editpositiongrid = $('#pnl_editpositiongrid')
const pnl_editpositionform = $('#pnl_editpositionform')
const pnl_editcompoundgrid = $('#pnl_editcompoundgrid')
const pnl_editcompoundform = $('#pnl_editcompoundform')
const pnl_editconversiongrid = $('#pnl_editconversiongrid')
const pnl_editconversionform = $('#pnl_editconversionform')
const pnl_editpicturegrid = $('#pnl_editpicturegrid')
const pnl_editpictureform = $('#pnl_editpictureform')



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
			{panel: pnl_editbarcodegrid, handler: pEditBarcodegrid},
			{panel: pnl_editbarcodeform, handler: pEditBarcodeform},
			{panel: pnl_editpropgrid, handler: pEditPropgrid},
			{panel: pnl_editpropform, handler: pEditPropform},
			{panel: pnl_editpositiongrid, handler: pEditPositiongrid},
			{panel: pnl_editpositionform, handler: pEditPositionform},
			{panel: pnl_editcompoundgrid, handler: pEditCompoundgrid},
			{panel: pnl_editcompoundform, handler: pEditCompoundform},
			{panel: pnl_editconversiongrid, handler: pEditConversiongrid},
			{panel: pnl_editconversionform, handler: pEditConversionform},
			{panel: pnl_editpicturegrid, handler: pEditPicturegrid},
			{panel: pnl_editpictureform, handler: pEditPictureform}			
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