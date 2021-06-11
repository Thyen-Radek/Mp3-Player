console.log("wczytano plik Ui.js");
var idd = -9;
var wazne;
var background;
var do_przeslania;
var do_sprawdzenia;
var aktualny_czas;
var dlugosc_czasu;
var minutnik;
var minutnik1;
class Ui {
  constructor() {
    console.log("konstruktor klasy Ui");
    this.music();
    this.pasek();
    this.mojalbum();
    $("#audio").on("loadeddata", function() {
      console.log("mp3 jest załadowane");
    });
    $("#audio").on("play", function() {
      console.log("mp3 zaczęło grać");
    });
    this.upload()
  }

  //obsługa kliknięć w Ui

  clicks() {
    $(".album").click(function() {
      do_przeslania = przeslij;
      if (do_przeslania != $(this).attr("alt")) {
        przeslij = $(this).attr("alt");
        net.sendData();
      }
    });
    $(".wysokosc").on("mouseover", function() {
      //$(this).css("background-color", "lightgray")
      $($(this).children()[4])
        .children()
        .css("display", "inherit");
      $($(this).children()[3])
        .children()
        .css("display", "inherit");
    });
    $(".wysokosc").on("mouseout", function() {
      //$(this).css("background-color", "gray")
      $($(this).children()[4])
        .children()
        .css("display", "none");
      $($(this).children()[3])
        .children()
        .css("display", "none");
    });
    $(".playzdj").on("click", function() {
      music.load(this);
      wazne = $(
        $(this)
          .parent()
          .parent()
          .children()
      )[1].innerHTML;
      $($(".wysokosc")[background]).removeClass("playing");
      for (var aa = 0; aa < $(".wysokosc").length; aa++) {
        if (wazne == $($(".wysokosc")[aa]).children()[1].innerHTML) {
          idd = aa;
        }
      }
      $("#pusc").children()[0].innerHTML = wazne;
      $($(".wysokosc")[idd]).addClass("playing");
      background = idd;
    });
  }
  music() {
    $(".plays").on("click", function() {
      if (idd == -9) {
        alert("Wybierz piosenke");
      } else {
        music.play(this);
      }
    });
    $(".stops").on("click", function() {
      if (idd == -9) {
        alert("Wybierz piosenke");
      } else {
        music.pause(this);
      }
    });
    $("#nexts").on("click", function() {
      for (var hmm = 0; hmm < $(".wysokosc").length; hmm++) {
        if (
          $($(".wysokosc")[hmm]).children()[1].innerHTML ==
          $("#pusc").children()[0].innerHTML
        ) {
          do_sprawdzenia = $($(".wysokosc")[hmm]).children()[1].innerHTML;
        }
      }
      if (do_sprawdzenia == $("#pusc").children()[0].innerHTML) {
        idd = idd + 1;
        if (idd == $(".wysokosc").length) {
          idd = 0;
        }
        music.next(idd);
      } else {
        alert("Wybierz piosenke");
      }
    });
    $(".prevs").on("click", function() {
      for (var hmm = 0; hmm < $(".wysokosc").length; hmm++) {
        if (
          $($(".wysokosc")[hmm]).children()[1].innerHTML ==
          $("#pusc").children()[0].innerHTML
        ) {
          do_sprawdzenia = $($(".wysokosc")[hmm]).children()[1].innerHTML;
        }
      }
      if (do_sprawdzenia == $("#pusc").children()[0].innerHTML) {
        idd = idd - 1;
        if (idd == -1) {
          idd = $(".wysokosc").length - 1;
        }
        music.prev(idd);
      } else {
        alert("Wybierz piosenke");
      }
    });
  }
  pasek() {
    $("#audio").on("loadeddata", function() {
      $("#audio").on("timeupdate", function() {
        aktualny_czas = $("#audio").prop("currentTime");
        dlugosc_czasu = $("#audio").prop("duration");
        $("#paseczek").css(
          "width",
          (aktualny_czas *
            $("#pasek")
              .css("width")
              .slice(0, $("#pasek").css("width").length - 2)) /
            dlugosc_czasu
        );
        minutnik = Math.floor(dlugosc_czasu % 60);
        minutnik1 = Math.floor(aktualny_czas % 60);
        if (Math.floor(dlugosc_czasu % 60) < 10) {
          minutnik = "0" + Math.floor(dlugosc_czasu % 60);
        }
        if (Math.floor(aktualny_czas % 60) < 10) {
          minutnik1 = "0" + Math.floor(aktualny_czas % 60);
        }
        $($("#pasekitekst").children())[2].innerHTML =
          Math.floor(dlugosc_czasu / 60) + ":" + minutnik;
        $($("#pasekitekst").children())[0].innerHTML =
          Math.floor(aktualny_czas / 60) + ":" + minutnik1;
        ui.zmianaczasu();
      });
    });
  }
  zmianaczasu() {
    $("#pasek").on("click", function(e) {
      $("#audio").trigger("play");
      $("#audio").prop(
        "currentTime",
        (e.clientX - $("#pasek").offset().left) /
          ($("#pasek")
            .css("width")
            .slice(0, $("#pasek").css("width").length - 2) /
            $("#audio").prop("duration"))
      );
    });
  }
  mojalbum() {
    $(".mojealbumy").on("click", function() {
      przeslijcos = "doprzeslania";
      net.sendDatabaza();
    });
  }
  pobierzdoalbumu() {
    $(".dodajzdj").on("click", function() {
      var al = $(this)
        .parent()
        .parent()
        .children()[0].innerHTML;
      var naz = $(this)
        .parent()
        .parent()
        .children()[1].innerHTML;
      var poj = $(this)
        .parent()
        .parent()
        .children()[2].innerHTML;
      przeslijtab = al + ";" + naz + ";" + poj + ";" + "doprzeslania";
      net.sendDatatablica();
    });
  }
  usunzalbumu() {
    $(".usunzdj").on("click", function() {
      $(this)
        .parent()
        .parent()
        .remove();
      console.log("leci");
      var naz = $(this)
        .parent()
        .parent()
        .children()[1].innerHTML;
      przeslijtab = naz + ";" + "doprzeslania";
      net.sendDatatablica();
    });
  }
  upload(){
    $(".upload").on("click",function(){
      window.location.href="upload.html"
    });
  }
}
