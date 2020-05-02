// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({region: 'us-east-1'})

// TODO: Create an elasticache object
const ec = new AWS.ElastiCache()

helpers.createSecurityGroup('asanodia_redis_sg', 6379)
  .then(sgId => createRedisCluster('asanodia', sgId))
  .then(data => console.log(data))

function createRedisCluster (clusterName, sgId) {
  // TODO: Create params object
  const params = {
    CacheClusterId: clusterName,
    CacheNodeType: 'cache.t2.micro',
    Engine: 'redis',
    NumCacheNodes: 1,
    SecurityGroupIds: [
      sgId
    ]
  }

  return new Promise((resolve, reject) => {
    // TODO: Create cache cluster

    ec.createCacheCluster(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
