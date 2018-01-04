$(document).ready(function(){
    let dataConnect = $('.rtc_module #data_connect');
    let disconnect = $('.rtc_module #disconnect_btn');
    let distantIdText = $('.rtc_module #distant_id');
    peer = window.peer;
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
                $('.rtc_module .video').append(video)
            }, function(err){
                console.log(err)
        })
            $('.rtc_module .peer_selector').hide();
            $('.rtc_module .video').show();
    })

    disconnect.click(function(){
        peer.disconnect();
        $('.rtc_module .peer_selector').show();
        $('.rtc_module .video').hide();
    });
})
setTimeout(function(){
peer.on('call', function(conn){
    if(confirm("accept incomming call?")){
        conn.answer(window.localStream);
        conn.on('stream', function(stream){
            let video = document.createElement('video');
            let streamUrl = URL.createObjectURL(stream);
            video.src = streamUrl;
            video.classList.add('their_video')
            $('.rtc_module .video').append(video);
            })
    }
})
},1500)