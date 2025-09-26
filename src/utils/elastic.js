const { Client } = require('@elastic/elasticsearch');

// إعداد الاتصال بـ Elasticsearch
const client = new Client({ node: process.env.ELASTIC_URL || 'http://localhost:9200' });

// فهرس الكتاب
const createBooksIndex = async () => {
    const exists = await client.indices.exists({ index: 'books' });
    if (!exists.body) {
        await client.indices.create({
            index: 'books',
            body: {
                mappings: {
                    properties: {
                        title: { type: 'text' },
                        author: { type: 'text' },
                        category: { type: 'keyword' },
                        description: { type: 'text' },
                        // createdAt: { type: 'date' },
                        // updatedAt: { type: 'date' }
                    }
                }
            }
        });
        console.log('Books index created');
    }
};

// فهرس الفصول
const createChaptersIndex = async () => {
    const exists = await client.indices.exists({ index: 'chapters' });
    if (!exists.body) {
        await client.indices.create({
            index: 'chapters',
            body: {
                mappings: {
                    properties: {
                        title: { type: 'text' },
                        order: { type: 'integer' },
                        // book: { type: 'keyword' },
                        summary: { type: 'text' },
                        // createdAt: { type: 'date' },
                        // updatedAt: { type: 'date' }
                    }
                }
            }
        });
        console.log('Chapters index created');
    }
};

// فهرس المسائل
const createProblemsIndex = async () => {
    const exists = await client.indices.exists({ index: 'problems' });
    if (!exists.body) {
        await client.indices.create({
            index: 'problems',
            body: {
                mappings: {
                    properties: {
                        content: { type: 'text' },
                        // chapter: { type: 'keyword' },
                        notes: { type: 'text' },
                        // audioUrls: { type: 'keyword' },
                        // videoUrls: { type: 'keyword' },
                        // referenceImages: { type: 'keyword' },
                        // createdAt: { type: 'date' },
                        // updatedAt: { type: 'date' }
                    }
                }
            }
        });
        console.log('Problems index created');
    }
};

// تأكد من إنشاء جميع الفهارس
const createIndexes = async () => {
    await createBooksIndex();
    await createChaptersIndex();
    await createProblemsIndex();
};

module.exports = { client, createIndexes };
