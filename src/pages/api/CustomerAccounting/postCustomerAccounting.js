// export default function handler(req, res) {
//     var AWS = require("aws-sdk");

//     AWS.config.update({
//         region: 'us-west-1',
//         accessKeyId: 'accessKeyId',
//         secretAccessKey: 'secretAccessKey',
//         endpoint: new AWS.Endpoint('http://localhost:8000'),
//     });

//     var docClient = new AWS.DynamoDB.DocumentClient();
//     var table = "patientbilling";
//     var bill_id = 7;
//     var receipt_id;
//     var customer_id = 3; 
//     var Name = "Alisha"//req.body.Name; //This will be passed by UI
//     console.log("Name",Name);
//     var Email = "alisha@123"//req.body.Email; //This will be passed by UI
//     console.log("Email",Email );
    
//     var returnMessage = ""; 
//     var http = require('http');        
//             var data = {
//                 counterName: table,
//                 customerID: customer_id
//             };
//             var counter_value;
//             var dataString = JSON.stringify(data);
//             var postheaders = {
//                 'Content-Type' : 'application/json',
//                 'Content-Length' : dataString.length
//             };
//             var post_requst = {
//                 host: "localhost",
//                 port: "3000",
//                 path: "/api/Utils/getCounterValue",
//                 method: "POST",
//                 headers: postheaders
//             };
//             console.log("calling the request");
//             var reqPost = http.request(post_requst, function(res) {
//                 console.log("statusCode: ", res.statusCode);
//                 res.on('data', function(d) {
//                     console.info('POST result:\n');
//                     process.stdout.write(d);
        
//                    console.log("Body--", JSON.parse(d));
//                    JSON.parse(d).Items.forEach(function(item) {
//                     //name: 'John Doe'
//                     receipt_id = parseInt(item.counter_value); //JSON.stringify(data)
                          
//                     console.log("counter_value:", receipt_id+1);
//                     receipt_id = receipt_id+1;
//                     console.log("Bill Id", receipt_id);
//                     var params = { 
//                         TableName:table,
//                         Item:{
//                             "receipt_id" : receipt_id,
//                             "customer_id": customer_id,   
//                             "namee" : Name,
//                             "email": Email,   
//                             "bill_id":bill_id                        
//                         }
//                     };                
//                     try{
//                         var returnMessage = "Posting Customer Appointments ...";
//                         console.log("posting ... ");
//                         docClient.put(params, function(err, data) {
//                             if (err) {
//                                 console.error("Unable to post Error JSON:", JSON.stringify(err, null, 2));
//                             } else {
//                                 console.log("Detail posted", JSON.stringify(data, null, 2));
//                                 console.log(customer_id+ " "+receipt_id);
//                             }
//                         }); 
//                         var returnMessage = "Posted";
//                         } catch(err){
//                             console.log("Error: ", err)
//                         }
//                 });
//                    console.info('\n\nPOST completed');
//                 });
//             });
//             // write the json data
//             console.log("after the request---");
//             reqPost.write(dataString);
//             reqPost.end();
//             //console.log("reqPost--", reqPost.stringify);
//             reqPost.on('error', function(e) {
//                 console.error(e);
//             });
//             receipt_id = receipt_id + 1;
//     //console.log("Appointment ID: ",appointmentID)
    

//     // Fetching the current counter for Appointments for that customer id
    
//     //HttpRequest(post_requst,function(res))
//         res.status(200).json({ returnMessage })
// }



//<.........................................>
export default function handler(req, res) {
var AWS = require("aws-sdk");
AWS.config.update({
    region: 'us-west-1',
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
    endpoint: new AWS.Endpoint('http://localhost:8000'),
});
var docClient = new AWS.DynamoDB.DocumentClient();
    var table = "patientbilling";
    var customer_id = 3;
    var bill_id = req.body.bill_id;
    
   
    
    var Name = req.body.Name;
    console.log("Name",Name);
    var Email = req.body.Email; 
    console.log("Email",Email );
    var role = "doctor";
    var returnMessage = "";
    var params = {
        TableName:table,
        Item:{
          //  "receipt_id" : receipt_id,
                            "customer_id": customer_id,   
                            "name" : Name,
                            "email": Email,   
                            "bill_id":bill_id  
        }
    };  
    console.log(params);
    try{
        console.log("Login...");
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to Post  Data. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("post data inserted : ", JSON.stringify(data, null, 2));
            }
        }); 
        var returnMessage = "post Successfully : ";
        //res.status(200).json({ returnMessage })
        } catch(err){
            console.log("Error: ", err)
        }
    }