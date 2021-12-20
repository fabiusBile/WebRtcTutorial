const tokenOutputs = document.querySelectorAll(".token-output");
const tokenUploads = document.querySelectorAll(".token-upload");
let connection; 

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

function objectToB64(obj) {
    const string = JSON.stringify(obj);
    return btoa(string);
}

function b64ToObject(b64) {
    const string = atob(b64);
    return JSON.parse(string);
}

function createConnection(onIceCandidate) {
    if (typeof(connection) !== 'undefined'){
        return connection;
    }

    var configuration = {
        "iceServers": [{
            urls: servers
        }]
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
    "stun:numb.viagenie.ca:3478",
    "stun:iphone-stun.strato-iphone.de:3478",
    "stun:stun.12connect.com:3478",
    "stun:stun.12voip.com:3478",
    "stun:stun.1und1.de:3478",
    "stun:stun.3cx.com:3478",
    "stun:stun.acrobits.cz:3478",
    "stun:stun.actionvoip.com:3478",
    "stun:stun.advfn.com:3478",
    "stun:stun.altar.com.pl:3478",
    "stun:stun.antisip.com:3478",
    "stun:stun.avigora.fr:3478",
    "stun:stun.bluesip.net:3478",
    "stun:stun.cablenet-as.net:3478",
    "stun:stun.callromania.ro:3478",
    "stun:stun.callwithus.com:3478",
    "stun:stun.cheapvoip.com:3478",
    "stun:stun.cloopen.com:3478",
    "stun:stun.commpeak.com:3478",
    "stun:stun.cope.es:3478",
    "stun:stun.counterpath.com:3478",
    "stun:stun.counterpath.net:3478",
    "stun:stun.dcalling.de:3478",
    "stun:stun.demos.ru:3478",
    "stun:stun.dus.net:3478",
    "stun:stun.easycall.pl:3478",
    "stun:stun.easyvoip.com:3478",
    "stun:stun.ekiga.net:3478",
    "stun:stun.epygi.com:3478",
    "stun:stun.etoilediese.fr:3478",
    "stun:stun.faktortel.com.au:3478",
    "stun:stun.freecall.com:3478",
    "stun:stun.freeswitch.org:3478",
    "stun:stun.freevoipdeal.com:3478",
    "stun:stun.gmx.de:3478",
    "stun:stun.gmx.net:3478",
    "stun:stun.halonet.pl:3478",
    "stun:stun.hoiio.com:3478",
    "stun:stun.hosteurope.de:3478",
    "stun:stun.infra.net:3478",
    "stun:stun.internetcalls.com:3478",
    "stun:stun.intervoip.com:3478",
    "stun:stun.ipfire.org:3478",
    "stun:stun.ippi.fr:3478",
    "stun:stun.ipshka.com:3478",
    "stun:stun.it1.hr:3478",
    "stun:stun.ivao.aero:3478",
    "stun:stun.jumblo.com:3478",
    "stun:stun.justvoip.com:3478",
    "stun:stun.l.google.com:19302",
    "stun:stun.linphone.org:3478",
    "stun:stun.liveo.fr:3478",
    "stun:stun.lowratevoip.com:3478",
    "stun:stun.lundimatin.fr:3478",
    "stun:stun.mit.de:3478",
    "stun:stun.miwifi.com:3478",
    "stun:stun.modulus.gr:3478",
    "stun:stun.myvoiptraffic.com:3478",
    "stun:stun.netappel.com:3478",
    "stun:stun.netgsm.com.tr:3478",
    "stun:stun.nfon.net:3478",
    "stun:stun.nonoh.net:3478",
    "stun:stun.nottingham.ac.uk:3478",
    "stun:stun.ooma.com:3478",
    "stun:stun.ozekiphone.com:3478",
    "stun:stun.pjsip.org:3478",
    "stun:stun.poivy.com:3478",
    "stun:stun.powervoip.com:3478",
    "stun:stun.ppdi.com:3478",
    "stun:stun.qq.com:3478",
    "stun:stun.rackco.com:3478",
    "stun:stun.rockenstein.de:3478",
    "stun:stun.rolmail.net:3478",
    "stun:stun.rynga.com:3478",
    "stun:stun.schlund.de:3478",
    "stun:stun.sigmavoip.com:3478",
    "stun:stun.sip.us:3478",
    "stun:stun.sipdiscount.com:3478",
    "stun:stun.sipgate.net:10000",
    "stun:stun.sipgate.net:3478",
    "stun:stun.siplogin.de:3478",
    "stun:stun.sipnet.net:3478",
    "stun:stun.sipnet.ru:3478",
    "stun:stun.sippeer.dk:3478",
    "stun:stun.siptraffic.com:3478",
    "stun:stun.sma.de:3478",
    "stun:stun.smartvoip.com:3478",
    "stun:stun.smsdiscount.com:3478",
    "stun:stun.solcon.nl:3478",
    "stun:stun.solnet.ch:3478",
    "stun:stun.sonetel.com:3478",
    "stun:stun.sonetel.net:3478",
    "stun:stun.sovtest.ru:3478",
    "stun:stun.srce.hr:3478",
    "stun:stun.stunprotocol.org:3478",
    "stun:stun.t-online.de:3478",
    "stun:stun.tel.lu:3478",
    "stun:stun.telbo.com:3478",
    "stun:stun.tng.de:3478",
    "stun:stun.twt.it:3478",
    "stun:stun.uls.co.za:3478",
    "stun:stun.unseen.is:3478",
    "stun:stun.usfamily.net:3478",
    "stun:stun.viva.gr:3478",
    "stun:stun.vivox.com:3478",
    "stun:stun.vo.lu:3478",
    "stun:stun.voicetrading.com:3478",
    "stun:stun.voip.aebc.com:3478",
    "stun:stun.voip.blackberry.com:3478",
    "stun:stun.voip.eutelia.it:3478",
    "stun:stun.voipblast.com:3478",
    "stun:stun.voipbuster.com:3478",
    "stun:stun.voipbusterpro.com:3478",
    "stun:stun.voipcheap.co.uk:3478",
    "stun:stun.voipcheap.com:3478",
    "stun:stun.voipgain.com:3478",
    "stun:stun.voipgate.com:3478",
    "stun:stun.voipinfocenter.com:3478",
    "stun:stun.voipplanet.nl:3478",
    "stun:stun.voippro.com:3478",
    "stun:stun.voipraider.com:3478",
    "stun:stun.voipstunt.com:3478",
    "stun:stun.voipwise.com:3478",
    "stun:stun.voipzoom.com:3478",
    "stun:stun.voys.nl:3478",
    "stun:stun.voztele.com:3478",
    "stun:stun.webcalldirect.com:3478",
    "stun:stun.wifirst.net:3478",
    "stun:stun.xtratelecom.es:3478",
    "stun:stun.zadarma.com:3478",
    "stun:stun1.faktortel.com.au:3478",
    "stun:stun1.l.google.com:19302",
    "stun:stun2.l.google.com:19302",
    "stun:stun3.l.google.com:19302",
    "stun:stun4.l.google.com:19302",
    "stun:stun.nextcloud.com:443",
    "stun:relay.webwormhole.io:3478"
]