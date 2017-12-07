{
    "ProjectID": {
        "type": "string"
    },
    "ProjectName": {
        "type": "string"
    },
    "ProjectObjectives": {
        "type": "string"
    },
    "ProjectDesign": {
        "type": "string"
    },
    "CountryCode": {
        "type": "string"
    },
    "PublishDate": {
        "type": "string"
    },
    "ProjectDataAccessandUseConstraints": {
        "type": "string"
    },
    "PrincipalInvestigators": {
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "PrincipalInvestigatorName": {
                    "type": "string"
                },
                "PrincipalInvestigatorEmail": {
                    "type": "string"
                }
            }
        }
    },
    "ProjectContacts": {
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "ProjectContactName": {
                    "type": "string"
                },
                "ProjectContactEmail": {
                    "type": "string"
                }
            }
        }
    },
    "OrganizationName": {
        "type": "string"
    },
    "CameraDeploymentID": {
        "type": "string"
    },
    "CameraSiteName": {
        "type": "string"
    },
    "CameraDeploymentBeginDate": {
        "type": "string"
    },
    "CameraDeploymentEndDate": {
        "type": "string"
    },
    "DeploymentLocationID": {
        "type": "string"
    },
    "QuietPeriodSetting": {
        "min": 0,
        "type": "float"
    },
    "ActualLatitude": {
        "min": -90,
        "max": 90,
        "type": "float"
    },
    "ActualLongitude": {
        "min": -180,
        "max": 180,
        "type": "float"
    },
    "CameraMake": {
        "type": "string"
    },
    "Bait": {
        "type": "string",
        "allowed": [
            "none",
            "scent",
            "meat",
            "visual",
            "acoustic",
            "other"
        ],
        "default": "none"
    },
    "Feature": {
        "type": "string",
        "allowed": [
            "road, paved",
            "road, dirt",
            "trail, hiking/people",
            "trail, game",
            "road underpass/overpass/bridge",
            "culvert",
            "burrow",
            "nest site",
            "carcass",
            "water source/spring",
            "fruiting tree",
            "other"
        ],
        "default": "other"
    },
    "CameraStatus": {
        "type": "string",
        "allowed": [
            "camera functioning",
            "unknown failure",
            "vandalism/theft",
            "memory card/film failure",
            "camera hardware failure",
            "wildlife damage"
        ],
        "default": "camera functioning"
    },
    "Other": {
        "type": "string"
    },
    "ImageSequence": {
        "type": "dict",
        "schema": {
            "ImageSequenceID": {
                "type": "string"
            },
            "ImageSequenceBeginTime": {
                "type": "string"
            },
            "ImageSequenceEndTime": {
                "type": "string"
            },
            "ImageSequenceDefinition": {
                "min": 0,
                "type": "integer"
            },
            "SequenceIdentifiedBy": {
                "type": "list",
                "schema": {
                    "type": "string"
                }
            },
            "SequenceIdentifications": {
                "type": "list",
                "schema": {
                    "type": "dict",
                    "schema": {
                        "SpeciesScientificName": {
                            "type": "string"
                        },
                        "Count": {
                            "min": 1,
                            "default": 1,
                            "type": "integer"
                        }
                    }
                }
            }
        }
    },
    "Image": {
        "type": "dict",
        "schema": {
            "ImageID": {
                "type": "string"
            },
            "ImageDateTime": {
                "type": "string"
            },
            "PhotoType": {
                "type": "string",
                "allowed": [
                    "start",
                    "end",
                    "set up",
                    "blank",
                    "animal",
                    "staff",
                    "unknown",
                    "unidentifiable",
                    "timelapse",
                    ""
                ]
            },
            "PhotoTypeIdentifiedBy": {
                "type": "list",
                "schema": {
                    "type": "string"
                }
            },
            "ImageIdentifications": {
                "type": "list",
                "schema": {
                    "type": "dict",
                    "schema": {
                        "SpeciesScientificName": {
                            "type": "string"
                        },
                        "Count": {
                            "min": 1,
                            "default": 1,
                            "type": "integer"
                        }
                    }
                }
            }
        }
    }
}
