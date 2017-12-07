#!/usr/bin/env node
// Reads in the raw JSON schema to add formats and constraints
// Run it with:
//   node update-schema.js > schema.json
fs = require('fs')
jsonSchemaStr = fs.readFileSync('./rawschema.json', 'utf8')
jsonSchema = JSON.parse(jsonSchemaStr)

const alphanumeric = { pattern: '^[a-zA-Z0-9]*$' }
const date = { format: 'date' }
const datetime = { format: 'date-time' }
const email = { format: 'email' }
const uri = { format: 'uri' }
const enum_ = {
  enum: function (o) {
    let enumStr = o.examples[0]
    let validValues = enumStr.split(';')
    let fields = validValues.reduce((acc, curr) => {
      let v = curr
      if (v.indexOf('[') === 0) {
        v = v.replace('[','').replace(']','')
        acc.default = v}
        acc.vals.push(v)
        return acc
      }, {default: '', vals: []})
    o.default = fields.default
    o.enum = fields.vals
  }
}

result = addFormatsAndConstraints(jsonSchema)
console.log(JSON.stringify(result, null, 4))

function addFormatsAndConstraints(targetObj) {
  let result = targetObj
  const typeMapping = {
    'ProjectID': uri,
    'PublishDate': date,
    'PrincipalInvestigators.items.properties.PrincipalInvestigatorEmail': email,
    'ProjectContacts.items.properties.ProjectContactEmail': email,
    'CameraDeploymentID': uri,
    'CameraDeploymentBeginDate': datetime,
    'CameraDeploymentEndDate': datetime,
    'DeploymentLocationID': alphanumeric,
    'ActualLatitude': {
      minimum: -90,
      maximum: 90
    },
    'ActualLongitude': {
      minimum: -180,
      maximum: 180
    },
    'QuietPeriodSetting': {
      description: 'Time specified between shutter triggers when activity in the sensor will not trigger the shutter. Specified in minutes and fraction of minutes'
    },
    'Bait': enum_,
    'Feature': enum_,
    'CameraStatus': enum_,
    'ImageSequence.properties.ImageSequenceID': uri,
    'ImageSequence.properties.ImageSequenceBeginTime': datetime,
    'ImageSequence.properties.ImageSequenceEndTime': datetime,
    'ImageSequence.properties.SequenceIdentifications.items.properties.Count': {
      default: 1,
      minimum: 1
    },
    'Image.properties.ImageID': uri,
    'Image.properties.ImageDateTime': datetime,
    'Image.properties.PhotoType': enum_,
    'Image.properties.ImageIdentifications.items.properties.Count': {
      default: 1,
      minimum: 1
    }
  }
  for (const currProp in typeMapping) {
    const path = 'properties.' + currProp
    const pathFragments = path.split('.')
    let currPropObj = result
    for (let currFrag of pathFragments) {
      currPropObj = currPropObj[currFrag]
    }
    for (const currNewField in typeMapping[currProp]) {
      let newVal = typeMapping[currProp][currNewField]
      if (typeof newVal === 'function') {
        newVal(currPropObj)
        continue
      }
      currPropObj[currNewField] = newVal
    }
  }
  return result
}
