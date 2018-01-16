define({ "api": [
  {
    "type": "post",
    "url": "/projects/:id/contributors/:user",
    "title": "Add contributor to project",
    "version": "1.0.0",
    "name": "add_contributor_to_project",
    "group": "Contributors",
    "permission": [
      {
        "name": "project owner"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user id or username of the user to add as a contributor</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "contributors",
            "description": "<p>the contributors of the project which the user was added to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n    {\n     \"id\": 1,\n     \"username\": \"BobSagat\",\n     \"email\": \"Bob@AFV.com\",\n     \"firstName\": \"Bob\",\n     \"lastName\": \"Sagat\",\n     \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n     \"updatedAt\": \"2017-11-12T20:26:47.000Z\",\n     \"projectContributor\": {\n         \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n         \"updatedAt\": \"2017-11-12T20:26:47.000Z\",\n         \"projectId\": 1,\n         \"userId\": 1\n     }\n    }\n  ]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/contributors.routes.js",
    "groupTitle": "Contributors"
  },
  {
    "type": "get",
    "url": "/projects/:id/contributors/:user",
    "title": "Check if a user is a contributor",
    "version": "1.0.0",
    "name": "check_if_project_is_contributor",
    "group": "Contributors",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user id or username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "Status: 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "Status: 404 Not Found",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/contributors.routes.js",
    "groupTitle": "Contributors"
  },
  {
    "type": "get",
    "url": "/projects/:id/contributors",
    "title": "Get contributors for a project",
    "version": "1.0.0",
    "name": "get_contributors",
    "group": "Contributors",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the project to get contributors for</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "contributors",
            "description": "<p>of the project</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n     {\n         \"id\": 1,\n         \"username\": \"BobSagat\",\n         \"email\": \"Bob@AFV.com\",\n         \"firstName\": \"Bob\",\n         \"lastName\": \"Sagat\",\n         \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n         \"updatedAt\": \"2017-11-12T20:26:47.000Z\",\n         \"projectContributor\": {\n             \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n             \"updatedAt\": \"2017-11-12T20:26:47.000Z\",\n             \"projectId\": 1,\n             \"userId\": 1\n         }\n     }\n    ]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/contributors.routes.js",
    "groupTitle": "Contributors"
  },
  {
    "type": "delete",
    "url": "/projects/:id/contributors/:user",
    "title": "Remove contributor from project",
    "version": "1.0.0",
    "name": "remove_contributor_from_project",
    "group": "Contributors",
    "permission": [
      {
        "name": "project owner"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user id or username of the user to remove as a contributor</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "Status: 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/contributors.routes.js",
    "groupTitle": "Contributors"
  },
  {
    "type": "get",
    "url": "/",
    "title": "API Home",
    "version": "1.0.0",
    "name": "GetIndex",
    "group": "Index",
    "filename": "src/routes/index.routes.js",
    "groupTitle": "Index"
  },
  {
    "type": "get",
    "url": "/projects/:id/invites",
    "title": "Get all contributor invitations for a project",
    "version": "1.0.0",
    "name": "get_invites",
    "group": "Invites",
    "permission": [
      {
        "name": "project owner"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the project to get contributor invites to</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "contributor",
            "description": "<p>invites to the project</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n  \"id\": 1,\n  \"status\": \"OPEN\",\n  \"daysFromCreationUntilExpiration\": 30,\n  \"userInvited\": {\n    // User object\n  },\n  \"projectInvitedTo\": {\n    // Project object\n  },\n  \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n  \"updatedAt\": \"2017-11-12T20:26:47.000Z\"\n }\n ]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/invites.routes.js",
    "groupTitle": "Invites"
  },
  {
    "type": "post",
    "url": "/projects/:projectId/invites/:userId",
    "title": "Invite a contributor to the project",
    "version": "1.0.0",
    "name": "invite_contributor_to_the_project",
    "group": "Invites",
    "permission": [
      {
        "name": "project owner"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>the id of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>user id or username of the user to invite as a contributor</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "daysUntilExpiration",
            "description": "<p>the invite will expire after this many days have passed since the invite was created. Must be a non-negative integer. Optional: Defaults to 30 days.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "invite",
            "description": "<p>the contributor invitation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "\n{\n \"id\": 1,\n \"status\": \"OPEN\",\n \"daysFromCreationUntilExpiration\": 30,\n \"userInvited\": {\n   // User object\n },\n \"projectInvitedTo\": {\n   // Project object\n },\n \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n \"updatedAt\": \"2017-11-12T20:26:47.000Z\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/invites.routes.js",
    "groupTitle": "Invites"
  },
  {
    "type": "delete",
    "url": "/invites/:id",
    "title": "Remove (rescind) a contributor invitation",
    "version": "1.0.0",
    "name": "remove_contributor_invitation_to_project",
    "group": "Invites",
    "permission": [
      {
        "name": "project owner"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>invite id of the contributor invitation to rescind</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "Status: 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/invites.routes.js",
    "groupTitle": "Invites"
  },
  {
    "type": "get",
    "url": "/user/invites",
    "title": "Get invites for an authenticated user",
    "version": "1.0.0",
    "name": "user_invites",
    "group": "Invites",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "invites",
            "description": "<p>list of invites for authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n {\n  \"id\": 1,\n  \"status\": \"OPEN\",\n  \"daysFromCreationUntilExpiration\": 30,\n  \"userInvited\": {\n    // User object\n  },\n  \"projectInvitedTo\": {\n    // Project object\n  },\n  \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n  \"updatedAt\": \"2017-11-12T20:26:47.000Z\"\n }\n ]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/invites.routes.js",
    "groupTitle": "Invites"
  },
  {
    "type": "post",
    "url": "/projects/:id/owners/:user",
    "title": "Add owner to project",
    "version": "1.0.0",
    "name": "add_owner_to_project",
    "group": "Owners",
    "permission": [
      {
        "name": "project owner"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user id or username of the user to add as a owner</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "owners",
            "description": "<p>the owners of the project which the user was added to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n  \"id\": 1,\n  \"username\": \"BobSagat\",\n  \"email\": \"Bob@AFV.com\",\n  \"firstName\": \"Bob\",\n  \"lastName\": \"Sagat\",\n  \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n  \"updatedAt\": \"2017-11-12T20:26:47.000Z\",\n  \"projectOwner\": {\n      \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n      \"updatedAt\": \"2017-11-12T20:26:47.000Z\",\n      \"projectId\": 1,\n      \"userId\": 1\n  }\n }\n ]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/owners.routes.js",
    "groupTitle": "Owners"
  },
  {
    "type": "get",
    "url": "/projects/:id/owners/:user",
    "title": "Check if a user is a owner",
    "version": "1.0.0",
    "name": "check_if_project_is_owner",
    "group": "Owners",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user id or username</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "Status: 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "Status: 404 Not Found",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/owners.routes.js",
    "groupTitle": "Owners"
  },
  {
    "type": "get",
    "url": "/projects/:id/owners",
    "title": "Get owners for a project",
    "version": "1.0.0",
    "name": "get_owners",
    "group": "Owners",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the project to get owners for</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "owners",
            "description": "<p>of the project</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "[\n {\n     \"id\": 1,\n     \"username\": \"BobSagat\",\n     \"email\": \"Bob@AFV.com\",\n     \"firstName\": \"Bob\",\n     \"lastName\": \"Sagat\",\n     \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n     \"updatedAt\": \"2017-11-12T20:26:47.000Z\",\n     \"projectOwner\": {\n         \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n         \"updatedAt\": \"2017-11-12T20:26:47.000Z\",\n         \"projectId\": 1,\n         \"userId\": 1\n     }\n }\n ]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/owners.routes.js",
    "groupTitle": "Owners"
  },
  {
    "type": "delete",
    "url": "/projects/:id/owners/:user",
    "title": "Remove owner from project",
    "version": "1.0.0",
    "name": "remove_owner_from_project",
    "group": "Owners",
    "permission": [
      {
        "name": "project owner"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>user id or username of the user to add as a owner</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "Status: 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/owners.routes.js",
    "groupTitle": "Owners"
  },
  {
    "type": "delete",
    "url": "/projects/:id",
    "title": "Delete a project",
    "version": "1.0.0",
    "name": "delete_project",
    "group": "Projects",
    "permission": [
      {
        "name": "project owner"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>the deleted project</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "Status: 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/projects.routes.js",
    "groupTitle": "Projects"
  },
  {
    "type": "get",
    "url": "/projects/:projectId",
    "title": "Get project by id",
    "version": "1.0.0",
    "name": "get_project_by_id",
    "group": "Projects",
    "permission": [
      {
        "name": "autenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>the projectId to find by</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>the project</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"id\": 1,\n  \"projectName\": \"TMNT\",\n  \"description\": \"You gotta know what a crumpet is to understand cricket!\",\n  \"version\": \"1.2.3\",\n  \"license\": \"MIT\",\n  \"authors\": \"Casey Jones, Raphael\",\n  \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n  \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n  \"containerizationToolId\": null,\n  \"continuousIntegrationToolId\": 1,\n  \"deploymentToolId\": 3,\n  \"webFrameworkId\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/projects.routes.js",
    "groupTitle": "Projects"
  },
  {
    "type": "get",
    "url": "/users/:user/projects",
    "title": "Get a project by user id",
    "version": "1.0.0",
    "name": "get_projects_for_user",
    "group": "Projects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>the user id or the username to find by</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "[Object]",
            "optional": false,
            "field": "projects",
            "description": "<p>the list of projects for a given user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"owned\": [\n        {\n            \"id\": 1,\n            \"projectName\": \"TMNT\",\n            \"description\": \"You gotta know what a crumpet is to understand cricket!\",\n            \"version\": \"1.2.3\",\n            \"license\": \"MIT\",\n            \"authors\": \"Casey Jones, Raphael\",\n            \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n            \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n            \"containerizationToolId\": null,\n            \"continuousIntegrationToolId\": 1,\n            \"deploymentToolId\": 3,\n            \"webFrameworkId\": null,\n            \"projectOwner\": {\n                \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n                \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n                \"projectId\": 1,\n                \"userId\": 3\n            }\n        }\n    ],\n    \"contributed\": [\n        {\n            \"id\": 1,\n            \"projectName\": \"TMNT\",\n            \"description\": \"You gotta know what a crumpet is to understand cricket!\",\n            \"version\": \"1.2.3\",\n            \"license\": \"MIT\",\n            \"authors\": \"Casey Jones, Raphael\",\n            \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n            \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n            \"containerizationToolId\": null,\n            \"continuousIntegrationToolId\": 1,\n            \"deploymentToolId\": 3,\n            \"webFrameworkId\": null,\n            \"projectContributor\": {\n                \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n                \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n                \"projectId\": 1,\n                \"userId\": 3\n            }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/projects.routes.js",
    "groupTitle": "Projects"
  },
  {
    "type": "patch",
    "url": "/projects/:id",
    "title": "Update a project",
    "version": "1.0.0",
    "name": "patch_project",
    "group": "Projects",
    "permission": [
      {
        "name": "project owner"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the project to update</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>the updated project</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"id\": 1,\n  \"projectName\": \"TMNT\",\n  \"description\": \"You gotta know what a crumpet is to understand cricket!\",\n  \"version\": \"1.2.3\",\n  \"license\": \"MIT\",\n  \"authors\": \"Casey Jones, Raphael\",\n  \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n  \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n  \"containerizationToolId\": null,\n  \"continuousIntegrationToolId\": 1,\n  \"deploymentToolId\": 3,\n  \"webFrameworkId\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/projects.routes.js",
    "groupTitle": "Projects"
  },
  {
    "type": "post",
    "url": "/user/projects",
    "title": "Create a project for an authenticated user",
    "version": "1.0.0",
    "name": "post_project_for_authenticated_user",
    "group": "Projects",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectName",
            "description": "<p>the name of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>the description to the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>the version of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "license",
            "description": "<p>the name of the license</p>"
          },
          {
            "group": "Parameter",
            "type": "[String]",
            "optional": false,
            "field": "authors",
            "description": "<p>a string of comma separated values</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "containerizationTool",
            "description": "<p>the name of the containerization tool or <None></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "continuousIntegrationTool",
            "description": "<p>the name of the continuous integration tool or <None></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deploymentTool",
            "description": "<p>the name of the deployment tool or <None></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "webFramework",
            "description": "<p>the name of the web framework or <None></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n \"projectName\": \"hammer-io\",\n \"description\": \"Hit it with a Hammer!\",\n \"version\": \"0.0.1\",\n \"license\": \"MIT\",\n \"authors\": \"Holmgang, Jack\",\n \"containerizationTool\": \"2\",\n \"continuousIntegrationTool\": \"1\",\n \"deploymentTool\": \"3\",\n \"webFramework\": \"4\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>the created project</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"id\": 1,\n  \"projectName\": \"hammer-io\",\n  \"description\": \"Hit it with a Hammer!\",\n  \"version\": \"0.0.1\",\n  \"license\": \"MIT\",\n  \"authors\": \"Holmgang, Jack\",\n  \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n  \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n  \"containerizationToolId\": 2,\n  \"continuousIntegrationToolId\": 1,\n  \"deploymentToolId\": 3,\n  \"webFrameworkId\": 4\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/projects.routes.js",
    "groupTitle": "Projects"
  },
  {
    "type": "post",
    "url": "/users/:user/projects",
    "title": "Create a project",
    "version": "1.0.0",
    "name": "post_project_for_user",
    "group": "Projects",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>the username or userid of the user to create a project for</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectName",
            "description": "<p>the name of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>the description to the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>the version of the project</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "license",
            "description": "<p>the name of the license</p>"
          },
          {
            "group": "Parameter",
            "type": "[String]",
            "optional": false,
            "field": "authors",
            "description": "<p>a string of comma separated values</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "containerizationTool",
            "description": "<p>the name of the containerization tool or <None></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "continuousIntegrationTool",
            "description": "<p>the name of the continuous integration tool or <None></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deploymentTool",
            "description": "<p>the name of the deployment tool or <None></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "webFramework",
            "description": "<p>the name of the web framework or <None></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n \"projectName\": \"hammer-io\",\n \"description\": \"Hit it with a Hammer!\",\n \"version\": \"0.0.1\",\n \"license\": \"MIT\",\n \"authors\": \"Holmgang, Jack\",\n \"containerizationTool\": \"2\",\n \"continuousIntegrationTool\": \"1\",\n \"deploymentTool\": \"3\",\n \"webFramework\": \"4\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "project",
            "description": "<p>the created project</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"id\": 1,\n  \"projectName\": \"hammer-io\",\n  \"description\": \"Hit it with a Hammer!\",\n  \"version\": \"0.0.1\",\n  \"license\": \"MIT\",\n  \"authors\": \"Holmgang\",\n  \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n  \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n  \"containerizationToolId\": 2,\n  \"continuousIntegrationToolId\": 1,\n  \"deploymentToolId\": 3,\n  \"webFrameworkId\": 4\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/projects.routes.js",
    "groupTitle": "Projects"
  },
  {
    "type": "get",
    "url": "/projects",
    "title": "Get all public projects",
    "version": "1.0.0",
    "name": "projects",
    "group": "Projects",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "projects",
            "description": "<p>List of all of the public projects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n {\n   \"id\": 1,\n   \"projectName\": \"TMNT\",\n   \"description\": \"You gotta know what a crumpet is to understand cricket!\",\n   \"version\": \"1.2.3\",\n   \"license\": \"MIT\",\n   \"authors\": \"Casey Jones, Raphael\",\n   \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n   \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n   \"containerizationToolId\": null,\n   \"continuousIntegrationToolId\": 1,\n   \"deploymentToolId\": 3,\n   \"webFrameworkId\": null\n }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/projects.routes.js",
    "groupTitle": "Projects"
  },
  {
    "type": "get",
    "url": "/user/projects",
    "title": "Get projects for an authenticated user",
    "version": "1.0.0",
    "name": "user_projects",
    "group": "Projects",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "projects",
            "description": "<p>list of projects for authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"owned\": [\n        {\n            \"id\": 1,\n            \"projectName\": \"TMNT\",\n            \"description\": \"You gotta know what a crumpet is to understand cricket!\",\n            \"version\": \"1.2.3\",\n            \"license\": \"MIT\",\n            \"authors\": \"Casey Jones, Raphael\",\n            \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n            \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n            \"containerizationToolId\": null,\n            \"continuousIntegrationToolId\": 1,\n            \"deploymentToolId\": 3,\n            \"webFrameworkId\": null,\n            \"projectOwner\": {\n                \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n                \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n                \"projectId\": 1,\n                \"userId\": 3\n            }\n        }\n    ],\n    \"contributed\": [\n        {\n            \"id\": 1,\n            \"projectName\": \"TMNT\",\n            \"description\": \"You gotta know what a crumpet is to understand cricket!\",\n            \"version\": \"1.2.3\",\n            \"license\": \"MIT\",\n            \"authors\": \"Casey Jones, Raphael\",\n            \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n            \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n            \"containerizationToolId\": null,\n            \"continuousIntegrationToolId\": 1,\n            \"deploymentToolId\": 3,\n            \"webFrameworkId\": null,\n            \"projectContributor\": {\n                \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n                \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n                \"projectId\": 1,\n                \"userId\": 3\n            }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/projects.routes.js",
    "groupTitle": "Projects"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create new user",
    "version": "1.0.0",
    "name": "create_user",
    "group": "Users",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>the username of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>the email of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>the first name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>the last name of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"username\": \"BobSagat\",\n \"email\": \"Bob@AFV.com\",\n \"firstName\": \"Bob\",\n \"lastName\": \"Sagat\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "user",
            "description": "<p>The user that was created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"id\": 1,\n      \"username\": \"BobSagat\",\n      \"email\": \"Bob@AFV.com\",\n      \"firstName\": \"Bob\",\n      \"lastName\": \"Sagat\",\n      \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n      \"updatedAt\": \"2017-11-12T20:26:47.000Z\"\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.routes.js",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/users/:user",
    "title": "delete a user",
    "version": "1.0.0",
    "name": "delete_user",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the user to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "Status: 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.routes.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/user",
    "title": "Get authenticated user",
    "version": "1.0.0",
    "name": "get_authenticated_user",
    "group": "Users",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Authenticated user information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"id\": 1,\n      \"username\": \"BobSagat\",\n      \"email\": \"Bob@AFV.com\",\n      \"firstName\": \"Bob\",\n      \"lastName\": \"Sagat\",\n      \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n      \"updatedAt\": \"2017-11-12T20:26:47.000Z\"\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.routes.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:user",
    "title": "Get user by id or username",
    "version": "1.0.0",
    "name": "get_user_by_id_or_username",
    "group": "Users",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "users",
            "description": "<p>List of all of the public users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"id\": 1,\n    \"username\": \"BobSagat\",\n    \"email\": \"Bob@AFV.com\",\n    \"firstName\": \"Bob\",\n    \"lastName\": \"Sagat\",\n    \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n    \"updatedAt\": \"2017-11-12T20:26:47.000Z\"\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.routes.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get all public users",
    "version": "1.0.0",
    "name": "get_users",
    "group": "Users",
    "permission": [
      {
        "name": "none"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of all of the public users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n    {\n     \"id\": 1,\n     \"username\": \"BobSagat\",\n     \"email\": \"Bob@AFV.com\",\n     \"firstName\": \"Bob\",\n     \"lastName\": \"Sagat\",\n     \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n     \"updatedAt\": \"2017-11-12T20:26:47.000Z\"\n    }\n  ]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.routes.js",
    "groupTitle": "Users"
  },
  {
    "type": "patch",
    "url": "/users/:user",
    "title": "update a user",
    "version": "1.0.0",
    "name": "update_user",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the user to update</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>the username of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>the email of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>the first name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>the last name of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"username\": \"BobSagat\",\n \"email\": \"Bob@AFV.net\",\n \"firstName\": \"Bob\",\n \"lastName\": \"Sagat\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The updated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"id\": 1,\n      \"username\": \"BobSagat\",\n      \"email\": \"Bob@AFV.net\",\n      \"firstName\": \"Bob\",\n      \"lastName\": \"Sagat\",\n      \"createdAt\": \"2017-11-12T20:26:47.000Z\",\n      \"updatedAt\": \"2017-11-14T20:26:47.000Z\"\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/users.routes.js",
    "groupTitle": "Users"
  }
] });
