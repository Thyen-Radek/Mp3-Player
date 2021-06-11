var fs = require("fs");
var qs = require("querystring");
var http = require("http");
var formidable = require("formidable");
var pret = 0;
var dir = './static/upload';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
table = { dirs: [], name: [], files: [], capacity: [], link: [] };
tablica = { dirs: [], name: [], files: [], capacity: [], link: [] };
tablicabazy = [];
fs.readdir(__dirname + "/static/mp3", function (err, files) {
  if (err) {
    return console.log(err);
  }
  //
  files.forEach(function (fileName) {
    table.dirs.push(fileName);
    //tu dodaj foldery do wcześniej utworzonej tablicy
  });
  fs.readdir(__dirname + "/static/mp3/" + table.dirs[0], function (err, files) {
    if (err) {
      return console.log(err);
    }
    //
    files.forEach(function (fileName) {
      var stats = fs.statSync(
        __dirname + "/static/mp3/" + table.dirs[0] + "/" + fileName
      );
      tab = { file: fileName };
      if (fileName.slice(fileName.length - 3, fileName.length) != "jpg") {
        table.files.push(tab);
        stats.size = (stats.size / 1024 / 1024).toString().slice(0, 4);
        table.capacity.push(stats.size);
        table.link.push("/mp3/" + table.dirs[0] + "/" + fileName);
      }
      //tu dodaj foldery do wcześniej utworzonej tablicy
    });
    // tu można od razu wywołać taką samą funkcję, która przeczyta pliki z pierwszego katalogu w tablicy
  });
  table.name.push(table.dirs[0]);

  // tu można od razu wywołać taką samą funkcję, która przeczyta pliki z pierwszego katalogu w tablicy
});
var Datastore = require("nedb");

var coll1 = new Datastore({
  filename: "kolekcja.db",
  autoload: true
});

var server = http.createServer(function (req, res) {
  res.writeHead(200, { "content-type": "text/html;charset=utf-8" });
  console.log(req.method); // zauważ ze przesyłane po kliknięciu butona dane, będą typu POST
  switch (req.method) {
    case "GET":
      // tu wykonaj załadowanie statycznej strony z formularzem
      if (req.url === "/index.html") {
        fs.readFile("static/index.html", function (error, data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
          pret = 0;
        });
      } else if (req.url === "/upload.html") {
        fs.readFile("static/upload.html", function (error, data) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        });
      } else if (req.url === "/style.css") {
        fs.readFile("static/style.css", function (error, data) {
          res.writeHead(200, { "Content-Type": "text/css" });
          res.write(data);
          res.end();
        });
      } else if (req.url.indexOf(".js") != -1) {
        fs.readFile(__dirname + "/static" + decodeURI(req.url), function (
          error,
          data
        ) {
          res.writeHead(200, { "Content-type": "application/javascript" });
          res.write(data);
          res.end();
        });
      } else if (
        req.url.indexOf(".jpg") != -1 ||
        req.url.indexOf(".jpeg") != -1 ||
        req.url.indexOf(".png") != -1
      ) {
        fs.readFile(__dirname + "/static/" + decodeURI(req.url), function (
          error,
          data
        ) {
          res.writeHead(200, { "Content-type": "image/jpg" });
          res.write(data);
          res.end();
        });
      } else if (req.url.indexOf(".mp3") != -1) {
        fs.readFile(__dirname + "/static/" + decodeURI(req.url), function (
          error,
          data
        ) {
          res.writeHead(200, { "Content-type": "audio/mp3" });
          res.write(data);
          res.end();
          console.log("przesłano utwór");
        });
      }
      break;
    case "POST":
      if (req.url == "/upload.html") {
        var form = new formidable.IncomingForm();
        form.uploadDir = __dirname + '/static/upload/'     // katalog na zuploadowane pliki
        form.keepExtensions = true
        form.multiples = true                         // zapis z rozszerzeniem pliku
        form.parse(req, function (err, fields, files) {
          if (files.file.length != undefined) {
            for(var a=0;a<files.file.length;a++){
              fs.rename(files.file[a].path, __dirname + '/static/upload/' + files.file[a].name, function (err) {
                if (err) console.log(err)
                console.log("rename ok")
              });
              files.file[a].path = __dirname + '/static/upload/' + files.file[a].name
            }
          }
          else {
            fs.rename(files.file.path, __dirname + '/static/upload/' + files.file.name, function (err) {
              if (err) console.log(err)
              console.log("rename ok")
            });
            files.file.path = __dirname + '/static/upload/' + files.file.name
          }
          res.end(JSON.stringify(files))
        });
      }
      if (req.url == "/index.html") {
        tablica = { dirs: [], name: [], files: [], capacity: [], link: [] };
        tablica.dirs = table.dirs;
        servResponse(req, res);
      }
      break;
  }
});
function servResponse(req, res) {
  var allData = "";

  //kiedy przychodzą dane POSTEM, w postaci pakietów,
  //łącza się po kolei do jednej zmiennej "allData"
  // w poniższej funkcji nic nie modyfikujemy

  req.on("data", function (data) {
    console.log("data: " + data);
    allData += data;
  });

  //kiedy przyjdą już wszystkie dane
  //parsujemy je do obiektu "finish"
  //i odsyłamy do przeglądarki

  req.on("end", function (data) {
    var finish = qs.parse(allData);

    if (finish.nazwa.split(";")[3] == "doprzeslania") {
      var tablicabazyy = finish.nazwa.split(";");
      var doc = {
        a: tablicabazyy[0],
        b: tablicabazyy[1],
        c: tablicabazyy[2]
      };
      coll1.count({ b: tablicabazyy[1] }, function (err, count) {
        console.log("dokumentów jest: ", count);
        if (count != 1) {
          coll1.insert(doc, function (err, newDoc) { });
        }
      });
    } else if (finish.nazwa == "doprzeslania") {
      coll1.find({}, function (err, docs) {
        res.end(JSON.stringify(docs));
      });
    } else if (finish.nazwa.split(";")[1] == "doprzeslania") {
      coll1.remove({ b: finish.nazwa.split(";")[0] }, { multi: true }, function (
        err,
        numRemoved
      ) {
        console.log("usunięto dokumentów: ", numRemoved);
      });
      coll1.find({}, function (err, docs) {
        res.end(JSON.stringify(docs));
      });
    } else {
      tablica.name.push(finish.nazwa);
      fs.readdir(__dirname + "/static/mp3/" + finish.nazwa, function (
        err,
        files
      ) {
        if (err) {
          return console.log(err);
        }
        files.forEach(function (fileName) {
          var stats = fs.statSync(
            __dirname + "/static/mp3/" + finish.nazwa + "/" + fileName
          );
          tab = { file: fileName };
          if (fileName.slice(fileName.length - 3, fileName.length) != "jpg") {
            tablica.files.push(tab);
            stats.size = (stats.size / 1024 / 1024).toString().slice(0, 4);
            tablica.capacity.push(stats.size);
            tablica.link.push("/mp3/" + finish.nazwa + "/" + fileName);
          }
          //tu dodaj foldery do wcześniej utworzonej tablicy
        });
        if (pret == 0) {
          res.end(JSON.stringify(table));
        } else {
          res.end(JSON.stringify(tablica));
        }
        pret = 1;
        // tu można od razu wywołać taką samą funkcję, która przeczyta pliki z pierwszego katalogu w tablicy
      });
    }

  });
}
server.listen(3000, function () {
  console.log("serwer startuje na porcie 3000");
});
