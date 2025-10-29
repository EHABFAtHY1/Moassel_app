// app.js
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('node:path');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Routers
const userRouter = require('./routes/userRoutes');
const bookRoutes = require('./routes/books.routes');
const categoryRoutes = require('./routes/category.routes');
const bookmarkRoutes = require('./routes/bookmark.routes');
const chapterRoutes = require('./routes/chapter.routes');
const exercisesRoutes = require('./routes/exercises.routes');
const problemRoutes = require('./routes/problem.routes');

const resourceBookRoutes = require('./routes/resourceBook.routes');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// /* ------------------------- 1) GLOBAL MIDDLEWARES ------------------------- */
// // // Security headers
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: 'cross-origin' },
//   contentSecurityPolicy: false
// }));


app.use(
  '/',
  rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100,
    message: 'Too many requests from this IP, please try again in an hour!',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);

// CORS + cookies (قبل الراوترات)
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(cookieParser());

// Body parser
// const { createIndexes } = require('./utils/elastic'); // استيراد الدالة الخاصة بإنشاء الفهارس

// // تشغيل Elasticsearch لضمان إنشاء الفهارس قبل بدء التطبيق
// createIndexes().then(() => {
//   console.log('Elasticsearch indexes created successfully');
// }).catch((err) => {
//   console.error('Error creating Elasticsearch indexes:', err);
// });
// app.use(express.urlencoded({ extended: true }));

// // // NoSQL injection
// app.use(mongoSanitize());


// // Prevent parameter pollution (عدّل الـwhitelist حسب مشروعك)

// // Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src/uploads', express.static(path.join(__dirname, 'uploads')));



/* ------------------------------ 2) ROUTES ------------------------------- */
app.get('/', (_req, res) => res.send('Hello World!'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/bookmarks', bookmarkRoutes);
app.use('/api/v1/chapters', chapterRoutes);
app.use('/api/v1/exercises', exercisesRoutes);
app.use('/api/v1/problems', problemRoutes);
app.use('/api/v1/resources', resourceBookRoutes);



app.all('*', (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });
app.use(globalErrorHandler);

process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception!');
  console.error('Message:', err.message);        // يطبع الرسالة بس
   console.error('Stack:', err.stack);        // لو عايز الاستاك للتشخيص
  process.exit(1); // انهي البرنامج
});

process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection!');
  console.error('Message:', err.message);
  process.exit(1);
});

// // Global error handler

module.exports = app;
