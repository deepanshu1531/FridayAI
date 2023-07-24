export default class AIVoice {

    aiSpeak = (solution) => {
        if (sessionStorage.getItem("isSpeaking")===null || sessionStorage.getItem("isSpeaking")==="true") {
            console.log("AI speaking.")
            const synth = window.speechSynthesis;
            const voices = synth.getVoices();

            // To print voice list. 
            // for (let i = 0; i < voices.length; i++) {
            //     console.log(i + " " + voices[i].name)
            // }

            let msg = new SpeechSynthesisUtterance(solution);
            msg.voice = voices[12];
            synth.speak(msg);
        }
    }

}