// server.js
require('dotenv').config();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

const app = require('./app.js');

// لو swagger.json في الجذر بجوار server.js
const swaggerDocument = require('./swagger-output.json');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// // Swagger (قبل listen وبعد app جاهز)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



process.on('uncaughtException', (err) => {
    console.error('💥 Uncaught Exception!');
    console.error('Message:', err.message);        // يطبع الرسالة بس
    // console.error('Stack:', err.stack);        // لو عايز الاستاك للتشخيص
    process.exit(1); // انهي البرنامج
});

process.on('unhandledRejection', (err) => {
    console.error('💥 Unhandled Rejection!');
    console.error('Message:', err.message);
    process.exit(1);
});

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');

        // تشغيل السيرفر
        app.listen(PORT, () => {
            console.log(`🚀 Server listening on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to connect to MongoDB:', err);
        process.exit(1);
    });

// // إغلاق آمن
// process.on('SIGINT', () => {
//     console.log('\nSIGINT received. Closing...');
//     mongoose.connection.close(() => process.exit(0));
// });

// process.on('SIGTERM', () => {
//     console.log('\nSIGTERM received. Closing...');
//     mongoose.connection.close(() => process.exit(0));
// });
