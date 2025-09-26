const mongoose = require('mongoose');
const elasticClient = require('../utils/elastic');  // استيراد العميل من إعدادات Elasticsearch

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }]
}, { timestamps: true });

// bookSchema.post('save', async function (doc) {
//     await elasticClient.index({
//         index: 'books',
//         id: doc._id.toString(),
//         document: {
//             title: doc.title,
//             order: doc.order,
//             // book: doc.book.toString(),
//             summary: doc.summary,
//             // createdAt: doc.createdAt,
//             // updatedAt: doc.updatedAt,
//         }
//     });
// });

// bookSchema.post('findOneAndUpdate', async function (doc) {
//     if (doc) {
//         await elasticClient.index({
//             index: 'books',
//             id: doc._id.toString(),
//             document: {
//                 title: doc.title,
//                 order: doc.order,
//                 // book: doc.book.toString(),
//                 summary: doc.summary,
//                 // createdAt: doc.createdAt,
//                 // updatedAt: doc.updatedAt,
//             }
//         });
//     }
// });

// bookSchema.post('findOneAndDelete', async function (doc) {
//     if (doc) {
//         await elasticClient.delete({
//             index: 'books',
//             id: doc._id.toString()
//         });
//     }
// });

module.exports = mongoose.model('Book', bookSchema);
