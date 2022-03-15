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
        var bill_date = req.body.bill_date;
        // var first_name = req.body.first_name;
        // var last_name = req.body.last_name;
        // var visit_id = req.body.visit_id;
        // var patient_id = req.body.patient_id; 
        // var receipt_id = req.body.receipt_id;
        var service_category = req.body.service_category;
        var service_name = req.body.service_name;
        var gross_amount = req.body.gross_amount;
        var discount = req.body.gross_amount;
        var net_amount = req.body.net_amount;
        var discount_reason = req.body.discount_reason;
        var payment_mode = req.body.payment_mode;
        var payment_info = req.body.payment_info;
        var paid_amount = req.body.paid_amount;
        var balance = req.body.balance;
        var returnMessage = "";

        console.log(customer_id);
        console.log(bill_id);
        console.log(bill_date);
        console.log(service_category);
        console.log(service_name);
        console.log(gross_amount);
        console.log(discount);
        console.log(discount_reason);
        console.log(net_amount);
        console.log(payment_mode);
        console.log(payment_info);
        console.log(paid_amount);
        console.log(balance);
        var params = { 
            TableName:table,
            Item:{
                "customer_id" : customer_id,
                "bill_id" : bill_id,
                // "visit_id" : visit_id,
                // "patient_id" : patient_id,
                // "receipt_id" : receipt_id,
                "bill_date" : bill_date,
                "service_details" : {
                    "service_name" : service_name,
                    "service_category" : service_category
                },
                "bill_details" : {
                    "gross_amount" : gross_amount,
                    "discount" : discount,
                    "net_amount" : net_amount,
                },
                "discount_reason" : discount_reason,
                "payment_mode" : payment_mode,
                "payment_info" : payment_info,
                "paid_amount" : paid_amount,
                "balance" : balance
            }
        };  
        try{
            console.log("Posting...");
            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to Post postCustomerAccounting. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("postCustomerAccounting data inserted : ", JSON.stringify(data, null, 2));
                }
            }); 
            var returnMessage = "post Successfully : ";
            res.status(200).json({ returnMessage })
            } catch(err){
                console.log("Error: ", err)
            }
}





















// export default function handler(req, res) {
//     var AWS = require("aws-sdk");
//     AWS.config.update({
//         region: 'us-west-1',
//         accessKeyId: 'accessKeyId',
//         secretAccessKey: 'secretAccessKey',
//         endpoint: new AWS.Endpoint('http://localhost:8000'),
//     });
//     var docClient = new AWS.DynamoDB.DocumentClient();
//         var table = "patientbilling";
//         var customer_id = 3;
//         // var bill_id = req.body.bill_id;
//         // var Name = req.body.Name; //This will be passed by UI
//         // console.log("Name",Name);
//         // var Email = req.body.Email; //This will be passed by UI
//         // console.log("Email",Email );
//         // var role = "doctor";//"reception"; 
//         // var returnMessage = "";
        

//         // var visit_id = 1;
//         // var patient_id = 1;
//         // var service_id = req.body.service_id;//1
//         // var service_name = req.body.service_name; //bloodtest
//         // var service_cost = req.body.service_cost; //1000   //getBillingMasterData as a grossAmount in UI
//         // var discount_percent = req.body.discount_percent; //5 //UI
//         // // // var discount_amount =  (service_cost/100)*discount_percent; //
//         // // // var net_amount = service_cost-discount;
//         // var outstanding_amount = req.body.outstanding_amount; //950;
//         // var discount_reason = req.body.discount_reason; //"Family Friend";
//         // var payment_mode = req.body.payment_mode; //"UPI";
//         // var paid_amount = req.body.paid_amount; //950 
//         // var balance = req.body.balance; //0
//         // var payment_details = "No details";
//         console.log("bill id : "+bill_id);
//         console.log("customer id : "+customer_id);
//         var returnMessage = "";

//         var params = { 
//             TableName:table,
//             Item:{
//                 "customer_id": customer_id,
//                 "name" : Name,
//                 "email": Email,   
//                 "bill_id":bill_id 
//                 // "visit_id" : visit_id,
//                 // "patient_id" : patient_id,
//                 // "service_id" : service_id, 
//                 // "service_name": service_name,
//                 // "service_cost": service_cost,
//                 // "discount_percent": discount_percent,
//                 // "outstanding_amount": outstanding_amount,
//                 // "discount_reason":discount_reason,
//                 // "payment_mode":payment_mode,
//                 // "paid_amount":paid_amount,
//                 // "balance":balance,
//                 // "payment_details":payment_details
//             }
//         };  
//         try{
//             console.log("Posting...");
//             docClient.put(params, function(err, data) {
//                 if (err) {
//                     console.error("Unable to Post postCustomerAccounting. Error JSON:", JSON.stringify(err, null, 2));
//                 } else {
//                     console.log("postCustomerAccounting data inserted : ", JSON.stringify(data, null, 2));
//                 }
//             }); 
//             var returnMessage = "Login Successfully : ";
//             res.status(200).json({ returnMessage })
//             } catch(err){
//                 console.log("Error: ", err)
//             }
// }