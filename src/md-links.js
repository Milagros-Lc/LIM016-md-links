#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
var https = require('https');
let arrayObject = [], link = {};
let position, newArray;

function mdLinks(rutaConvert, options) {

  options == "--validate" ? options = true : options = false;
  let ruttaa = rutaConvert;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      recursiveFile(rutaConvert, function (err, data) {
        if (!!data) {
          resolve(recorrerFiles(data, options));
        }
        else {
          reject('Ruta ingresada no existe');
        }
      });
    }, 2000)
  })
}
function recorrerFiles(data, options) {
  if (data.length == "") {
    console.log("Archivo vacio");
  }
  data.map(element => mdFile(element));

  function mdFile(element) {

    const exten = path.extname(element);
    if (exten == ".md") {
      //console.log(path.basename(element));
      const x = path.basename(element);
      fs.readFile(element.replace(/\r?\n|\r/g, ""), function (err, datos) {
        let textData = element.toString();
        let arrayData = textData.split("\\");
        let dataSlice = arrayData.slice(-2);
        let rutaMinificada = dataSlice.join("/");

        if (err) {
          console.log(err);
        }
        const readInterface = readline.createInterface({
          input: fs.createReadStream(element),
        });
        readInterface.on('line', function (line) {
          position = line.search(/(?:http|https):\/\/(?:[^\/\r\n]+)(\/[^\r\n]*)?/g);
          let linea = line;
          if (position != -1) {
            let httpp = linea.split("](");
            if (httpp[1] != undefined) {
              newArray = httpp[1].split(")");
              link = {
                "href": '',
                "text": '',
                "file": '',
                "status": '',
                "sms": ''
              }
              if(options==true){
                validateFun(link, newArray[0], httpp[0].replace(/([|°<>!"#$%&/()=?:.*@¡\-'[;{}_])/g, ""), rutaMinificada)

                .then(linkk => console.log(linkk.file, " ", linkk.href, " ", linkk.status, " ", linkk.sms, " ", linkk.text))
                .catch(error => console.log(error))

              }else{
                link = {
                  "href": newArray[0],
                  "text": httpp[0].replace(/([|°<>!"#$%&/()=?:.*@¡\-'[;{}_])/g, ""),
                  "file": "./" + rutaMinificada
                 
                }
                console.log(link.file, " ", link.href, " ", link.text);
              }
           
            }
          }
        });
      });
    }
  }
}
function validateFun(link, newArray, httpp, rutaMinificada) {


  return new Promise((resolve, reject) => {
    setTimeout(() => {
      https.get(newArray, function (res) {
        let result = res.statusCode;
        if (result === 200) {
          result = "200";
          link = {
            "href": newArray,
            "text": httpp,
            "file": "./" + rutaMinificada,
            "status": result,
            "sms": 'ok'
          }
          resolve(link);
          reject('errorrrrrrrrrr');
        }

      }).on('error', function (e) {
        link = {
          "href": newArray,
          "text": httpp,
          "file": "./" + rutaMinificada,
          "status": '404',
          "sms": 'fail'
        }

        resolve(link);
        reject('errorrrrrrrrrr');

      });

    }, 2000)
  })
}

function recursiveFile(dir, done) {
  let results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          results.push(file);
          recursiveFile(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

function verifyUrl(url) {
  https.get(url, function (res) {
    let result = res.statusCode;
    if (result === 200) {
      return console.log("ok");
    }
    /*   console.log("headers: ", res.headers);  
      res.on('data', function (d) {
        process.stdout.write(d);
      }); */
  }).on('error', function (e) {
    return console.log("fail");

  });
}


module.exports = mdLinks;