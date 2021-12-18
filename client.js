const rightVideo = document.querySelector("#rightVideo")
const offerInput = document.querySelector("#offerInput");

const createAnswerBtn = document.querySelector("#createAnswer");
const answerText = document.querySelector("#answer");
const answerBlock = document.querySelector("#answerBlock");

let dataChannel;

bindTextAreaToButton(offerInput, createAnswerBtn);

createAnswerBtn.addEventListener("click", () => {

    const offerString = offerInput.value;
    if (offerString == null) {
        alert("Input offer!");
        return;
    }
    const offer =  b64ToObject(offerInput.value);

    connection = createConnection(() => {
        const answer = connection.localDescription;
        console.log(answer);
        answerText.innerText = objectToB64(answer);
        answerBlock.classList.remove("hidden");
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
                console.log(answer);
            },
            (error) => {
                console.error(error);
            })
    });
});