// Imports
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-1'})

// Declare local variables
const ec2 = new AWS.EC2()
const volumeId = 'vol-0a9e50ae96f066ffb'
const instanceId = 'i-081b969504aa0da53'

detachVolume(volumeId)
    .then(() => attachVolume(instanceId, volumeId))

function detachVolume(volumeId) {
    // TODO: Configure detachVolume params
    const params = {
        VolumeId: volumeId
    }

    return new Promise((resolve, reject) => {
        // TODO: Detach the volume
        ec2.detachVolume(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

function attachVolume(instanceId, volumeId) {
    // TODO: Configure attachVolume
    const params = {
        InstanceId: instanceId,
        VolumeId: volumeId,
        Device: '/dev/sdf'
    }

    return new Promise((resolve, reject) => {
        // TODO: Attach the volume
        ec2.attachVolume(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
