console.log("wczytano plik Music.js");
var dd;
class Music {
  constructor() {
    console.log("konstruktor klasy Music");
  }

  load(event) {
    var ab = $(event)
      .parent()
      .parent()
      .children()[0].innerHTML;
    var bc = $(event)
      .parent()
      .parent()
      .children()[1].innerHTML;
    $("#audio_src").attr("src", "/mp3/" + ab + "/" + bc);
    $("#audio").trigger("load");
    $("#audio").trigger("play");
    $(".plays").css("display", "none");
    $(".stops").css("display", "inline-block");
  }
  play(event) {
    $(event).css("display", "none");
    $(".stops").css("display", "inline-block");
    $("#audio").trigger("play");
  }
  pause(event) {
    $(event).css("display", "none");
    $(".plays").css("display", "inline-block");
    $("#audio").trigger("pause");
  }
  next(event) {
    var ab = $($($(".wysokosc")[event]).children())[0].innerHTML;
    var bc = $($($(".wysokosc")[event]).children())[1].innerHTML;
    $("#pusc").children()[0].innerHTML = bc;
    $($(".wysokosc")[background]).removeClass("playing");
    $($(".wysokosc")[event]).addClass("playing");
    background = event;
    $("#audio_src").attr("src", "/mp3/" + ab + "/" + bc);
    $("#audio").trigger("load");
    $("#audio").trigger("play");
  }
  prev(event) {
    var ab = $($($(".wysokosc")[event]).children())[0].innerHTML;
    var bc = $($($(".wysokosc")[event]).children())[1].innerHTML;
    $("#pusc").children()[0].innerHTML = bc;
    $($(".wysokosc")[background]).removeClass("playing");
    $($(".wysokosc")[event]).addClass("playing");
    background = event;
    $("#audio_src").attr("src", "/mp3/" + ab + "/" + bc);
    $("#audio").trigger("load");
    $("#audio").trigger("play");
  }
}
