const mongoose = require('mongoose');
const elasticClient = require('../utils/elastic');  // استيراد العميل من إعدادات Elasticsearch

const problemSchema = new mongoose.Schema({
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  content: { type: String, required: true },
  audioUrls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Audio' }],
  videoUrls: [{ type: String }],
  notes: { type: String },
  /// start , end 
  startPageNumber: { type: Number },
  endPageNumber: { type: Number },
  referenceImages: [{ type: String }],
}, { timestamps: true });

// // Elastic Sync Hooks
// problemSchema.post('save', async function (doc) {
//   await elasticClient.index({
//     index: 'problems',
//     id: doc._id.toString(),
//     document: {
//       content: doc.content,
//       // chapter: doc.chapter.toString(),
//       notes: doc.notes,
//       // audioUrls: doc.audioUrls,
//       // videoUrls: doc.videoUrls,
//       // referenceImages: doc.referenceImages,
//     }
//   });
// });

// problemSchema.post('findOneAndUpdate', async function (doc) {
//   if (doc) {
//     await elasticClient.index({
//       index: 'problems',
//       id: doc._id.toString(),
//       document: {
//         content: doc.content,
//         // chapter: doc.chapter.toString(),
//         notes: doc.notes,
//         // audioUrls: doc.audioUrls,
//         // videoUrls: doc.videoUrls,
//         // referenceImages: doc.referenceImages,
//       }
//     });
//   }
// });

// problemSchema.post('findOneAndDelete', async function (doc) {
//   if (doc) {
//     await elasticClient.delete({
//       index: 'problems',
//       id: doc._id.toString()
//     });
//   }
// });

module.exports = mongoose.model('Problem', problemSchema);
