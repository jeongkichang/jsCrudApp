var crudApp = new function() {

    // ---- 프로젝트에 쓰일 데이터들 ----    
    // 수강 데이터를 담을 Json 형식의 배열 만들기
    this.myClass = [
        {
            id: '1',
            className: '운영체제',
            category: '전공필수',
            credit: 3
        },
        {
            id: '2',
            className: '컴퓨터구조론',
            category: '전공선택',
            credit: 4
        },
        {
            id: '3',
            className: '심리학의 이해',
            category: '교양필수',
            credit: 2
        }
    ];

    // 선택할 수 있는 항목 미리 정의
    this.category = [
        '전공필수',
        '전공선택',
        '교양필수',
        '교양선택'
    ];

    // Table Header에 담길 데이터를 확장성을 위해 배열에 담기
    this.col = [];

    // -------------------------------

    // 위의 데이터들을 토대로 실제로 테이블을 만들어주는 메서드
    this.createTable = function(){
        // 테이블을 만들고 데이터를 채우는 코드

        // col에 table header에 해당하는 데이터(myClass의 key값)들을 넣어주는 코드
        // 비어있는 col 배열에 myClass 배열 속 객체들의 key값들을 넣어줘야 함.

        // myClass 속 객체들 순회
        for(var i = 0; i < this.myClass.length; i++){
            // 각 객체들 속의 key값들 순회
             for(var key in this.myClass[i]){
                 // key를 col 배열에 담기
                 if(this.col.indexOf(key) === -1) this.col.push(key);
             }
        }

        // ------------
        var table = document.createElement('table');
        table.setAttribute('id', 'classTable');

        // tr: 새로운 행 추가
        var tr = table.insertRow(-1);

        // th 작성
        for(var h = 0; h < this.col.length; h++){
            var th = document.createElement('th');
            th.innerHTML = this.col[h];
            tr.appendChild(th);
        }

        var div = document.getElementById('container');
        div.innerHTML = '수강관리 앱';
        div.appendChild(table);

        // td 작성
        for(var i = 0; i < this.myClass.length; i++){
            // table에 일단 한 행을 추가
            tr = table.insertRow(-1);
            // table header 길이만큼 순회하며 거기에 매칭되는 데이터 갖고 오기
            for(var j = 0; j < this.col.length; j++){
                var tableCell = tr.insertCell(-1);
                tableCell.innerHTML = this.myClass[i][this.col[j]];
            }
        }
    };
}
crudApp.createTable();

/*

var div = document.getElementById('container');
div.innerHTML = "수강관리 APP";
div.appendChild(table);

*/