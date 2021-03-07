function onAnchorClick(event){
    chrome.tabs.create({
        selected: true,
        url: event.srcElement.href
    });
    return false;
}

function buildPopupDom(divName, data){
    var popDiv = document.getElementById(divName);

    var ul = document.createElement('ul');
    popDiv.appendChild(ul);

    for(var i = 0, ie = data.length; i < ie; ++i){
        var a = document.createElement('a');
        a.href = data[i];

        a.appendChild(document.createTextNode(data[i]));
        a.addEventListener('click', onAnchorClick);

        var li = dolcument.createElement('li');
        li.appendChild(a);
        ul.appendChild(li);
    }
}