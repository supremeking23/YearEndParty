import employee_data from "./data.js";
let video_greetings = document.getElementById("video_greetings");
let background_music = document.getElementById("background_music");
// let qrcode;
$(document).ready(function(){

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
            .on("click", "#stop_video_btn", function(){
                let play_button = $("#play_video_btn");

                video_greetings.currentTime = 0;
                video_greetings.pause();
                play_button.find(".fa").removeClass("fa-pause").addClass("fa-play");
                
            })

            .on("hidden.bs.modal", "#greetings_modal" , closeGreetingModal)
            .on("click", "#play_video_btn", playVideoGreetings)
            .on("click", "#play_automatic", autoPlayBackgroundMusic)
            .on("change", "#progress_bar", setVideoProgress)
            

    video_greetings.onended = endGreetingAction;
    video_greetings.ontimeupdate = updateVideoProgressBar;
    background_music.onended = rewindBackgroundMusic;
    loadData();

    $("#play_automatic").trigger("click");

});

function autoPlayBackgroundMusic(){
    background_music.play();
}

function loadData(){

    let employee_icon = ``;
    for(let employee of employee_data){
        employee_icon += `<div 
                            class="icon open_greetings_modal" 
                            data-name="${employee.name}"
                            data-position="${employee.position}"
                            data-video_greeting_link="${employee.video_greeting_link}"
                            data-gcash_number="${employee.gcash_number}"
                            data-gcash_qr_img="${employee.gcashqr_img}"
                            >
                                <img src="${employee.img_url}" alt="${employee.name}">
                            </div>`;
    }
    $(".circle").html(employee_icon);
}


function openGreetingModal(){
    let greetings_modal = $("#greetings_modal");
    let data_details = $(this);
    let progress_bar = $("#progress_bar");

   

    background_music.pause();
    greetings_modal.modal("show");

    greetings_modal.find("#name").text(data_details.attr("data-name"));
    greetings_modal.find("#video_greetings").attr("src", data_details.attr("data-video_greeting_link"));
    greetings_modal.find("#gcash_qr_img").attr("src", data_details.attr("data-gcash_qr_img"));
    greetings_modal.find("#gcash_qr_img").attr("alt", data_details.attr("data-gcash_number"));
    greetings_modal.find("#gcash_qr_img").attr("title", data_details.attr("data-gcash_number"));
    // greetings_modal.find("#video_greeting_text").text(data_details.attr("data-video_greeting_text"));

    // qrcode = new QRCode("qrcode", {
    //     text: data_details.attr("data-gcash_number"),
    //     width: 128,
    //     height: 128,
    //     colorDark : "#000000",
    //     colorLight : "#ffffff",
    //     correctLevel : QRCode.CorrectLevel.H
    // });

   setTimeout(function(){
       /* set progress bar to 0 */
       progress_bar.val(0);
   },200);
}

function closeGreetingModal(){
    video_greetings.pause();
    let play_button = $("#play_video_btn");
    background_music.play();
    background_music.muted = false;
    video_greetings.currentTime = 0;
    // $("#qrcode").html("");
    // qrcode.clear();

    play_button.find(".fa").removeClass("fa-pause").addClass("fa-play");
}

function playVideoGreetings(){
    let play_button = $("#play_video_btn");

    if(video_greetings.paused){
        video_greetings.play();
        play_button.find(".fa").removeClass("fa-play").addClass("fa-pause");
    }
    else{
        video_greetings.pause();
        play_button.find(".fa").removeClass("fa-pause").addClass("fa-play");
    }
    
}

function endGreetingAction(){
    let play_button = $("#play_video_btn");

    play_button.find(".fa").removeClass("fa-pause").addClass("fa-play");
}


function rewindBackgroundMusic(){
    background_music.currentTime = 0;
    background_music.play();
}

function updateVideoProgressBar(){
    let progress_bar = $("#progress_bar");

    progress_bar.val((video_greetings.currentTime / video_greetings.duration) * 100);

    //get minutes
    let mins = Math.floor(video_greetings.currentTime / 60);
    if(mins < 10){
        mins = "0" + String(mins);
    }
  
  
    //get seconds
    let secs = Math.floor(video_greetings.currentTime % 60);
    if(secs < 10){
        secs = "0" + String(secs);
    }
  
    $("#timestamp").html(`${mins}:${secs}`);
}


function setVideoProgress(){
    let progress_bar = $("#progress_bar");
    video_greetings.currentTime = (+progress_bar.val() * video_greetings.duration) / 100;
}