const leftVideo = document.querySelector("#leftVideo")

const createOfferBtn = document.querySelector("#createOffer");
const offerText = document.querySelector("#offer");

const answerInput = document.querySelector("#answerInput");
const startBroadcast = document.querySelector("#handleAnswer");
const offerBlock = document.querySelector("#offerBlock");
const downloadOffer = document.querySelector("#downloadOffer");

bindTextAreaToButton(answerInput, startBroadcast);

let stream;

leftVideo.oncanplay = maybeCreateStream;
if (leftVideo.readyState >= 3) { // HAVE_FUTURE_DATA
    maybeCreateStream();
}

function maybeCreateStream () {
    if (stream) {
        return;
    }
    if (leftVideo.captureStream) {
        stream = leftVideo.captureStream();
        console.log('Captured stream from leftVideo with captureStream',
            stream);
    } else if (leftVideo.mozCaptureStream) {
        stream = leftVideo.mozCaptureStream();
        console.log('Captured stream from leftVideo with mozCaptureStream()',
            stream);
    } else {
        console.log('captureStream() not supported');
    }
}

createDataChannel = (connection) => {
    dataChannel = connection.createDataChannel("chat");

    dataChannel.onerror = function (error) {
        console.log("Error:", error);
    };

    dataChannel.onmessage = function (event) {
        console.log("Got message:", event.data);
    };
}

createOfferBtn.addEventListener("click", () => {
    createConnection(() => {
        const offer = connection.localDescription;
        console.log(offer);
        const offerString = objectToB64(offer);
        offerText.innerText = offerString;
        makeDownloadLink(downloadOffer, "offer", offerString);
        offerBlock.classList.remove("hidden");
    });

    createDataChannel(connection);

    const offerOptions = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
    };

    try{
    stream.getTracks().forEach(track => connection.addTrack(track, stream));
    } catch(e){}
    
    connection.createOffer(offerOptions).then(
        (offer) => {
            connection.setLocalDescription(offer);
            console.log(offer);
        },
        (error) => {
            console.error(error);
        });
});

startBroadcast.addEventListener("click", () => {
    const answerString = answerInput.value;
    if (answerString == null) {
        alert("Input answer!");
        return;
    }
    const answer = b64ToObject(answerString);
    connection.setRemoteDescription(new RTCSessionDescription(answer)).then(
        (e) => {
            console.log("connection succeeded!")
            leftVideo.play();
            console.log(e)
        }, (error) => {
            console.error(error);
        });
});