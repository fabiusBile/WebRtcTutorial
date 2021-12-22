const leftVideo = document.querySelector("#leftVideo")

const startBroadcast = document.querySelector("#startBroadcast");
let stream;
const roomId = uuidv4();
document.querySelector("#roomId").innerText = roomId;

leftVideo.oncanplay = maybeCreateStream;
if (leftVideo.readyState >= 3) {
    maybeCreateStream();
}

connectCentrifugo(() => {
    centrifuge.s
    centrifuge.subscribe(`channel-host-${roomId}`, function (message) {
        console.log(message);
        handleAnswer(message.data);
    })
});

function maybeCreateStream() {
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

startBroadcast.addEventListener("click", () => {
    createConnection(() => {
        const offer = connection.localDescription;
        centrifuge.publish(`channel-client-${roomId}`, offer).then(function (res) {
            console.log('successfully published');
        }, function (err) {
            console.log('publish error', err);
        });
    });

    createDataChannel(connection);

    const offerOptions = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
    };

    try {
        stream.getTracks().forEach(track => connection.addTrack(track, stream));
    } catch (e) {
        console.error(e);
    }

    connection.createOffer(offerOptions).then(
        (offer) => {
            connection.setLocalDescription(offer);
            console.log(offer);
        },
        (error) => {
            console.error(error);
        });
});

function handleAnswer(answer) {
    connection.setRemoteDescription(new RTCSessionDescription(answer)).then(
        (e) => {
            console.log("connection succeeded!");
            leftVideo.play();
        }, (error) => {
            console.error(error);
        });
}

function uuidv4() {
    return crypto.randomUUID ? crypto.randomUUID() : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}