define({ "api": [  {    "type": "get",    "url": "/",    "title": "API Home",    "version": "1.0.0",    "name": "GetIndex",    "group": "Index",    "filename": "src/routes/index.js",    "groupTitle": "Index"  },  {    "type": "delete",    "url": "/projects/:id",    "title": "Delete a project",    "version": "1.0.0",    "name": "delete_project",    "group": "Projects",    "permission": [      {        "name": "project owner"      }    ],    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "project",            "description": "<p>the deleted project</p>"          }        ]      },      "examples": [        {          "title": "Success-Response",          "content": "Status: 204 No Content",          "type": "json"        }      ]    },    "filename": "src/routes/projects.js",    "groupTitle": "Projects"  },  {    "type": "get",    "url": "/projects/:projectId",    "title": "Get project by id",    "version": "1.0.0",    "name": "get_project_by_id",    "group": "Projects",    "permission": [      {        "name": "autenticated user"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "projectId",            "description": "<p>the projectId to find by</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "project",            "description": "<p>the project</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "{\n  \"id\": 1,\n  \"projectName\": \"TMNT\",\n  \"description\": \"You gotta know what a crumpet is to understand cricket!\",\n  \"version\": \"1.2.3\",\n  \"license\": \"MIT\",\n  \"authors\": \"Casey Jones, Raphael\",\n  \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n  \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n  \"containerizationToolId\": null,\n  \"continuousIntegrationToolId\": 1,\n  \"deploymentToolId\": 3,\n  \"webFrameworkId\": null\n}",          "type": "json"        }      ]    },    "filename": "src/routes/projects.js",    "groupTitle": "Projects"  },  {    "type": "get",    "url": "/users/:userId/projects",    "title": "Get a project by user id",    "version": "1.0.0",    "name": "get_projects_for_user",    "group": "Projects",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user",            "description": "<p>the user id or the username to find by</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "[Object]",            "optional": false,            "field": "projects",            "description": "<p>the list of projects for a given user</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "{\n    \"owned\": [\n        {\n            \"id\": 1,\n            \"projectName\": \"TMNT\",\n            \"description\": \"You gotta know what a crumpet is to understand cricket!\",\n            \"version\": \"1.2.3\",\n            \"license\": \"MIT\",\n            \"authors\": \"Casey Jones, Raphael\",\n            \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n            \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n            \"containerizationToolId\": null,\n            \"continuousIntegrationToolId\": 1,\n            \"deploymentToolId\": 3,\n            \"webFrameworkId\": null,\n            \"projectOwner\": {\n                \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n                \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n                \"projectId\": 1,\n                \"userId\": 3\n            }\n        }\n    ],\n    \"contributed\": [\n        {\n            \"id\": 1,\n            \"projectName\": \"TMNT\",\n            \"description\": \"You gotta know what a crumpet is to understand cricket!\",\n            \"version\": \"1.2.3\",\n            \"license\": \"MIT\",\n            \"authors\": \"Casey Jones, Raphael\",\n            \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n            \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n            \"containerizationToolId\": null,\n            \"continuousIntegrationToolId\": 1,\n            \"deploymentToolId\": 3,\n            \"webFrameworkId\": null,\n            \"projectContributor\": {\n                \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n                \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n                \"projectId\": 1,\n                \"userId\": 3\n            }\n        }\n    ]\n}",          "type": "json"        }      ]    },    "filename": "src/routes/projects.js",    "groupTitle": "Projects"  },  {    "type": "patch",    "url": "/projects/:id",    "title": "Update a project",    "version": "1.0.0",    "name": "patch_project",    "group": "Projects",    "permission": [      {        "name": "project owner"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>the id of the project to update</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "project",            "description": "<p>the updated project</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "{\n  \"id\": 1,\n  \"projectName\": \"TMNT\",\n  \"description\": \"You gotta know what a crumpet is to understand cricket!\",\n  \"version\": \"1.2.3\",\n  \"license\": \"MIT\",\n  \"authors\": \"Casey Jones, Raphael\",\n  \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n  \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n  \"containerizationToolId\": null,\n  \"continuousIntegrationToolId\": 1,\n  \"deploymentToolId\": 3,\n  \"webFrameworkId\": null\n}",          "type": "json"        }      ]    },    "filename": "src/routes/projects.js",    "groupTitle": "Projects"  },  {    "type": "post",    "url": "/projects/projects",    "title": "Create a project",    "version": "1.0.0",    "name": "post_project",    "group": "Projects",    "permission": [      {        "name": "authenticated user"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "projectName",            "description": "<p>the name of the project</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>the description to the project</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "version",            "description": "<p>the version of the project</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "license",            "description": "<p>the name of the license</p>"          },          {            "group": "Parameter",            "type": "[String]",            "optional": false,            "field": "authors",            "description": "<p>a list of author names</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "containerizationTool",            "description": "<p>the name of the containerization tool or <None></p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "continuousIntegrationTool",            "description": "<p>the name of the continuous integration tool or <None></p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "deploymentTool",            "description": "<p>the name of the deployment tool or <None></p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "webFramework",            "description": "<p>the name of the web framework or <None></p>"          }        ]      },      "examples": [        {          "title": "Request Example:",          "content": "{\n \"projectName\": \"hammer-io\",\n \"description\": \"Hit it with a Hammer!\",\n \"version\": \"0.0.1\",\n \"license\": \"MIT\",\n \"authors\": [\"Holmgang\"],\n \"containerizationTool\": \"Docker\",\n \"continuousIntegrationTool\": \"TravisCI\",\n \"deploymentTool\": \"Heroku\",\n \"webFramework\": \"ExpressJS\"\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "project",            "description": "<p>the created project</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "{\n  \"id\": 1,\n  \"projectName\": \"hammer-io\",\n  \"description\": \"Hit it with a Hammer!\",\n  \"version\": \"0.0.1\",\n  \"license\": \"MIT\",\n  \"authors\": \"Holmgang\",\n  \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n  \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n  \"containerizationToolId\": 2,\n  \"continuousIntegrationToolId\": 1,\n  \"deploymentToolId\": 3,\n  \"webFrameworkId\": 4\n}",          "type": "json"        }      ]    },    "filename": "src/routes/projects.js",    "groupTitle": "Projects"  },  {    "type": "get",    "url": "/projects",    "title": "Get all public projects",    "version": "1.0.0",    "name": "projects",    "group": "Projects",    "permission": [      {        "name": "none"      }    ],    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "projects",            "description": "<p>List of all of the public projects</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "[\n {\n   \"id\": 1,\n   \"projectName\": \"TMNT\",\n   \"description\": \"You gotta know what a crumpet is to understand cricket!\",\n   \"version\": \"1.2.3\",\n   \"license\": \"MIT\",\n   \"authors\": \"Casey Jones, Raphael\",\n   \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n   \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n   \"containerizationToolId\": null,\n   \"continuousIntegrationToolId\": 1,\n   \"deploymentToolId\": 3,\n   \"webFrameworkId\": null\n }\n]",          "type": "json"        }      ]    },    "filename": "src/routes/projects.js",    "groupTitle": "Projects"  },  {    "type": "get",    "url": "/user/projects",    "title": "Get projects for an authenticated user",    "version": "1.0.0",    "name": "user_projects",    "group": "Projects",    "permission": [      {        "name": "authenticated user"      }    ],    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "projects",            "description": "<p>list of projects for authenticated user</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "{\n    \"owned\": [\n        {\n            \"id\": 1,\n            \"projectName\": \"TMNT\",\n            \"description\": \"You gotta know what a crumpet is to understand cricket!\",\n            \"version\": \"1.2.3\",\n            \"license\": \"MIT\",\n            \"authors\": \"Casey Jones, Raphael\",\n            \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n            \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n            \"containerizationToolId\": null,\n            \"continuousIntegrationToolId\": 1,\n            \"deploymentToolId\": 3,\n            \"webFrameworkId\": null,\n            \"projectOwner\": {\n                \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n                \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n                \"projectId\": 1,\n                \"userId\": 3\n            }\n        }\n    ],\n    \"contributed\": [\n        {\n            \"id\": 1,\n            \"projectName\": \"TMNT\",\n            \"description\": \"You gotta know what a crumpet is to understand cricket!\",\n            \"version\": \"1.2.3\",\n            \"license\": \"MIT\",\n            \"authors\": \"Casey Jones, Raphael\",\n            \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n            \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n            \"containerizationToolId\": null,\n            \"continuousIntegrationToolId\": 1,\n            \"deploymentToolId\": 3,\n            \"webFrameworkId\": null,\n            \"projectContributor\": {\n                \"createdAt\": \"2017-11-12T17:08:30.000Z\",\n                \"updatedAt\": \"2017-11-12T17:08:30.000Z\",\n                \"projectId\": 1,\n                \"userId\": 3\n            }\n        }\n    ]\n}",          "type": "json"        }      ]    },    "filename": "src/routes/projects.js",    "groupTitle": "Projects"  }] });
