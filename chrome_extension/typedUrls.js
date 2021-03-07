function onAnchorClick(event){
    chrome.tabs.create({
        selected: true,
        url: event.srcElement.href
    });
    return false;
};

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
};

function buildTypeUrlList(divName){

    var ms = 1000 * 60 * 60 * 24 * 7;
    var oneWeekAgo = (new Date).getTime() - ms;

    var numRequestsOutstanding = 0;

    chrome.history.search({
        startTime: oneWeekAgo,
        text: ''
    }, function(historyItems){
        for(var i = 0; i < historyItems.length; ++i){
            var url = historyItems[i].url;

            var processVisitsWithUrl = function(url){
                return function(visitItems){
                    // url 중에서 유저가 직접 입력해서 들어간 url을 찾아서 세주는 함수
                    processVisits(url, visitItems);
                }
            }

            chrome.history.getVisits({url: url}, processVisitsWithUrl(url));
            numRequestsOutstanding++;
        }

        if(!numRequestsOutstanding){

        }
    });

    var urlTocount = {};
    var processVisits = function(url, visitItems){
        for(var i = 0, ie = visitItems.length; i < ie; ++i){
            if(visitItems[i].transition != 'typed'){
                continue;
            }
            if(!urlToCount[url]){
                urlTocount[url] = 0;
            }

            urlToCount[url]++;
        }

        if(!--numRequestsOutstanding){
            onAllVisitsProceed();
        }
    };

    var onAllVisitsProceed = function(){
        urlArray = [];
        for(var url in urlToCount){
            urlArray.push(url);
        }

        urlArray.sort(function(a, b){
            return urlToCount[b] - urlToCount[a];
        });

        buildPopupDom(divName, urlArray.slice(0, 10));
    }
};

document.addEventListener('DOMContentLoaded', function(){
    buildTypedUrlList('typedUrl_div');
});