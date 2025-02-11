const fs = require('fs')
var nodemailer = require('nodemailer');
const dataAccess = require('../DatabaseConnection/data-access');
const Connection = require('../DatabaseConnection/Connection');
const axios = require('axios');

exports.jsonParse = function (data, pos, key) {
    return new Promise((resolve, reject) => {
        try {
            if (typeof data[pos][key] == 'string') {
                data[pos][key] = JSON.parse(data[pos][key]);
            }
            resolve('ok')
            //console.log('ok');
        } catch (error) {
            reject(error)
            console.log("err--", error);
        }
    })
}


exports.deleteFile = function (deleteFilename) {
    return new Promise((resolve, reject) => {
        try {
            if (fs.existsSync(deleteFilename)) {
                fs.unlink(deleteFilename, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    //console.log('deleted');
                })
            }
            resolve('ok')
            //console.log('ok');
        } catch (error) {
            reject(error)
            console.log("err--", error);
        }
    })
}

exports.setErrorLog = async function (service_name, method, message, request_body) {
    try {
        await Connection.connect();
        var data = [
            { name: 'Query', value: 'Insert' },
            { name: 'ServiceName', value: service_name },
            { name: 'Method', value: method },
            { name: 'Message', value: message },
            { name: 'RequestBody', value: JSON.stringify(request_body) },
        ]

        console.log('=============== Start Error Data ===============');
        console.log(data);
        console.log('=============== End Error Data ===============');

        const result = await dataAccess.execute('SP_ErrorLog', data);
        if (result.rowsAffected && result.rowsAffected[0] == 1) {
            console.log("=============== error inserted ===============");
        } else {
            console.log("=============== error not inserted ===============");
        }

    } catch (error) {
        return error.message;
    }
} 