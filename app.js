const fs = require('fs');
const path = require('path');
const util = require("util");

const convertCsvtoJson = (file=path.join('./customer-data.csv'), file1=path.join('./customer-data.json'))=>{
	var content;
console.log(content);
fs.readFile(file, 'utf8',function (err,data) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    content = util.format(data);
    var arr = content.split('\r\n');
    
    function obj(id,first_name,last_name,email,gender,ip_address,ssn,credit_card,bitcoin,street_address){
	    this.id=id;
	    this.first_name=first_name;
	    this.last_name=last_name;
	    this.email=email;
	    this.gender=gender;
	    this.ip_address=ip_address;
	    this.ssn=ssn;
	    this.credit_card=credit_card;
	    this.bitcoin=bitcoin;
	    this.street_address=street_address;
    }

    fs.writeFile(file1, '[',(err)=>{
    	if (err) {throw err;}
    });

    for(i in arr){
    	var customerData = arr[i];
    	var arr2 = customerData.split(",");
	
    	var details = new obj(arr2[0],arr2[1],arr2[2],arr2[3],arr2[4],arr2[5],arr2[6],arr2[7],arr2[8],arr2[9]);
    	
    	var Details = JSON.stringify(details);
    	arr.splice(i,1,'\n\t' + Details);
    }

    arr.shift();
    arr.pop();

    fs.appendFile(file1, arr + '\n]',(err)=>{
    	if (err) {throw err;}
    	console.log('Saved to customer-data.json!');
    });

});
}

convertCsvtoJson(process.argv[2]);