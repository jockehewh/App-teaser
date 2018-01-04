//ROUVRIR LA DB
//FERMER LA DB

$(document).ready(function(){
    let fileBtn = $('#sendFiles');
    let dataConnect = $('#data_connect');
    let disconnect = $('.disconnect');
    let distantIdText = $('#distant_id');
    let vStarter = $('#vStarter');
    peer = window.peer;
//////////////////****************ESTABLISH CONNECTION****************////////////////////
    dataConnect.click(function(){
        distantIdText = distantIdText.val();
        let conn = peer.connect(distantIdText);
        //AJOUTER DATAS
        conn.on('open', function(){
            $('.peer_selector').hide();
            $('.files_element').show();
            $('#vStarter').show();
            $('#send').click(function(){
                let message = $('#text').val();
                conn.send(message);
                var li = document.createElement('li');
                li.classList.add('you');
                li.innerHTML = `<p>you: ${message}</p>`
                $('#messages').append(li);
            })
            fileBtn.change(function(){
                console.log(this.files[0])
                $('.files_element').append(`<p>${this.files[0].name}, size: ${this.files[0].size/1000} Ko</p>`)
                conn.send(this.files[0])
                conn.send(this.files[0].name)
            })
        })
        vStarter.click(function(){
            $('.video_module').show();
            vStarter.hide();
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            navigator.getUserMedia({audio: true, video: true}, function(stream){
                let video = document.createElement('video');
                video.src = URL.createObjectURL(stream);
                video.classList.add('my_video');
                window.localStream = stream;
                let videoCall = peer.call(distantIdText, window.localStream);
                $('.video').append(video)
            }, function(err){
                console.log(err)
                })
            })
    })
    
    
    disconnect.click(function(){
        peer.disconnect();
        $('.peer_selector').show();
        $('.files_element').hide();
        $('.video_module').hide();
    });
})//DOM READY

setTimeout(function(){
    peer.on('connection', function(conn){
        let distantPeer = conn.peer;
        let imgControler = new RegExp (/(\.jpeg|\.jpg|\.png|\.gif|\.bmp)/)
        conn.on('data', function(data){
            if (data.constructor === ArrayBuffer){
                var bloeb = new Blob([data]);
                var dataUrl = URL.createObjectURL(bloeb)
                let img = document.createElement('img');
                img.src = dataUrl;
                $('.files_element').append(img)
                setTimeout(function(){
                    var a = document.createElement('a');
                    a.href = dataUrl;
                    a.download = window.fileName;
                    a.innerText = window.fileName;
                    $('.files_element').append(a);
                }, 2000)
            }
            if(typeof data === "string"){
                if(imgControler.test(data)){
                    window.fileName = data;
                }else{
                    var li = document.createElement('li');
                    li.classList.add('theirs');
                    li.innerHTML = `<p>they: ${data}</p>`
                    $('#messages').append(li);
                }
            }
        })
    });
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
    },1500);
