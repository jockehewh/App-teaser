$(document).ready(function(){
    $('.selectors ul').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        console.log(e.srcElement.getAttribute("class"));
        var addIt = e.srcElement.getAttribute("class");
        switch(addIt){
            case "videoBtn":
            addIn("Webrtc")
            builder('.webrtc_module')
            break;
            case "minigameBtn":
            addIn("Minigame")
            builder('.mg_module')
            break;
            case "todoBtn":
            addIn("Todo")
            builder('.todo_module')
            break;
            case "morePages":
                addPage('.one_page');
            break;
            case "downloadBtn":
                wsCreate()
            break;
        }
    })
})
var pageCounter = 1;
function addPage(a){
    if(document.querySelectorAll(a) !== null){
        document.querySelectorAll(a).forEach((element) => {
            if(element.classList.contains(pageCounter.toString()) &&  0 < pageCounter <= document.querySelectorAll(a).length){
                element.remove();
            }
        })
    }else{
        var pageName = prompt('Please enter page name: ', '')
        var item = document.createElement('li');
        item.innerText = pageName;
        item.classList.add(a, pageCounter.toString());
        document.querySelector('nav ul').appendChild(item);
        item.setAttribute('data-module', a);
    }/**88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888 */
}
function addIn(a){
    if(document.querySelector('.'+a) !== null){
        document.querySelector('nav ul .'+a).remove();
    }else{
    var item = document.createElement('li');
    item.innerText = a;
    item.classList.add(a);
    document.querySelector('nav ul').appendChild(item);
    item.setAttribute('data-module', a);
    }
}
function builder(item){
    var extant = document.querySelector(`.is_main ${item}`);
    if(extant !== null){
        document.querySelector(`.is_main ${item}`).remove();
    }else{
        var copied = document.querySelector(item).cloneNode(true)
        document.querySelector('.is_main').appendChild(copied);
    }
}
function wsCreate(){
let main = document.querySelector('.is_main').innerHTML
    let owner = prompt('what is your name?', '')
    let finale = new WebSocket(`wss://js.perspective3d.online/ws`)
    finale.onopen = function () {
        finale.send(main)
    }
    finale.onmessage = function (data) {
    console.log(data)
    console.log(data.data)
        if (data.data) {
            let fileBlob = new Blob([data.data], {type: 'application/*'})
            let fileUrl = window.URL.createObjectURL(fileBlob)
            let a = document.createElement('a')
            document.body.appendChild(a)
            a.style.display = 'none'
            a.href = fileUrl
            a.download = owner + '.zip'
            a.click()
            window.URL.revokeObjectURL(fileUrl)
        }
    }
}