// 📁 models/book.model.js
const mongoose = require('mongoose');
const elasticClient = require('../utils/elastic');  // استيراد العميل من إعدادات Elasticsearch

const chapterSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    title: { type: String, required: true },
    order: { type: Number },
    problems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
    summary: { type: String, required: true }
}, { timestamps: true });

// chapterSchema.post('save', async function (doc) {
//     await elasticClient.index({
//         index: 'chapters',
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

// chapterSchema.post('findOneAndUpdate', async function (doc) {
//     if (doc) {
//         await elasticClient.index({
//             index: 'chapters',
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

// chapterSchema.post('findOneAndDelete', async function (doc) {
//     if (doc) {
//         await elasticClient.delete({
//             index: 'chapters',
//             id: doc._id.toString()
//         });
//     }
// });

module.exports = mongoose.model('Chapter', chapterSchema);
