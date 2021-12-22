const rightVideo = document.querySelector("#rightVideo")
let dataChannel;

const enterRoomBtn = document.querySelector("#connectToRoom");
const roomIdField = document.querySelector("#roomId");
let roomId;

connectCentrifugo(() => {});

enterRoomBtn.addEventListener("click", () => {
    roomId = roomIdField.value.trim();
    centrifuge.subscribe(`channel-client-${roomId}`, function(message) {
        connect(message.data);
    })
});

function connect(offer){
    let connection = createConnection(() => {
        const answer = connection.localDescription;

        centrifuge.publish(`channel-host-${roomId}`, answer).then(function(res) {
            console.log('successfully published');
        }, function(err) {
            console.log('publish error', err);
        });
    });

    connection.ontrack = (event) =>{
        if (rightVideo.srcObject !== event.streams[0]) {
            rightVideo.srcObject = event.streams[0];
            rightVideo.classList.remove("hidden");
            console.log('connection received remote stream', event);
          }
    }

    connection.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
        connection.createAnswer().then(
            (answer) => {
                connection.setLocalDescription(answer);
            },
            (error) => {
                console.error(error);
            })
    });
}