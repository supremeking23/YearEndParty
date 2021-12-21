$(document).ready(function(){
        /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particles-js', './particles.json', function() {
        console.log('callback - particles.js config loaded');
    });

  
    $("body")
            .on("mouseover", ".icon", function(){
                $(".circle").addClass("stop_spinning");
            })
            .on("mouseleave", ".icon", function(){
                $(".circle").removeClass("stop_spinning");
            })
            .on("click", ".open_greetings_modal_kei", function(){
                $("#greetings_modal_kei").modal("show");
                document.getElementById("video_greetings_kei").play();
               
            })
            .on("click", ".open_greetings_modal_harold", function(){
                $("#greetings_modal_harold").modal("show");
            })
            .on("click", ".open_greetings_modal_fitz", function(){
                $("#greetings_modal_fitz").modal("show");
            })
            .on("click", ".open_greetings_modal_ivan", function(){
                $("#greetings_modal_ivan").modal("show");
            })
            .on("click", ".open_greetings_modal_rommel", function(){
                $("#greetings_modal_rommel").modal("show");
            })

    // autoPlayBackgroundMusic();
});


function autoPlayBackgroundMusic(){
    let background_music = document.getElementById("background_music");
    background_music.play();
}