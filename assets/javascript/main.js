import employee_data from "./data.js";
let video_greetings = document.getElementById("video_greetings");
let background_music = document.getElementById("background_music");
let qrcode;
$(document).ready(function(){
        /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    // particlesJS.load('particles-js', './particles.json', function() {
    //     console.log('callback - particles.js config loaded');
    // });

    $("body")
            .on("mouseover", ".icon", function(){
                $(".circle").addClass("stop_spinning");
            })
            .on("mouseleave", ".icon", function(){
                $(".circle").removeClass("stop_spinning");
            })
            .on("click", ".open_greetings_modal", openGreetingModal)
            .on("click", ".open_greetings_modal_ivan", function(){
                $("#greetings_modal_ivan").modal("show");
            })
            .on("click", "#pause_btn", function(){
                let pause_btn = $(this);

                if(pause_btn.attr("data-is_playing") == 1){
                    pause_btn.text("Play");
                    video_greetings.pause();
                    pause_btn.attr("data-is_playing", 0);
                }else{
                    pause_btn.text("Pause");
                    video_greetings.play();
                    pause_btn.attr("data-is_playing", 1);
                }
                
            })

            .on("hidden.bs.modal", "#greetings_modal" , closeGreetingModal)
            .on("click", "#play_again_btn", playAgainVideoGreetings)
            .on("click", "#play_automatic", autoPlayBackgroundMusic)



    video_greetings.onended = endGreetingAction
    loadData();

    $("#play_automatic").trigger("click");
});


function autoPlayBackgroundMusic(){
    // background_music.play();
}


function loadData(){

    let employee_icon = ``;
    for(let employee of employee_data){
        employee_icon += `<div 
                            class="icon open_greetings_modal" 
                            data-name="${employee.name}"
                            data-position="${employee.position}"
                            data-video_greeting_link="${employee.video_greeting_link}"
                            data-video_greeting_text="${employee.video_greeting_text}"
                            data-gcash_number="${employee.gcash_number}"
                            >
                                <img src="assets/images/${employee.nickname}.png" alt="${employee.name}">
                            </div>`;
    }
    $(".circle").html(employee_icon);
}



function openGreetingModal(){
    let greetings_modal = $("#greetings_modal");
    let data_details = $(this);

    background_music.pause();

    greetings_modal.modal("show");
    greetings_modal.find("#play_again_btn").attr("disabled",true);
    

    greetings_modal.find("#name").text(data_details.attr("data-name"));
    greetings_modal.find("#video_greetings").attr("src", data_details.attr("data-video_greeting_link"));
    greetings_modal.find("#video_greeting_text").text(data_details.attr("data-video_greeting_text"));
    video_greeting_text

  
    let play_vid = video_greetings.play();

    play_vid.then(function() {
        // Automatic playback started!
        
      }).catch(function(error) {
        // Automatic playback failed.
        // Show a UI element to let the user manually start playback.
      });
    qrcode = new QRCode("qrcode", {
        text: data_details.attr("data-gcash_number"),
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
   
}

function closeGreetingModal(){
    video_greetings.pause();
    // background_music.play();
    video_greetings.currentTime = 0;
    $("#qrcode").html("");
    qrcode.clear();

    $("#pause_btn").attr("data-is_playing", 1).text("Pause");
}

function playAgainVideoGreetings(){
    video_greetings.play();
}

function endGreetingAction(){
    $("#greetings_modal").find("#play_again_btn").attr("disabled",false);
}