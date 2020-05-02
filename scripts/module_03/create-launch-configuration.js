const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({region: 'us-east-1'})

// Declare local variables
// TODO: Create an autoscaling object
const autoScaling = new AWS.AutoScaling()

const lcName = 'asanodiaLC'
const roleName = 'asanodiaLCRole'
const sgName = 'asanodia_sg'
const keyName = 'asanodia_key'

helpers.createIamRole(roleName)
    .then(profileArn => createLaunchConfiguration(lcName, profileArn))
    .then(data => console.log(data))

function createLaunchConfiguration(lcName, profileArn) {
    // TODO: Create a launch configuration
    const params = {
        IamInstanceProfile: profileArn,
        ImageId: 'ami-0be53bbb527c775d6',
        InstanceType: 't2.micro',
        LaunchConfigurationName: lcName,
        KeyName: keyName,
        SecurityGroups: [
            sgName
        ],
        UserData: ''
    }

    return new Promise((resolve, reject) => {
        autoScaling.createLaunchConfiguration(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
