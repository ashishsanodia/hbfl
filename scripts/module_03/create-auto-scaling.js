// Imports
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-1'})

// Declare local variables
const autoScaling = new AWS.AutoScaling()
const asgName = 'asanodiaASG'
const lcName = 'asanodiaLC'
const policyName = 'asanodiaPolicy'
const tgArn = 'arn:aws:elasticloadbalancing:us-east-1:331252955957:targetgroup/asanodiaTG/21deb2b4b63072ce'

createAutoScalingGroup(asgName, lcName)
    .then(() => createASGPolicy(asgName, policyName))
    .then((data) => console.log(data))

function createAutoScalingGroup(asgName, lcName) {
    // TODO: Create an auto scaling group
    const params = {
        AutoScalingGroupName: asgName,
        AvailabilityZones: [
            'us-east-1c',
            'us-east-1d'
        ],
        TargetGroupARNs: [
            tgArn
        ],
        LaunchConfigurationName: lcName,
        MaxSize: 2,
        MinSize: 1
    }

    return new Promise((resolve, reject) => {
        autoScaling.createAutoScalingGroup(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

function createASGPolicy(asgName, policyName) {
    // TODO: Create an auto scaling group policy
    const params = {
        AdjustmentType: 'ChangeInCapacity',
        AutoScalingGroupName: asgName,
        PolicyName: policyName,
        PolicyType: 'TargetTrackingScaling',
        TargetTrackingConfiguration: {
            TargetValue: 5,
            PredefinedMetricSpecification: {
                PredefinedMetricType: 'ASGAverageCPUUtilization'
            }
        }
    }

    return new Promise((resolve, reject) => {
        autoScaling.putScalingPolicy(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
