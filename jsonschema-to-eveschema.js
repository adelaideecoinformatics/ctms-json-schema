#!/usr/bin/env node
// Converts the JSON-schema to a Eve (python-eve.org) schema
// Run it with:
//   node jsonschema-to-eveschema.js > eve-schema.py
// ...then copy-paste it into your Eve settings.py
fs = require('fs')
jsonSchemaStr = fs.readFileSync('./schema.json', 'utf8')
jsonSchema = JSON.parse(jsonSchemaStr)
result = processObjectProps(jsonSchema.properties)
console.log(JSON.stringify(result, null, 4))

function processObjectProps(targetObj) {
  const result = {}
  for (const key in targetObj) {
    if (!targetObj.hasOwnProperty(key)) {
      continue
    }
    const element = targetObj[key]
    result[key] = mapType(element)
  }
  return result
}

function mapType(element) {
  const type = element.type
  const typeStrategies = {
    string: (element) => {
      let result = { type: 'string' }
      if (element.enum) {
        result.allowed = element.enum
      }
      if (element.default) {
        result.default = element.default
      }
      return result
    },
    number: (element) => {
      function buildResult(type) {
        return {
          min: element.minimum,
          max: element.maximum || undefined,
          default: element.default || undefined,
          type: type
        }
      }
      let floatLookup = ['QuietPeriodSetting', 'ActualLatitude', 'ActualLongitude']
      let strategyKey = element['$id'].replace(/.*\//, '')
      if (floatLookup.indexOf(strategyKey) < 0) {
        return buildResult('integer')
      }
      return buildResult('float')
    },
    object: (element) => {
      return {
        type: 'dict',
        schema: processObjectProps(element.properties)
      }
    },
    array: (element) => {
      return {
        type: 'list',
        schema: mapType(element.items)
      }
    }
  }
  const strategy = typeStrategies[type]
  if (!strategy) {
    throw new Error("Whoops, don't know how to handle array with itemType=" + type)
  }
  return strategy(element)
}
