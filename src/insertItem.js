"use strict";

const {v4} = require ("uuid")
const AWS = require ("aws-sdk")

const insertItem = async (event)=>{

    console.log(JSON.stringify(event));

    const {item} = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = v4();

    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    // const dynamoDB = new AWS.DynamoDB();

    const newItem = {
        id,
        item,
        createdAt,
        itemStatus: false
    }

    console.log(JSON.stringify(newItem));

    const params = {
        TableName: "ItemTableNew",
        Item: newItem
    }
    
    try {
        await dynamoDB.put(params).promise();
    } catch (e) {
        console.log(e.message);

        return {
            statusCode: 404,
            body: JSON.stringify(e.message)
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    };
}

module.exports = {
    handler:insertItem
}