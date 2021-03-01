const axios = require('axios');
const cheerio = require('cheerio');

function crawler(){
    const url = "https://www.melon.com/chart/index.htm";

    axios.get(url).then(res => {
        
        if(res.status == 200){
            let crawledMusics = [];
            
            const $ = cheerio.load(res.data);
            const $musicList = $('form#frm');

            $musicList.each(function(i){
                crawledMusics[i] = {
                    img: $(this).find('table tr td div.wrap a img').attr('src'),
                    title: $(this).find('table tr td div.wrap div.wrap_song_info div.ellipsis.rank01').text(),
                    writer: $(this).find('table tr td div.wrap div.wrap_song_info div.ellipsis.rank02').text(),
                };
            });
            console.log(crawledMusics);
        }else{
            console.log("서버 응답 오류");
        }
    });

}

crawler();