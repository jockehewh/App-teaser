let name = prompt('Please enter your user name', "");
const peerconf = {
    debug: 3,
    config: {"iceServers":
    [
        {url: `stun:${name}@js.perspective3d.online:3478?transport=udp`, credential: name}]},
    host: "js.perspective3d.online",
    port:3478
}
//////////////////****************DATA CONNECTION****************////////////////////
    
let peer = new Peer(name, peerconf);
    peer.on('open', function(){
        $('.status').css("background-color", "green");
    })
//////////////////****************DATA CONNECTION DONE****************////////////////////

function doNothing(e){
    e.preventDefault();
    e.stopPropagation();
}
//////////////////****************VIDEO CALL****************////////////////////
$(document).ready(function(){
    let dataConnect = $('#data_connect');
    let disconnect = $('#disconnect_btn');
    let distantIdText = $('#distant_id');

//////////////////****************ESTABLISH CONNECTION****************////////////////////
    dataConnect.click(function(){
        distantIdText = distantIdText.val();
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            navigator.getUserMedia({audio: true, video: true}, function(stream){
                let video = document.createElement('video');
                video.src = URL.createObjectURL(stream);
                video.classList.add('my_video');
                window.localStream = stream
                let videoCall = peer.call(distantIdText, window.localStream);
                $('.video').append(video)
            }, function(err){
                console.log(err)
        })
            $('.peer_selector').hide();
            $('.video').show();
    })

    disconnect.click(function(){
        peer.disconnect();
        $('.peer_selector').show();
        $('.video').hide();
        $('.files_element').hide();
        $('.messagerie_text').hide();
    });
})

peer.on('call', function(conn){
    if(confirm("accept incomming call?")){
        conn.answer(window.localStream);
        conn.on('stream', function(stream){
            let video = document.createElement('video');
            let streamUrl = URL.createObjectURL(stream);
            video.src = streamUrl;
            video.classList.add('their_video')
            $('.video').append(video);
            })
    }
})
//////////////////****************reception fichier****************////////////////////
peer.on('connection', function(conn){
    let distantPeer = conn.peer;
    conn.on('data', function(data){
        if(typeof data === "string"){
        var li = document.createElement('li');
                li.classList.add('theirs');
                li.innerHTML = `<p>they: ${data}</p>`
                $('#messages').append(li);
            }else if(data.constructor === ArrayBuffer){
                var bloeb = new Blob([data]);
            var dataUrl = URL.createObjectURL(bloeb)
            let img = document.createElement('img');
            img.src = dataUrl;
            $('.files_element').append(img)
            var a = document.createElement('a');
                a.href = dataUrl;
                a.download = window.fileName;
                a.innerText = window.fileName;
                $('.files_element').append(a);
        if(typeof data === "string"){
            window.fileName = data;
        }
            }
    })
})