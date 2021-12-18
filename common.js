const serverUrl = "stun:stun.l.google.com:19302";
const tokenOutputs = document.querySelectorAll(".token-output");

tokenOutputs.forEach((t) => {
    t.addEventListener("click", () => {
        t.select();
        document.execCommand("copy");
    })
})


function objectToB64(obj){
    const string = JSON.stringify(obj);
    return btoa(string);
}

function b64ToObject(b64){
    const string = atob(b64);
    return JSON.parse(string);
}

function createConnection(onIceCandidate) {
    var configuration = {
        "iceServers": [{
            urls: [serverUrl]
        }]
    };
    const connection = new RTCPeerConnection(configuration);
    console.log(connection);
    connection.onicecandidateerror = (event) => {
        console.error(event);
    }
    connection.onicecandidate = (event) => {
        console.log("on ice candidate")
        console.log(event);
        onIceCandidate(event);
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

function toggleInputIfEventNotNull(event, field){
    if (event.target.value){
        field.disabled = false;
    } else {
        field.disabled = true;
    }
}

function bindTextAreaToButton(textArea, button){
    textArea.addEventListener("change", (event) => toggleInputIfEventNotNull(event, button));
    textArea.addEventListener("keyup", (event) => toggleInputIfEventNotNull(event, button));
}