$(document).ready(function () {
    $("html").on("dragover", function (e) {
        console.log("dragover nad dokumentem html")
        e.preventDefault(); // usuwa domyślne zachowanie strony po wykonaniu zdarzenia
        e.stopPropagation(); // zatrzymuje dalszą propagację zdarzenia
    });
    $("html").on("drop", function (e) {
        console.log("drop na dokumencie html")
        e.preventDefault();
        e.stopPropagation();
    });

    $('#upload').on('dragenter', function (e) {
        console.log("drag enter na divie")
        e.stopPropagation();
        e.preventDefault();
    });
    $('#upload').on('dragover', function (e) {
        console.log("drag over na divie")
        e.stopPropagation();
        e.preventDefault();
    });
    $('#upload').on('dragleave', function (e) {
        console.log("dragleave na divie")
        e.stopPropagation();
        e.preventDefault();

    });
    $('#upload').on('drop', function (e) {
        console.log("drop na divie")
        e.stopPropagation();
        e.preventDefault();
        var file = e.originalEvent.dataTransfer.files;
        // var files = $('#file')[0].files[0];
        var fd = new FormData();
        if(file.length > 1){
            for(var a=0;a<file.length;a++){
                fd.append("file",file[a])
            }
        }
        else {
            fd.append("file",file[0])
        }
        
        console.log(fd)
        
        $.ajax({
            url: '/upload.html',
            type: 'POST',
            data: fd,
            contentType: false, // ajax nie określa typu przesyłanych danych
            processData: false, // ajax w żaden sposób nie przetwarza danych
            success: function (response) {
                console.log(response)
                // tutaj pokaż obrazek w img lub div
                // którego nazwa przyszła z serwer-a
            },

        })
        //.teraz obiekt FormData zastępujący formularz podczas używania Ajax-a (patrz odpowiednia lekcja)

        // teraz Ajax do uploadu pliku (patrz odpowiednia lekcja)

    });
})