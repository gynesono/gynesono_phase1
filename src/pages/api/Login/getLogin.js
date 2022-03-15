//import { useNavigate } from 'react-router-dom';
//import Login from '../../Login'
//import Dashboard from '../../Dashboard';
export default function handler(req, res) {
    var statusCode;
    var userName = req.body.userName;
    var password =  req.body.password; 
    var email = req.body.email; 
    var table = "login";
    var date_ob = new Date();
    var currentDate = date_ob.toString();
    var accessKeyID = userName + "-" + "9999" + "-" + email + "-" + currentDate;
    console.log("The access key is: ", accessKeyID); ////Math.random()
    //statusCode = updateAccessKeyID(userName,email);
    //console.log("the status code is: ", JSON.stringify(updateCode, null, 2));
    var recordExists = false;
    
    var AWS = require("aws-sdk");
 
     AWS.config.update({
         region: 'us-west-1',
         accessKeyId: 'accessKeyId',
         secretAccessKey: 'secretAccessKey',
         endpoint: new AWS.Endpoint('http://localhost:8000'),
     });
     var docClient = new AWS.DynamoDB.DocumentClient();
     
     var returnMessage={};
    
    var params = {
        TableName: table,
        KeyConditionExpression: "#ci = :ci and user_name = :un",
        ExpressionAttributeNames:{
        "#ci": "customer_email",
        "#pwd": "password"
    },
        ExpressionAttributeValues: {
            ":ci": email,
            ":un" : userName,
            ":pwd" : password

        },
        FilterExpression: "#pwd = :pwd"
    };

  
   
   docClient.query(params, function(err, data) {
       if (err) {
            console.error("Unable to get login data. Error JSON:", JSON.stringify(err, null, 2));
            if (err.Count == 1){
                statusCode = err.statusCode;
                returnMessage = err.message;    
            }
        } else {
            if (data.Count == 1){
                //res.status(200);
                recordExists = true;
                console.log("Record Exists: ", recordExists);
                /////////
                console.log("in update")
                var access_params = {
                    TableName:table,
                    Key:{
                        "user_name": userName,
                        "customer_email": email
                    },
                    UpdateExpression: "set accessKeyId = :ak",
                    ExpressionAttributeValues:{
                        ":ak": accessKeyID
                        },
                    ReturnValues:"ALL_NEW"
                };
                
                docClient.update(access_params, function(err, data) {
                    if (err) {
                        if (err.Count == 1){
                            res.status = err.statusCode;
                            res.JSON = err.message;    
                        }
                        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            
                                    
                    } else {
                        
                            res.status(200);
                            res.json(JSON.stringify(data, null, 2))
                            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                        
                
                    }
                }); 
                /////////
                console.log("Login Successfully : ", JSON.stringify(data, null, 2));
                returnMessage = JSON.stringify(data, null, 2);
               
            }             
            else{
                res.status(400);
                res.json(JSON.stringify("Invalid credentials"))
                console.log("Invalid credentials");
            }                
        }
    });

    console.log("Record Exists AFTER: ", recordExists);

    // if (recordExists){
    //     console.log("in update")
    //     var access_params = {
    //         TableName:table,
    //         Key:{
    //             "user_name": userName,
    //             "customer_email": email
    //         },
    //         UpdateExpression: "set accessKeyId = :ak",
    //         ExpressionAttributeValues:{
    //             ":ak": accessKeyID
    //             },
    //         ReturnValues:"ALL_NEW"
    //     };
    //     //returnMessage = "Updating the counter value...";
    //     docClient.update(access_params, function(err, data) {
    //         if (err) {
    //             if (err.Count == 1){
    //                 res.status = err.statusCode;
    //                 res.JSON = err.message;    
    //             }
    //             console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    
    //             //res.status(200);
    //             //return res.json(JSON.stringify(err, null, 2))
    //             //returnMessage = "Unauthorized User.."
    
    //         } else {
    //             //statusCode= 200;
               
    //                 res.status(200);
    //                 res.json(JSON.stringify(data, null, 2))
    //                 console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
                
           
    //         }
    //     }); 

    // }
    
   
    
    



     
 }

//  function updateAccessKeyID(userName,email)
// {
//     var statusCode;
   
    
//     var table = "login";
//     var AWS = require("aws-sdk");
 
//      AWS.config.update({
//          region: 'us-west-1',
//          accessKeyId: 'accessKeyId',
//          secretAccessKey: 'secretAccessKey',
//          endpoint: new AWS.Endpoint('http://localhost:8000'),
//      });
//      var docClient = new AWS.DynamoDB.DocumentClient();
    

    

// }