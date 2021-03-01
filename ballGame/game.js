$(document).ready(function(){

    // -- 데이터 정의 -- //

    // 공의 갯수
    var circleNumber = 0;

    // 공의 종류 - 크기, 색, 움직이는 속도
    var circleTypes = {
        "option": [
            "color",
            "width",
            "border-radius",
            "speed"
        ],
        "small": [
            "black",
            5,
            2.5,
            3000 // 한 지점에서 다른 지점으로 움직일 때 걸리는 ms
        ],
        "medium": [
            "blue",
            15,
            7.5,
            4000
        ],
        "larget": [
            "yellow",
            30,
            15,
            5000
        ]
    };

    // 시간을 찍어주는 변수
    var t = 0;

    // 게임 실행 여부
    var gameOn = false;

    // 마우스 좌표
    var mouseX;
    var mouseY;

    // 마우스 움직임을 좌표에 담아주는 함수
    $("body").mousemove(function(){
        mouseX = event.pageX;
        mouseY = event.pageY;
    });

    // 타이머
    function timer(){
        if(gameOn === true){
            // 10ms 마다 t값을 0.01씩 증가
            setTimeout(function(){
                t = t + 0.01;
                $('.timer').html("<h1><div class='center'>"+t.toFixed(2)+"</div></h1>");
                timer();
            }, 10);
        }
    }

    // 시작 버튼

});