/**
 * Created by yu on 2017/5/7.
 */
var fs = require('fs');
var mysql = require('mysql');

//var user = 'debian-sys-maint'; 
//var password = 'UyFGHFTr7gFhOnVF';

var user = 'root';
var password = 'root';

exports.get_all_disease = function () {
    var client = mysql.createConnection({
        user: user,
        password: password,
        database: 'db_biology'
    });
    client.connect();
    var promise = new Promise(function (resolve, reject) {
        client.query('SELECT distinct disname FROM tpredict_dmpred', function (err, result) {
            if (result) {
                var obj = {
                    "name": result
                };
                resolve(JSON.stringify(obj));
            }
        });
    });
    client.end();
    return promise.then(function (value) {
        return value;
    }, function (value) {

    });
    return promise;
};


exports.get_all_mirna = function () {
    var client = mysql.createConnection({
        user: user,
        password: password,
        database: 'db_biology'
    });
    client.connect();
    var promise = new Promise(function (resolve, reject) {
        client.query('SELECT distinct miname FROM tpredict_dmpred ORDER BY miname', function (err, result) {
            if (result) {
                var obj = {
                    "name": result
                };
                resolve(JSON.stringify(obj));
            }
        });
    });
    client.end();
    return promise.then(function (value) {
        return value;
    }, function (value) {

    });
    return promise;
};


var all_pradiction2_2;

exports.get_all_prediction1_1 = function (value) {
    var client = mysql.createConnection({
        user: user,
        password: password,
        database: 'db_biology'
    });
    var list = new Array();
    client.connect();
    var promise = new Promise(function (resolve, reject) {
        client.query("SELECT * FROM tpredict_dmpred WHERE disname='" + value + "' ORDER BY score DESC",
            function (err, result) {
                if (result) {
                    list = result;
                    var obj = {
                        "name": list
                    };
                    resolve(JSON.stringify(obj));
                }
            });
    });
    client.end();
    return promise.then(function (value) {
        return value;
    }, function (value) {

    });
    return promise;
};


exports.get_all_prediction1_2 = function (value) {
    var client = mysql.createConnection({
        user: user,
        password: password,
        database: 'db_biology'
    });
    //创建连接
    client.connect();
    var promise = new Promise(function (resolve, reject) {
        client.query("SELECT * FROM tknownresult WHERE disname='" + value + "'",
            function (err, result) {
                if (result) {
                    var obj = {
                        "name": result
                    };
                    resolve(JSON.stringify(obj));

                }
            });
    });
    client.end();
    return promise.then(function (value) {
        return value;
    }, function (value) {

    });
    return promise;

};


exports.get_all_prediction2_1 = function (value) {
    var client = mysql.createConnection({
        user: user,
        password: password,
        database: 'db_biology'
    });
    var list = new Array();
    client.connect();
    var promise = new Promise(function (resolve, reject) {
        client.query("SELECT * FROM tpredict_dmpred WHERE miname='" + value + "' ORDER BY score DESC",
            function (err, result) {
                if (result) {
                    var obj = {
                        "name": result
                    };
                    resolve(JSON.stringify(obj));
                }
            });
    });
    client.end();
    return promise.then(function (value) {
        return value;
    }, function (value) {

    });
    return promise;

};


exports.get_all_prediction2_2 = function (value) {
    var client = mysql.createConnection({
        user: user,
        password: password,
        database: 'db_biology'
    });
    client.connect();
    var promise = new Promise(function (resolve, reject) {
        client.query("SELECT * FROM tknownresult WHERE miname='" + value + "'",
            function (err, result) {
                if (result) {
                    var obj = {
                        "name": result
                    };
                    resolve(JSON.stringify(obj));
                }
            });
    });
    client.end();
    return promise.then(function (value) {
        return value;
    }, function (value) {

    });
    return promise;
};





exports.get_similarly = function (list) {
    var client = mysql.createConnection({
        user: user,
        password: password,
        database: 'db_biology'
    });
    var str2 = "(";
    for (var i = 0; i < list.length; i++) {
        if (i != list.length - 1)
            str2 = str2 + "'" + list[i] + "',";
        else
            str2 = str2 + "'" + list[i] + "'";
    }
    str2 = str2 + ") and field2 in (";
    for (var i = 0; i < list.length; i++) {
        if (i != list.length - 1)
            str2 = str2 + "'" + list[i] + "',";
        else
            str2 = str2 + "'" + list[i] + "'";
    }
    str2 = str2 + ")";
    client.connect();
    var promise = new Promise(function (resolve, reject) {
        client.query("SELECT * FROM Sheet1 WHERE field1 in " + str2,
            function (err, result) {
                if (result) {
                   resolve(result);
                }else{
                    console.log(err);
                }
            });
    });

    return promise.then(function (value) {
        return value;
    }, function (value) {

    });
    return promise;
};



exports.get_all_famclurank_disease = function () {
    var client = mysql.createConnection({
        user: user,
        password: password,
        database: 'db_biology'
    });
    client.connect();
    var promise = new Promise(function (resolve, reject) {
        client.query("SELECT distinct disname FROM tmidislatest_famclurank",
            function (err, result) {
                if (result) {
                    var obj = {
                        "name": result
                    };
                    resolve(JSON.stringify(obj));
                }
            });
    });
    client.end();
    return promise.then(function (value) {
        return value;
    }, function (value) {

    });
    return promise;
};


exports.get_all_famclurank_known_mirnas = function (disease_name) {

    var client = mysql.createConnection({
        user: user,
        password: password,
        database: 'db_biology'
    });
    client.connect();
    var promise = new Promise(function (resolve, reject) {
        client.query("SELECT distinct miname FROM tmidislatest_famclurank WHERE disname='" + disease_name + "'",
            function (err, result) {
                if (result) {
                    console.log(result);
                    var obj = {
                        "name": result
                    };
                    resolve(JSON.stringify(obj));
                }else {
                    console.log(err);
                }
            });
    });
    client.end();
    return promise.then(function (value) {
        return value;
    }, function (value) {

    });
    return promise;
};



exports.get_all_famclurank_unknown_mirnas = function (disease_name) {
    var client = mysql.createConnection({
        user: user,
        password: password,
        database: 'db_biology'
    });
    client.connect();
    var promise = new Promise(function (resolve, reject) {
        client.query("SELECT distinct * FROM tpredict_famclurank WHERE disname='" + disease_name + "' ORDER BY 'score' DESC",
            function (err, result) {
                if (result) {
                    console.log(result);
                    var obj = {
                        "name": result
                    };
                    resolve(JSON.stringify(obj));
                }else {
                    console.log(err);
                }
            });
    });
    client.end();
    return promise.then(function (value) {
        return value;
    }, function (value) {

    });
    return promise;
};
