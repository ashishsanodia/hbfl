// Imports
// TODO: Import the aws-sdk
const AWS = require('aws-sdk')
const helpers = require('./helpers')

// TODO: Configure region
AWS.config.update({region: 'us-east-1'})

// Declare local variables
// TODO: Create an ec2 object
const ec2 = new AWS.EC2()
const sgName = 'asanodia_sg2'
const keyName = 'asanodia_key2'

// Do all the things together
createSecurityGroup(sgName)
    .then(() => {
        return createKeyPair(keyName)
    })
    .then(helpers.persistKeyPair)
    .then(() => {
        return createInstance(sgName, keyName)
    })
    .then((data) => {
        console.log('Created instance with:', data)
    })
    .catch((err) => {
        console.error('Failed to create instance with:', err)
    })

// Create functions

function createSecurityGroup(sgName) {
    // TODO: Implement sg creation & setting SSH rule
    const params = {
        Description: sgName,
        GroupName: sgName
    }

    return new Promise((resolve, reject) => {
        ec2.createSecurityGroup(params, (err, data) => {
            if (err) reject(err)
            else {
                const params = {
                    GroupId: data.GroupId,
                    IpPermissions: [
                        {
                            IpProtocol: 'tcp',
                            FromPort: 22,
                            ToPort: 22,
                            IpRanges: [
                                {
                                    CidrIp: '0.0.0.0/0'
                                }
                            ]
                        },
                        {
                            IpProtocol: 'tcp',
                            FromPort: 3000,
                            ToPort: 3000,
                            IpRanges: [
                                {
                                    CidrIp: '0.0.0.0/0'
                                }
                            ]
                        }
                    ]
                }

                ec2.authorizeSecurityGroupIngress(params, (err) => {
                    if (err) reject(err)
                    else resolve()
                })
            }
        })
    })
}

function createKeyPair(keyName) {
    // TODO: Create keypair
    const params = {
        KeyName: keyName
    }
    return new Promise((resolve, reject) => {
        ec2.createKeyPair(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

function createInstance(sgName, keyName) {
    // TODO: create ec2 instance
    const params = {
        ImageId: 'ami-003bca6d67e11b3c7',
        InstanceType: 't2.micro',
        KeyName: keyName,
        MaxCount: 1,
        MinCount: 1,
        SecurityGroups: [
            sgName
        ],
        UserData: 'IyEvYmluL2Jhc2gNCnN1ZG8gYXB0LWdldCB1cGRhdGUNCnN1ZG8gYXB0LWdldCAteSBpbnN0YWxsIGdpdA0KZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9hc2hpc2hzYW5vZGlhL2hiZmwuZ2l0IC9ob21lL2JpdG5hbWkvaGJmbA0KY2hvd24gLVIgYml0bmFtaTogL2hvbWUvYml0bmFtaS9oYmZsDQpjZCAvaG9tZS9iaXRuYW1pL2hiZmwNCnN1ZG8gbnBtIGkNCnN1ZG8gbnBtIHJ1biBzdGFydA=='
    }

    return new Promise((reject, resolve) => {
        ec2.runInstances(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
