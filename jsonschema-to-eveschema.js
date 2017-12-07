#!/usr/bin/env node
// Converts the JSON-schema to a Eve (python-eve.org) schema
// Run it with:
//   node jsonschema-to-eveschema.js > eveschema.py
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
      return { type: 'string' }
    },
    integer: (element) => {
      return { type: 'integer' }
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
