/**
 * Copyright 2022 GyneSono Technologies or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * 
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
export default function handler(req, res) {
    var AWS = require("aws-sdk");

    AWS.config.update({
        region: 'us-west-1',
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey',
        endpoint: new AWS.Endpoint('http://localhost:8000'),
    });

    var docClient = new AWS.DynamoDB.DocumentClient();

    var tableName = "Appointments";
    var appointmentID = req.body.appointmentID;
    var customerID = req.body.customerID;

   



    var returnMessage = "";

    
    console.log("Appointment ID: ", appointmentID);


    var appointmentDate = req.body.appointmentDate;
    var appointmentTime = req.body.appointmentTime;
    var patientFirstName = req.body.patientFirstName;
    var patientLastName = req.body.patientLastName;
    var patientMobileNumber = req.body.patientMobileNumber;
    var appointmentRemarks = req.body.appointmentRemarks;
                      
    var params = {
        TableName: tableName,
        Key: {
            "customer_id": customerID,
            "appointment_id": appointmentID

        },
        UpdateExpression: "set appointment_date = :ad,appointment_time=:at,patient_details.patient_first_name=:pfn,patient_details.patient_last_name=:pln,patient_details.patient_contact_no=:mn,patient_details.patient_appointment_remarks=:ar",
        ExpressionAttributeValues: {
            ":ad": appointmentDate,
            ":at": appointmentTime,
            ":pfn": patientFirstName,
            ":pln": patientLastName,
            ":mn": patientMobileNumber,
            ":ar": appointmentRemarks
        },
        ReturnValues: "UPDATED_NEW"
    };


    try {
       
        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable to get records from table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Fetched information", JSON.stringify(data, null, 2));
                res.json(JSON.stringify(data, null, 2))
            }

        });

    } catch (err) {
        console.log("Error: ", err)
    }
    res.status(200).json("Appointment Updated Succesffully: " + returnMessage);


}