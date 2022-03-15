export default function handler(req, res) {
    var AWS = require("aws-sdk");
    AWS.config.update({
      region: "us-west-1",
      accessKeyId: "accessKeyId",
      secretAccessKey: "secretAccessKey",
      endpoint: new AWS.Endpoint("http://localhost:8000"),
    });
    var docClient = new AWS.DynamoDB.DocumentClient();
    var table = "patient_receipt";
    var customerID=3;//req.body.serviceID;
    var receiptID=1;//req.body.receiptID;
    var patientID=1;//req.body.patientID;
    var paymentMode="online";//req.body.paymentMode;
    var netAmount=1000;//req.body.netAmount;
    var discountAmount=200;//req.body.discountAmount;
    var returnMessage = "";
    var params = {
      TableName: table,
      KeyConditionExpression: "#ci = :ci and receipt_id = :ri",
      ExpressionAttributeNames: {
        "#ci": "customer_id"
      },
      ExpressionAttributeValues: {
        ":ri": receiptID,
        ":ci": customerID,
      }
    };
    try {
      var returnMessage = "Fetching the information";
      docClient.query(params, function (err, data) {
        if (err) {
          console.error(
            "Unable to get records from table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log("Fetched information", JSON.stringify(data, null, 2));
          res.json(JSON.stringify(data, null, 2));
        }
      });
    } catch (err) {
      console.log("Error: ", err);
    }
    res.status(200);
  }
  