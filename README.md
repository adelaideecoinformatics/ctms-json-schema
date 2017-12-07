# JSON schema for the Camera Trap Metadata Schema
See https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5267527/ for the paper that defines this standard. As part of that paper, a JSON template is supplied but having a schema for validation is really what we need. So here it is :D

Big thanks to https://jsonschema.net for making schema generation simple.

# Modifications to original template
The template provided in the paper needs some modifications before it's ready for use in the wild. Here's the changes that have been made:
 1. remove the root object with `CameraTrapMetadataStandard` property, it's redundant
 1. remove following redundant elements and move their child element up a level:
   - PrincipalInvestigators.PrincipalInvestigator
   - ProjectContacts.ProjectContact
  - ImageSequence.SequenceIdentificationsBy (child is actually what's in the spec)
   - ImageSequence.SequenceIdentifications.Identification
   - Image.PhotoTypeIdentifications (child is actually what's in the spec)
   - Image.ImageIdentifications.Identification
 1. make the following into arrays:
   - PrincipalInvestigators
   - ProjectContacts
   - ImageSequence.SequenceIdentificationsBy
   - ImageSequence.SequenceIdentifications
   - Image.PhotoTypeIdentifiedBy
   - Image.ImageIdentifications
 1. change the following fields into numeric (integer or float) types:
   - ActualLatitude
   - ActualLongitude
   - ImageSequence.SequenceIdentifications.Count
   - Image.ImageIdentifications.Count
 1. leave CameraSiteName in even though the spec doesn't define it
 1. add ImageSequence.ImageSequenceDefinition that is in the spec but not the template

# How the `schema.json` was generated
You won't have to do this, but it's important to know how it was created. The `update-schema.js` script was written against NodeJS v8.4 but it'll probably work with most versions, it doesn't do that much.
 1. open https://jsonschema.net in a browser
 1. copy the contents of the `json-template.json` file
 1. paste them into the JSONSchema.net editor
 1. set Number Options -> Minimum value = 0
 1. set Number Options -> Use number, not integer as type = true
 1. hit the `submit` button
 1. copy-paste the result into `rawschema.json`
 1. run `node update-schema.js > schema.json` to add `format` fields and other constraints like `minimum`

# Generate the Eve schema
This project was created to facilitate creating a http://python-eve.org API. Eve uses its own schema definition so we have a transformer that will turn JSON schema into a basic Eve schema. The result, `eve-schema.py`, is checked in but if you want to run it yourself, do so with the following:

    $ node --version # ensure nodejs is installed
    v8.4.0
    $ cd ctms-json-schema/
    $ node jsonschema-to-eveschema.js > eve-schema.py
    # now copy the content of eve-schema.py into your Eve settings

# TODO
 - Fill in `titles`, and `description` fields in the schema.
 - Look at the defaults. Might need to make them conditional i.e. default of X only when Y is also provided, otherwise blank
