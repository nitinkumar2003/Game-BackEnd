const mongoose=require("mongoose");
const contactSchema=new mongoose.Schema({
	name:String,
	email:String,
	mobile:String,
	comment:String
})
module.exports=mongoose.model("contacts",contactSchema)