// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({region: 'us-east-1'})

// Declare local variables
// TODO: Declare dynamoDB DocumentClient object
const client = new AWS.DynamoDB.DocumentClient()

helpers.getHamsterData()
    .then(data => populateTable('asanodia_hamsters', data))
    .then(() => helpers.getRaceData())
    .then(data => populateTable('asanodia_races', data))
    .then(data => console.log(data))

function populateTable(tableName, data) {
    // TODO: Create params const object
    const params = {
        RequestItems: {
            [tableName]: data.map(item => {
                return {
                    PutRequest: {
                        Item: item
                    }
                }
            })
        }
    }

    return new Promise((resolve, reject) => {
        // TODO: Call batch write function
        client.batchWrite(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
