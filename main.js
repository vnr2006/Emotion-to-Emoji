prediction1= "";
prediction2= "";
Webcam.set({
    width: 300, height: 300, image_format: 'png', png_quality: 90
});
camera= document.getElementById("camera");
console.log(camera);
Webcam.attach(camera);
function capture_image() {
    Webcam.snap(function(data_URI){
        document.getElementById("result").innerHTML= "<img style='height:250px; width:300px' id='final_image' src="+data_URI+">";
    })
}
console.log("ml5version", ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/bk_vIumXW/model.json',modelloaded);
function modelloaded(){
    console.log("Model is loaded.");
}
function predict_emotion() {
    img= document.getElementById("final_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,result) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(result)
        document.getElementById("result_emotion_name").innerHTML= result[0].label;
        document.getElementById("result_emotion_name2").innerHTML= result[1].label;
        prediction1= result[0].label;
        prediction2= result[1].label;
        speak();
        if (result[0].label=="Happy") {
            document.getElementById("update_emoji").innerHTML="&#128512;";
        }
        if (result[0].label=="Sad") {
            document.getElementById("update_emoji").innerHTML="&#128542;";
        }
        if (result[0].label=="Angry") {
            document.getElementById("update_emoji").innerHTML="&#128545;";
        }
        if (result[1].label=="Happy") {
            document.getElementById("update_emoji2").innerHTML="&#128512;";
        }
        if (result[1].label=="Sad") {
            document.getElementById("update_emoji2").innerHTML="&#128542;";
        }
        if (result[1].label=="Angry") {
            document.getElementById("update_emoji2").innerHTML="&#128545;";
        }
    };
    
}
function speak() {
   var synth=window.speechSynthesis;
   speak_data1= "The first prediction is"+prediction1
   speak_data2= "The second prediction is"+prediction2
   utterthis= new SpeechSynthesisUtterance(speak_data1+speak_data2);
   synth.speak(utterthis);
}
