import COS from 'cos-js-sdk-v5';
import { v4 as uuid } from 'uuid';

let _cos;

async function getKey() {
    const value = await fetch('http://82.156.8.254:80/api/key', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await value.json();
    return data.data;
}

async function getCos() {
    if (!_cos) {
        const key = await getKey();
        _cos = new COS({
            getAuthorization (options, callback) {
                callback({
                    TmpSecretId: key.tmpSecretId,
                    TmpSecretKey: key.tmpSecretKey,
                    SecurityToken: key.sessionToken,
                    // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                    StartTime: key.startTime, // 时间戳，单位秒，如：1580000000
                    ExpiredTime: key.expiredTime, // 时间戳，单位秒，如：1580000900
                });
            }
          });
    }
    return _cos;
}

/**
 * 
 * @param {*} file 参数为file对象
 * @return string 返回值为图片的url
 */
export async function uploadFile(file) {
    const cos = await getCos();
    const name = `/images/${uuid()}.jpg`;
    const value = await new Promise((resolve, reject) => {
        cos.putObject({
            Bucket: 'prototype-1305116978', /* 必须 */
            Region: 'ap-beijing',     /* 存储桶所在地域，必须字段 */
            Key: name,              /* 必须 */
            StorageClass: 'STANDARD',
            Body: file, // 上传文件对象
        }, function(err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
    if (value && value.statusCode === 200) {
        return `//${value.location}`;
    }
    console.error(value);
}