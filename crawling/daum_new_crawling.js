const axios = require('axios');
const cheerio = require('cheerio');

function crawler(){
    const url = "https://news.daum.net/ranking/popular";

    axios.get(url).then(res => {
        
        if(res.status == 200){
            let crawledNews = [];
            
            const $ = cheerio.load(res.data);
            const $newsList = $('#mArticle div.rank_news ul.list_news2 li');

            $newsList.each(function(i){
                crawledNews[i] = {
                    title: $(this).find('li div.cont_thumb strong a').text(),
                    summary: $(this).find('li div.cont_thumb div span').text(),
                    img: $(this).find('li a img').attr('src')
                };
            });
            console.log(crawledNews);
        }else{
            console.log("서버 응답 오류");
        }
    });

}

crawler();