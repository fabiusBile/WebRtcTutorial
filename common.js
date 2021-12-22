const tokenOutputs = document.querySelectorAll(".token-output");
const tokenUploads = document.querySelectorAll(".token-upload");
let connection; 

const wsProtocol= window.location.protocol === 'https:' ? 'wss' : 'ws';
const centrifuge = new Centrifuge(`${wsProtocol}://test-centrifugo-fab.herokuapp.com/connection/websocket`);

tokenOutputs.forEach((t) => {
    t.addEventListener("click", () => {
        t.select();
        document.execCommand("copy");
    })
})

tokenUploads.forEach((t) => {
    t.addEventListener('change', () => {
        var fr = new FileReader();
        fr.onload = function () {
            const input = document.getElementById(t.dataset.inputId);
            const button = document.getElementById(t.dataset.buttonId);
            const text = fr.result;
            input.value = text;
            if (button != null){
                toggleInputIfEventNotNull(text, button);
            }
        }

        fr.readAsText(t.files[0]);
    });
});

function connectCentrifugo(onConnect){
    centrifuge.connect();
    centrifuge.on('connect', onConnect);
}

function objectToB64(obj) {
    const string = JSON.stringify(obj);
    return string;
}

function b64ToObject(b64) {
    const string = b64;
    return JSON.parse(string);
}

function createConnection(onIceCandidate) {
    if (typeof(connection) !== 'undefined'){
        return connection;
    }

    var configuration = {
        "iceServers": servers.map(s => ({'urls': [s]}))
    };
    connection = new RTCPeerConnection(configuration);
    console.log(connection);
    connection.onicecandidateerror = (event) => {
        console.error(event);
    }
    connection.onicecandidate = (event) => {
        console.log("on ice candidate")
        console.log(event);
        onIceCandidate(event);
    }
    connection.onicegatheringstatechange = (event) => {
        console.log("ice candidate", event);
        console.log("ice state", connection.iceConnectionState)
    }
    connection.ondatachannel = handledatachannel;
    connection.onconnectionstatechange = handleconnectionstatechange;
    connection.oniceconnectionstatechange = handleiceconnectionstatechange;

    return connection;
}

function handleconnectionstatechange(event) {
    console.log('handleconnectionstatechange');
    console.log(event);
}

function handleiceconnectionstatechange(event) {
    console.log('ice connection state: ' + event.target.iceConnectionState);
}

function handledatachannel(event) {
    console.log('handledatachannel');
    dataChannel = event.channel;
    dataChannel.onerror = function (error) {
        console.error("Error:", error);
    };

    dataChannel.onmessage = function (event) {
        console.log("Got message:", event.data);
    };
}

function toggleInputIfEventNotNull(value, field) {
    if (value) {
        field.disabled = false;
    } else {
        field.disabled = true;
    }
}

function bindTextAreaToButton(textArea, button) {
    textArea.addEventListener("change", (event) => toggleInputIfEventNotNull(event.target.value, button));
    textArea.addEventListener("keyup", (event) => toggleInputIfEventNotNull(event.target.value, button));
}

function makeDownloadLink(element, filename, body) {
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(body));
    element.setAttribute('download', `${new Date().toLocaleString()} ${filename}`);
}
stun:
conststun: servers = [
    "stun:stun1.l.google.com:19302",
    "stun:stun2.l.google.com:19302",
    "stun:stun3.l.google.com:19302",
    "stun:stun4.l.google.com:19302",
]