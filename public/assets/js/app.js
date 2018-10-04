$( document ).ready(function() {

    // Grab the articles as a json

    $(document).on("click", ".scrape", function(){

        $.get("/scrape").then(function(data) {
            console.log(data);
            window.location = "/";
        });
    });

    //Handle Save Article button
    $(".save").on("click", function() {
        var thisId = $(this).attr("data-id");
        console.log(thisId)
        $.post("/articles/save/"+thisId).then(function(data) {
            console.log(data);
        })
    });

    //Handle Delete Article button
    $(document).on("click",".delete", function() {
        var Id = $(".delete").attr("data-id");
        $.ajax({
            method: "POST",
            url: "/articles/delete/" + Id
        }).then(function(data) {
            window.location = "/notes"
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
              window.location = "/notes"
          });
    }
});
  //Handle Delete Note button
$(".deleteNote").on("click", function() {
    var noteId = $(this).attr("data-note-id");
    var articleId = $(this).attr("data-article-id");
    $.ajax({
        method: "DELETE",
        url: "/notes/delete/" + noteId + "/" + articleId
    }).then(function(data) {
        console.log(data)
        $(".modalNote").modal("hide");
        window.location = "/notes"
    })
});



});