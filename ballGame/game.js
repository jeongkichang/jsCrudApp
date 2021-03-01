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
        "large": [
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
    $(".start_button").click(function(){
        $(".start_button").fadeToggle(500, function(){
            gameOn = true;
            timer();
            $(".space").mouseenter(function(){
                // endGame();
            });
            createCircle();
        });
    });

    // 공을 생성하는 함수
    function createCircle(){
        circleNumber++;

        // small medium large 셋 중 하나를 랜덤하게 생성
        // 1부터 3까지의 정수 중 하나를 랜덤하게 생성
        var randomNum = Math.floor((3 * Math.random())+1);

        var circleChoice;
        switch(randomNum){
            case 1:
                circleChoice = "small";
                break;
            case 2:
                circleChoice = "medium";
                break;
            case 3:
                circleChoice = "large";
                break;
        }

        // 공의 id 값을 지정
        var circleName = "circle" + circleNumber;

        var circleColor = circleTypes[circleChoice][0];
        var circleSize = circleTypes[circleChoice][1];
        var circleRadius = circleTypes[circleChoice][2];
        var circleSpeed = circleTypes[circleChoice][3];

        var moveAbleWidth = $("body").width() - circleSize;
        var moveAbleHeight = $("body").height() - circleSize;

        var circlePositionLeft = (moveAbleWidth * Math.random()).toFixed();
        var circlePositionTop = (moveAbleHeight * Math.random()).toFixed();

        var newCircle = "<div class='circle' id='"+circleName+"'></div>";
        $("body").append(newCircle);

        $("#"+circleName).css({
            "background-color": circleColor,
            "width": circleSize + "vmin",
            "height": circleSize + "vmin",
            "border-radius": circleRadius + "vmin",
            "top": circlePositionTop + "px",
            "left": circlePositionLeft + "px"
        });

        // 1ms마다 반복 실행하면서 마우스와의 거리를 계산하는 함수
        function timeCirclePosition(circleTrackID) {
            // 1ms 마다 반복실행
            setTimeout(function () {
                var currentCirclePosition = $(circleTrackID).position();
                var calculatedRadius = parseInt($(circleTrackID).css("width")) * 0.5;
                // 마우스와의 거리 계산 - 만일 거리가 반지름보다 작다면(맞닿았다면) 게임 종료
                var distanceX = mouseX - (currentCirclePosition.left + calculatedRadius);
                var distanceY = mouseY - (currentCirclePosition.top + calculatedRadius);
                if (Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)) <= calculatedRadius) {
                    // 부딪힌 공 빨간색으로 표시
                    $(circleTrackID).removeClass("circle").addClass("redcircle");
                    $(circleTrackID).css("background-color", "red")
                    // endgame();
                };
                timeCirclePosition(circleTrackID);
            }, 1);
        };
        timeCirclePosition("#" + circleName);

        setTimeout(function(){
            if(gameOn == true) createCircle();
        }, 1000);
    };


});