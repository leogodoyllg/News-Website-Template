/**
 * 
 */

function SubCategory(id, name){
	this.id = id
	this.name = name
	
}
function Category(cat_id,name, sub_cat){
	this.id = cat_id
	this.name = name
	this.sub_cat = SubCategory(sub_cat.sub_id, sub_cat.name)
	
}

