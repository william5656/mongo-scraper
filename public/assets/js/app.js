$( document ).ready(function() {

    // Grab the articles as a json

    $(document).on("click", ".scrape", function(){

        $.get("/scrape").then(function(data) {
            console.log(data);
            location.reload();
        });
    });

    //Handle Save Article button
    $(".save").on("click", function() {
        var thisId = $(this).attr("data-id");
        console.log(thisId)
        $.post("/articles/save/"+thisId).then(function(data) {
            location.reload()
        })
    });

    //Handle Delete Article button
    $(document).on("click",".delete", function() {
        var Id = $(".delete").attr("data-id");
        $.ajax({
            method: "POST",
            url: "/articles/delete/" + Id
        }).then(function(data) {
            location.reload()
        })
    });

    //Handle Save Note button
    $(".saveNote").on("click", function() {
    var thisId = $(this).attr("data-id");
    if (!$("#noteText" + thisId).val()) {
        alert("please enter a note to save")
    }else {
      $.ajax({
            method: "POST",
            url: "/notes/save/" + thisId,
            data: {
              body: $("#noteText" + thisId).val()
            }
          }).done(function(data) {
              // Log the response
              console.log(data);
              // Empty the notes section
              $("#noteText" + thisId).val("");
              $(".modalNote").modal("hide");
              location.reload();
          });
    }
});
  //Handle Delete Note button
$(".deleteNote").on("click", function() {
    var noteId = $(this).attr("data-note-id");
    $.ajax({
        method: "DELETE",
        url: "/notes/" + noteId
    }).then(function(data) {
        console.log(data)
        $(".modalNote").modal("hide");
        location.reload();
    })
});



});