$(document).ready(function(){
    peer = window.peer;
    $('nav ul li').click(function(e){
        let elClicked = e.target.getAttribute("data-module-name")
        switch(elClicked){
            case "messagerie":
                $('.body_ul li').hide()
                $('.body_ul li[data-module-name=messagerie]').show()
                break;
            case "rtcmodule":
                $('.body_ul li').hide()
                $('.body_ul li[data-module-name=rtcmodule]').show()
            break;
            case "datas":
                $('.body_ul li').hide()
                $('.body_ul li[data-module-name=datas]').show()                
            break;
        }
    })
    setTimeout(function(){
    peer.on('open', function(){
        console.log(peer.id)
    })
},1500);
})