const Joi = require('
const userSchema = object({
    username: string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: string()
        .email({ minDomainSegments: 2 })
        .required(),

    password: string()
        .min(8)
        .max(100)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    birthdate: date()
        .less('now')
        .required(),

    bio: string()
        .max(250)
        .optional(),

    website: string()
        .uri()
        .optional(),

    createdAt: date()
        .default(() => new Date(), 'current date'),
});
// Post Schema
const postSchema = object({
    title: string()
        .min(3)
        .max(100)
        .required(),

    content: string()
        .min(1)
        .max(5000)
        .required(),

    authorId: string()
        .guid({ version: ['uuidv4'] })
        .required(),

    createdAt: date()
        .default(() => new Date(), 'current date'),

    updatedAt: date()
        .default(() => new Date(), 'current date')
        .optional(),

    tags: array()
        .items(string().max(30))
        .optional(),

    likes: Joi.number()
        .integer()
        .min(0)
        .default(0),
});

const commentSchema = object({
    postId: string()
        .guid({ version: ['uuidv4'] })
        .required(),

    authorId: string()
        .guid({ version: ['uuidv4'] })
        .required(),

    content: string()
        .min(1)
        .max(1000)
        .required(),

    createdAt: date()
        .default(() => new Date(), 'current date'),

    likes: number()
        .integer()
        .min(0)
        .default(0),
});
