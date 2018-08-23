const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'gallery' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/paintings', title: 'Painting' },
  { link: '/artists', title: 'Artist' }
];

const paintingRouter = require('./src/routes/paintingRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);
const artistRouter = require('./src/routes/artistRoute');

app.use('/paintings', paintingRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/artists', artistRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/paintings', title: 'Paintings' },
        { link: '/artists', title: 'Artists' }],
      title: 'My Art Gallery'
    }
  );
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
