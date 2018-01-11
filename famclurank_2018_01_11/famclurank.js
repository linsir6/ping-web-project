var koa = require('koa');
var controller = require('koa-route');
var app = koa();
var querystring = require('querystring');

var views = require('co-views');
var render = views('./view', {
    map: {html: 'ejs'}
});

var koa_static = require('koa-static-server');
var service = require('./service/webAppService.js');

service.get_all_disease();
service.get_all_mirna();
app.use(koa_static({
    rootDir: './static/',
    rootPath: '/static/',
    maxage: 0
}));


app.use(controller.get('/famclurank_download', function*() {
    this.set('Cache-Control', 'private');
    this.body = yield render('famclurank_download');
}));

app.use(controller.get('/famclurank_index', function*() {
    this.set('Cache-Control', 'private');
    this.body = yield render('famclurank_index');
}));

app.use(controller.get('/', function*() {
    this.set('Cache-Control', 'private');
    this.body = yield render('famclurank_index');
}));

app.use(controller.get('/famclurank_predict_result', function*() {
    this.set('Cache-Control', 'private');
    this.body = yield render('famclurank_predict_result');
}));

app.use(controller.get('/famclurank_prediction', function*() {
    this.set('Cache-Control', 'private');
    this.body = yield render('famclurank_prediction');
}));




app.use(controller.get('/init_prediction_1', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield service.get_all_disease();
}));

app.use(controller.get('/init_prediction_2', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield service.get_all_mirna();
}));

app.use(controller.get('/get_all_prediction2_1', function*() {
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    this.set('Cache-Control', 'no-cache');
    this.body = yield service.get_all_prediction2_1(id);
}));

app.use(controller.get('/get_all_prediction2_2', function*() {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    this.body = yield service.get_all_prediction2_2(id);
}));

app.use(controller.get('/get_all_prediction1_1', function*() {
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    this.set('Cache-Control', 'no-cache');
    this.body = yield  service.get_all_prediction1_1(id);
}));

app.use(controller.get('/get_all_prediction1_2', function*() {
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    this.set('Cache-Control', 'no-cache');
    this.body = yield service.get_all_prediction1_2(id);
}));

app.use(controller.get('/select_similarly', function*() {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var a = params.a;
    var obj = JSON.parse(a);
    this.body = yield service.get_similarly(obj);
}));



app.use(controller.get('/get_all_famclurank_disease', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield  service.get_all_famclurank_disease();
}));

app.use(controller.get('/get_all_famclurank_known_mirnas', function*() {

    var params = querystring.parse(this.req._parsedUrl.query);
    var disease_name = params.id;
    this.set('Cache-Control', 'no-cache');
    this.body = yield service.get_all_famclurank_known_mirnas(disease_name);
}));

app.use(controller.get('/get_all_famclurank_unknown_mirnas', function*() {
    var params = querystring.parse(this.req._parsedUrl.query);
    var disease_name = params.id;
    this.set('Cache-Control', 'no-cache');
    this.body = yield service.get_all_famclurank_unknown_mirnas(disease_name);
}));



app.listen(3008);
console.log('Koa server is started!');
