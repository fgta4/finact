import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './project.apis.mjs'
import * as pList from './project-list.mjs'
import * as pEdit from './project-edit.mjs'
import * as pEditTaskgrid from './project-taskgrid.mjs'
import * as pEditTaskform from './project-taskform.mjs'
import * as pEditDeptgrid from './project-deptgrid.mjs'
import * as pEditDeptform from './project-deptform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_edittaskgrid = $('#pnl_edittaskgrid')
const pnl_edittaskform = $('#pnl_edittaskform')
const pnl_editdeptgrid = $('#pnl_editdeptgrid')
const pnl_editdeptform = $('#pnl_editdeptform')



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
			{panel: pnl_edittaskgrid, handler: pEditTaskgrid},
			{panel: pnl_edittaskform, handler: pEditTaskform},
			{panel: pnl_editdeptgrid, handler: pEditDeptgrid},
			{panel: pnl_editdeptform, handler: pEditDeptform}			
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