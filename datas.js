

$(document).ready(function(){
    let fileBtn = $('#sendFiles');
    let dataConnect = $('.datas_module #data_connect');
    let disconnect = $('.datas_module #disconnect');
    let distantIdText = $('.datas_module #distant_id');
    peer = window.peer;
//////////////////****************ESTABLISH CONNECTION****************////////////////////
    dataConnect.click(function(){
        distantIdText = distantIdText.val();
        let conn = peer.connect(distantIdText);
        conn.on('open', function(){
            $('.datas_module .peer_selector').hide();
            $('.datas_module .files_element').show();
            fileBtn.change(function(){
                console.log(this.files[0])
                $('.datas_module .files_element').append(`<p>${this.files[0].name}, size: ${this.files[0].size/1000} Ko</p>`)
                conn.send(this.files[0])
                conn.send(this.files[0].name)
            })
        })
    })


    if (data.constructor === ArrayBuffer){
        var bloeb = new Blob([data]);
        var dataUrl = URL.createObjectURL(bloeb)
        let img = document.createElement('img');
        img.src = dataUrl;
        $('.datas_module .files_element').append(img)
        setTimeout(function(){
            var a = document.createElement('a');
            a.href = dataUrl;
            a.download = window.fileName;
            a.innerText = window.fileName;
            $('.datas_module .files_element').append(a);
        }, 2000)
    }else if(typeof data === "string"){
        if(imgControler.test(data)){
            window.fileName = data;
        }else{
            var li = document.createElement('li');
            li.classList.add('theirs');
            li.innerHTML = `<p>they: ${data}</p>`
            $('#messages').append(li);
        }
    } 


    disconnect.click(function(){
        peer.disconnect();
        $('.datas_module .peer_selector').show();
        $('.datas_module .files_element').hide();
    });
})

//////////////////****************RECOI****************////////////////////
setTimeout(function(){
peer.on('connection', function(conn){
    conn.on('data', function(data){
        console.log(data);
        if (data.constructor === ArrayBuffer){
            var bloeb = new Blob([data]);
            var dataUrl = URL.createObjectURL(bloeb)
            let img = document.createElement('img');
            img.src = dataUrl;
            $('.datas_module .files_element').append(img)
            setTimeout(function(){
                var a = document.createElement('a');
                a.href = dataUrl;
                a.download = window.fileName;
                a.innerText = window.fileName;
                $('.datas_module .files_element').append(a);
            }, 2000)
        }else if(typeof data === "string"){
            window.fileName = data;
        }
    })
});
},1500);