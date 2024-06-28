const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'UTMA NETWORK API',
            version: '1.0.0',
            description: 'API documentation for UTMA Network'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        paths: {
            '/api/forums': {
                get: {
                    tags: ['Forums'],
                    summary: 'Get all forums',
                    description: 'Retrieve a list of all forums.',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'A list of forums',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'integer', example: 1 },
                                                name: { type: 'string', example: 'General Discussion' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    tags: ['Forums'],
                    summary: 'Create a new forum',
                    description: 'Create a new forum.',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string', example: 'New Forum' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Forum created',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            name: { type: 'string', example: 'New Forum' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/forums/{id}': {
                get: {
                    tags: ['Forums'],
                    summary: 'Get a forum by ID',
                    description: 'Retrieve a forum by its ID.',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'integer',
                                example: 1
                            }
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'A forum object',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            name: { type: 'string', example: 'General Discussion' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                patch: {
                    tags: ['Forums'],
                    summary: 'Update a forum by ID',
                    description: 'Update the details of a forum by its ID.',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'integer',
                                example: 1
                            }
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string', example: 'Updated Forum' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Forum updated',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            name: { type: 'string', example: 'Updated Forum' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    tags: ['Forums'],
                    summary: 'Delete a forum by ID',
                    description: 'Delete a forum by its ID.',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'integer',
                                example: 1
                            }
                        }
                    ],
                    responses: {
                        '204': {
                            description: 'Forum deleted'
                        }
                    }
                }
            },
            '/api/friend-requests': {
                get: {
                    tags: ['Friend Requests'],
                    summary: 'Get all friend requests',
                    description: 'Retrieve a list of all friend requests.',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'A list of friend requests',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'integer', example: 1 },
                                                senderId: { type: 'integer', example: 1 },
                                                receiverId: { type: 'integer', example: 2 }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    tags: ['Friend Requests'],
                    summary: 'Create a new friend request',
                    description: 'Create a new friend request.',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        senderId: { type: 'integer', example: 1 },
                                        receiverId: { type: 'integer', example: 2 }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Friend request created',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            senderId: { type: 'integer', example: 1 },
                                            receiverId: { type: 'integer', example: 2 },
                                            status: { type: 'string', example: 'pending' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                patch: {
                    tags: ['Friend Requests'],
                    summary: 'Update a friend request',
                    description: 'Update the status of a friend request.',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'integer', example: 1 },
                                        status: { type: 'string', example: 'accepted' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Friend request updated',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            senderId: { type: 'integer', example: 1 },
                                            receiverId: { type: 'integer', example: 2 },
                                            status: { type: 'string', example: 'accepted' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/friends': {
                get: {
                    tags: ['Friends'],
                    summary: 'Get all friends',
                    description: 'Retrieve a list of all friends.',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'A list of friends',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'integer', example: 1 },
                                                userId: { type: 'integer', example: 1 },
                                                friendId: { type: 'integer', example: 2 }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    tags: ['Friends'],
                    summary: 'Delete a friend',
                    description: 'Remove a friend from the user\'s friend list.',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        userId: { type: 'integer', example: 1 },
                                        friendId: { type: 'integer', example: 2 }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '204': {
                            description: 'Friend deleted'
                        }
                    }
                }
            },
            '/api/majors': {
                post: {
                    tags: ['Majors'],
                    summary: 'Create a new major',
                    description: 'Create a new major.',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string', example: 'Computer Science' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Major created',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            name: { type: 'string', example: 'Computer Science' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                get: {
                    tags: ['Majors'],
                    summary: 'Get all majors',
                    description: 'Retrieve a list of all majors.',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'A list of majors',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'integer', example: 1 },
                                                name: { type: 'string', example: 'Computer Science' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/majors/{id}': {
                get: {
                    tags: ['Majors'],
                    summary: 'Get a major by ID',
                    description: 'Retrieve a major by its ID.',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'integer',
                                example: 1
                            }
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'A major object',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            name: { type: 'string', example: 'Computer Science' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/posts': {
                get: {
                    tags: ['Posts'],
                    summary: 'Get all posts',
                    description: 'Retrieve a list of all posts.',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'A list of posts',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'integer', example: 1 },
                                                title: { type: 'string', example: 'First Post' },
                                                content: { type: 'string', example: 'This is the content of the first post.' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    tags: ['Posts'],
                    summary: 'Create a new post',
                    description: 'Create a new post.',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string', example: 'First Post' },
                                        content: { type: 'string', example: 'This is the content of the first post.' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Post created',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            title: { type: 'string', example: 'First Post' },
                                            content: { type: 'string', example: 'This is the content of the first post.' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/posts/{id}': {
                get: {
                    tags: ['Posts'],
                    summary: 'Get a post by ID',
                    description: 'Retrieve a post by its ID.',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'integer',
                                example: 1
                            }
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'A post object',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            title: { type: 'string', example: 'First Post' },
                                            content: { type: 'string', example: 'This is the content of the first post.' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                patch: {
                    tags: ['Posts'],
                    summary: 'Update a post by ID',
                    description: 'Update the details of a post by its ID.',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'integer',
                                example: 1
                            }
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string', example: 'Updated Post' },
                                        content: { type: 'string', example: 'This is the updated content of the post.' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Post updated',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            title: { type: 'string', example: 'Updated Post' },
                                            content: { type: 'string', example: 'This is the updated content of the post.' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    tags: ['Posts'],
                    summary: 'Delete a post by ID',
                    description: 'Delete a post by its ID.',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'integer',
                                example: 1
                            }
                        }
                    ],
                    responses: {
                        '204': {
                            description: 'Post deleted'
                        }
                    }
                }
            },
            '/api/topics': {
                get: {
                    tags: ['Topics'],
                    summary: 'Get all topics',
                    description: 'Retrieve a list of all topics.',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'A list of topics',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'integer', example: 1 },
                                                title: { type: 'string', example: 'General Topic' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    tags: ['Topics'],
                    summary: 'Create a new topic',
                    description: 'Create a new topic.',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string', example: 'New Topic' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'Topic created',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            title: { type: 'string', example: 'New Topic' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/topics/{id}': {
                get: {
                    tags: ['Topics'],
                    summary: 'Get a topic by ID',
                    description: 'Retrieve a topic by its ID.',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'integer',
                                example: 1
                            }
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'A topic object',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            title: { type: 'string', example: 'General Topic' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                patch: {
                    tags: ['Topics'],
                    summary: 'Update a topic by ID',
                    description: 'Update the details of a topic by its ID.',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'integer',
                                example: 1
                            }
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string', example: 'Updated Topic' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Topic updated',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            title: { type: 'string', example: 'Updated Topic' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    tags: ['Topics'],
                    summary: 'Delete a topic by ID',
                    description: 'Delete a topic by its ID.',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'integer',
                                example: 1
                            }
                        }
                    ],
                    responses: {
                        '204': {
                            description: 'Topic deleted'
                        }
                    }
                }
            },
            '/api/users': {
                post: {
                    tags: ['Users'],
                    summary: 'Create a new user',
                    description: 'Create a new user.',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        username: { type: 'string', example: 'newuser' },
                                        password: { type: 'string', example: 'password' },
                                        email: { type: 'string', example: 'user@example.com' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'User created',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            username: { type: 'string', example: 'newuser' },
                                            email: { type: 'string', example: 'user@example.com' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/users/confirm/{token}': {
                get: {
                    tags: ['Users'],
                    summary: 'Confirm a user',
                    description: 'Confirm a user by token.',
                    parameters: [
                        {
                            in: 'path',
                            name: 'token',
                            required: true,
                            schema: {
                                type: 'string',
                                example: 'confirmationtoken'
                            }
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'User confirmed'
                        }
                    }
                }
            },
            '/api/users/login': {
                post: {
                    tags: ['Users'],
                    summary: 'Authenticate a user',
                    description: 'Authenticate a user and return a token.',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        email: { type: 'string', example: 'email' },
                                        password: { type: 'string', example: 'password' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Authentication successful',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            token: { type: 'string', example: 'JWT token' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/users/profile': {
                get: {
                    tags: ['Users'],
                    summary: 'Get user profile',
                    description: 'Get the profile of the authenticated user.',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'User profile',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            username: { type: 'string', example: 'user' },
                                            email: { type: 'string', example: 'user@example.com' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/users/forget-password': {
                post: {
                    tags: ['Users'],
                    summary: 'Reset password',
                    description: 'Request a password reset.',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        email: { type: 'string', example: 'user@example.com' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Password reset request successful'
                        }
                    }
                }
            },
            '/api/users/forget-password/{token}': {
                get: {
                    tags: ['Users'],
                    summary: 'Validate password reset token',
                    description: 'Validate a password reset token.',
                    parameters: [
                        {
                            in: 'path',
                            name: 'token',
                            required: true,
                            schema: {
                                type: 'string',
                                example: 'resettoken'
                            }
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Token is valid'
                        }
                    }
                },
                post: {
                    tags: ['Users'],
                    summary: 'Set a new password',
                    description: 'Set a new password using the reset token.',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        password: { type: 'string', example: 'newpassword' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Password reset successful'
                        }
                    }
                }
            },
            '/api/user-types': {
                post: {
                    tags: ['User Types'],
                    summary: 'Create a new user type',
                    description: 'Create a new user type.',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string', example: 'Admin' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'User type created',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            name: { type: 'string', example: 'Admin' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                get: {
                    tags: ['User Types'],
                    summary: 'Get all user types',
                    description: 'Retrieve a list of all user types.',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        '200': {
                            description: 'A list of user types',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'integer', example: 1 },
                                                name: { type: 'string', example: 'Admin' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/user-types/{id}': {
                get: {
                    tags: ['User Types'],
                    summary: 'Get a user type by ID',
                    description: 'Retrieve a user type by its ID.',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'integer',
                                example: 1
                            }
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'A user type object',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: 1 },
                                            name: { type: 'string', example: 'Admin' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: [] // No necesitamos esto ya que estamos definiendo manualmente
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Swagger ready in http://localhost:${port}/api/docs`);
}

module.exports = swaggerDocs;
