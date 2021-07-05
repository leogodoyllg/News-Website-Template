function Shipment(address, contact, promisedDate, deliveredDate ){
	this.address = address
	this.contact = contact || null
	this.promisedDate = promisedDate
	this.deliveredDate = deliveredDate || null
}