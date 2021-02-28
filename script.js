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

            // 버튼 만들기
            // update 버튼 만들기
            this.td = document.createElement('td');
            tr.appendChild(this.td);

            var updateButton = document.createElement('input');
            updateButton.setAttribute('type', 'button');
            updateButton.setAttribute('value', 'Update');
            updateButton.setAttribute('id', 'Edit' + i);
            updateButton.setAttribute('style', 'background-color: #44cceb');
            updateButton.setAttribute('onclick', 'crudApp.Update(this)'); // 이 버튼이 클릭될 때 실행할 메서드
            this.td.appendChild(updateButton);

            // Save 버튼 만들기
            this.td = document.createElement('td');
            tr.appendChild(this.td);

            var saveButton = document.createElement('input');
            saveButton.setAttribute('type', 'button');
            saveButton.setAttribute('value', 'Save');
            saveButton.setAttribute('id', 'Save' + i);
            saveButton.setAttribute('style', 'display: none;');
            saveButton.setAttribute('onclick', 'crudApp.Save(this)'); // 이 버튼이 클릭될 때 실행할 메서드
            this.td.appendChild(saveButton);

            // Delete 버튼 만들기
            this.td = document.createElement('td');
            tr.appendChild(this.td);

            var deleteButton = document.createElement('input');
            deleteButton.setAttribute('type', 'button');
            deleteButton.setAttribute('value', 'Delete');
            deleteButton.setAttribute('id', 'Delete' + i);
            deleteButton.setAttribute('style', 'background-color: #ed5650;');
            deleteButton.setAttribute('onclick', 'crudApp.Delete(this)'); // 이 버튼이 클릭될 때 실행할 메서드
            this.td.appendChild(deleteButton);
        }

        // 입력행 추가
        tr = table.insertRow(-1);
        for(var j = 0; j < this.col.length; j++){
            var newCell = tr.insertCell(-1);
            if(j > 0){
                if(j==2){
                    // 선택 항목을 만들어주기
                    var select = document.createElement('select');
                    select.innerHTML = '<option value=""></option>';
                    for(var k = 0; k < this.category.length; k++){
                        select.innerHTML = select.innerHTML +
                                           '<option value="'+this.category[k]+'">' +
                                           this.category[k]+"</option>";
                    }
                    newCell.appendChild(select);
                }else{
                    var textBox = document.createElement('input');
                    textBox.setAttribute('type', 'text');
                    textBox.setAttribute('value', '');
                    newCell.appendChild(textBox);
                }
            }
        }

        // create 버튼 만들기
        this.td = document.createElement('td');
        tr.appendChild(this.td);
        var createButton = document.createElement('input');
        createButton.setAttribute('type', 'button');
        createButton.setAttribute('value', 'Create');
        createButton.setAttribute('id', 'Create');
        createButton.setAttribute('style', 'background-color: #207dd1');
        createButton.setAttribute('onclick', 'crudApp.Create(this)');
        this.td.appendChild(createButton);
    };

    // 삭제 메서드
    this.Delete = function(oButton){
        var targetIdx = oButton.parentNode.parentNode.rowIndex;
        this.myClass.splice((targetIdx-1), 1);
        this.createTable();
    };

    this.Create = function(oButton){
        var targetIdx = oButton.parentNode.parentNode.rowIndex;
        var rowData = document.getElementById('classTable').rows[targetIdx];

        var obj = [];
        for(var i = 1; i < this.col.length; i++){
            var td = rowData.getElementsByTagName("td")[i];
            if(td.childNodes[0].getAttribute('type') === 'text' || td.childNodes[0].tagName === 'SELECT'){
                var textValue = td.childNodes[0].value;
                if(textValue == ''){
                    obj = [];
                    alert('모든 항목을 입력해주세요.');
                    break;
                }else if(i === 3 && parseInt(td.childNodes[0].value) === 'NaN'){
                    obj = [];
                    alert('학점은 숫자만 입력이 가능합니다.');
                    break;
                }else{
                    obj[this.col[i]] = textValue;
                }
            }
        }

        if(obj['className'] !== undefined){
            obj[this.col[0]] = this.myClass.length + 1;
            this.myClass.push(obj);
            this.createTable();
        }
    };

    this.Update = function(oButton){
        console.log(1);
        var targetIdx = oButton.parentNode.parentNode.rowIndex;
        var rowData = document.getElementById('classTable').rows[targetIdx];

        for(var i = 1; i < this.col.length; i++){
            if(i == 2){
                var td = rowData.getElementsByTagName("td")[i];
                var select = document.createElement("select");
                select.innerHTML = '<option value="'+td.innerText+'">'+td.innerText+"</option>";
                for(var k = 0; k < this.category.length; k++){
                    select.innerHTML = select.innerHTML + '<option value="'+this.category[k]+'">'+this.category[k]+"</option>";
                }
                td.innerText = '';
                td.appendChild(select);
            }else{
                var td = rowData.getElementsByTagName("td")[i];
                var input = document.createElement("input");
                input.setAttribute("type", "text");
                input.setAttribute("value", td.innerText);
                td.innerText = '';
                td.appendChild(input);
            }
        }
    }
}
crudApp.createTable();

/*

var div = document.getElementById('container');
div.innerHTML = "수강관리 APP";
div.appendChild(table);

*/