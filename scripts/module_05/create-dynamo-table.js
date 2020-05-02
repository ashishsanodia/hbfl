// Imports
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-1'})

// Declare local variables
// TODO: Declare dynamoDB object
const dynamo = new AWS.DynamoDB()

createTable('asanodia_hamsters')
    .then(() => createTable('asanodia_races'))
    .then(data => console.log(data))

function createTable(tableName) {
    // TODO: Declare params for createTable
    const params = {
        TableName: tableName,
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'N'
            }
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH'
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    }

    return new Promise((resolve, reject) => {
        // TODO: Call createTable function
        dynamo.createTable(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
