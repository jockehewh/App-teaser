
$(document).ready(function(){
    let dataConnect = $('.messagerie_ws_module #data_connect');
    let disconnect = $('.messagerie_ws_module #disconnect_btn');
    let distantIdText = $('.messagerie_ws_module #distant_id');
    peer = window.peer;
//////////////////****************ESTABLISH CONNECTION****************////////////////////
    dataConnect.click(function(){
        distantIdText = distantIdText.val();
        let conn = peer.connect(distantIdText);
        conn.on('open', function(){
            $('.messagerie_ws_module .peer_selector').hide();
            $('.messagerie_ws_module .messagerie_text').show();
            $('.messagerie_ws_module #send').click(function(){
                let message = $('.messagerie_ws_module #text').val();
                conn.send(message);
                var li = document.createElement('li');
                li.classList.add('you');
                li.innerHTML = `<p>you: ${message}</p>`
                $('.messagerie_ws_module #messages').append(li);
            })
        })
    })

    disconnect.click(function(){
        peer.disconnect();
        $('.messagerie_ws_module .peer_selector').show();
        $('.messagerie_ws_module .messagerie_text').hide();
    });
})
setTimeout(function(){
peer.on('connection', function(conn){
    let distantPeer = conn.peer;
    conn.on('data', function(data){
        var li = document.createElement('li');
                li.classList.add('theirs');
                li.innerHTML = `<p>they: ${data}</p>`
                $('.messagerie_ws_module #messages').append(li);
    })
})
},1500);