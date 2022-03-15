    var AWS = require("aws-sdk");
    AWS.config.update({
        region: 'us-west-1',
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey',
        endpoint: new AWS.Endpoint('http://localhost:8000'),
    });
    var docClient = new AWS.DynamoDB.DocumentClient();
        var table = "login";
        var customer_id = 3;
        var user_name = "gyne2";//"reception_gyne2"; //
        var password = "123456";//"gyne@12345"; //
        var email = "gynesono.official@gmail.com"; //sa,e
        var role = "doctor";//"reception"; 
        var returnMessage = "";
        var params = {
            TableName:table,
            Item:{
                "customer_id": customer_id,
                "user_name": user_name,
                "password": password,
                "customer_email" : email,
                "role" : role
            }
        };  
        try{
            console.log("Login...");
            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to Post Login Data. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Login data inserted : ", JSON.stringify(data, null, 2));
                }
            }); 
            var returnMessage = "Login Successfully : ";
            //res.status(200).json({ returnMessage })
            } catch(err){
                console.log("Error: ", err)
            }
