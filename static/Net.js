console.log("wczytano plik Net.js");
przeslij = "";
przeslijcos = "";
przeslijtab = "";
class Net {
  constructor() {
    console.log("konstruktor klasy Net");
    this.sendData();
  }
  sendData() {
    $.ajax({
      url: "/index.html",
      data: {
        nazwa: przeslij
      },
      type: "POST",
      success: function(data) {
        var obj = JSON.parse(data);
        $("#piosenki").remove();
        $(".album").remove();
        var tabelka = $("<div id='piosenki'>");
        for (var hm = 0; hm < obj.files.length; hm++) {
          var bok = $(
            "<div class='wysokosc'><div id='szerokosc'>" +
              obj.name[0] +
              "</div><div id='szerokosc'>" +
              obj.files[hm].file +
              "</div><div id='szerokosc'>" +
              obj.capacity[hm] +
              "MB" +
              "</div><div id = 'dodajzdj'><img src='/player/dodaj.png' class='dodajzdj'></div><div id = 'playzdj'><img src='/player/play.png' class='playzdj'></div></div>"
          );
          $(tabelka).append(bok);
        }
        $("#tabelka").append(tabelka);
        for (var hm = 0; hm < obj.dirs.length; hm++) {
          var img1 = $(
            "<img src=" +
              "'" +
              "/mp3/" +
              obj.dirs[hm] +
              "/zdj.jpg" +
              "'" +
              "alt=" +
              "'" +
              obj.dirs[hm] +
              "'" +
              "class=" +
              "'" +
              "album" +
              "'" +
              ">"
          );
          $("#album").append(img1);
        }
        ui.clicks();
        ui.pobierzdoalbumu();
        for (var hmm = 0; hmm < $(".wysokosc").length; hmm++) {
          if (
            $($(".wysokosc")[hmm]).children()[1].innerHTML ==
            $("#pusc").children()[0].innerHTML
          ) {
            $($(".wysokosc")[hmm]).addClass("playing");
          }
        }
      },
      error: function(xhr, status, error) {
        console.log(xhr);
      }
    });
    // tutaj wysłanie danych ajaxem na serwer
  }
  sendDatabaza() {
    $.ajax({
      url: "/index.html",
      data: {
        nazwa: przeslijcos
      },
      type: "POST",
      success: function(data) {
        var obj = JSON.parse(data);
        $("#piosenki").remove();
        var tabelka = $("<div id='piosenki'>");
        if (obj[0] != undefined) {
          for (var hm = 0; hm < obj.length; hm++) {
            var bok = $(
              "<div class='wysokosc'><div id='szerokosc'>" +
                obj[hm].a +
                "</div><div id='szerokosc'>" +
                obj[hm].b +
                "</div><div id='szerokosc'>" +
                obj[hm].c +
                "</div><div id = 'usunzdj'><img src='/player/usun.png' class='usunzdj'></div><div id = 'playzdj'><img src='/player/play.png' class='playzdj'></div></div>"
            );
            $(tabelka).append(bok);
          }
        }
        $("#tabelka").append(tabelka);
        ui.clicks();
        ui.usunzalbumu();
        for (var hmm = 0; hmm < $(".wysokosc").length; hmm++) {
          if (
            $($(".wysokosc")[hmm]).children()[1].innerHTML ==
            $("#pusc").children()[0].innerHTML
          ) {
            $($(".wysokosc")[hmm]).addClass("playing");
          }
        }
      },
      error: function(xhr, status, error) {
        console.log(xhr);
      }
    });
  }
  sendDatatablica() {
    $.ajax({
      url: "/index.html",
      data: {
        nazwa: przeslijtab
      },
      type: "POST",
      success: function(data) {
        var obj = JSON.parse(data);
      },
      error: function(xhr, status, error) {
        console.log(xhr);
      }
    });
  }
}
