/* event listener */
/* add node in todolist
    When (input btn click) or (input enter) */
var $input = document.querySelector('#input');
var $inputBtn = document.querySelector('#inputBtn');
// when input Enter
if ($input !== null) {
    $input.addEventListener('keyup', function (event) {
        if ($input.value !== "" && event.key === 'Enter') {
            addNodeTodo($input.value);
            $input.value = "";
        }
    });
}
// when input Btn click
if ($input !== null && $inputBtn !== null) {
    $inputBtn.addEventListener('click', function () {
        if ($input.value !== "") {
            addNodeTodo($input.value);
            $input.value = "";
        }
    });
}
;
/* function */
/* add node in todolist */
var $todolist = document.querySelector('#todo ol');
function addNodeTodo(content) {
    if ($todolist !== null) {
        var node_1 = document.createElement('li');
        node_1.innerHTML = "\n\t\t\t<p>\n\t\t\t\t".concat(content, "\n\t\t\t</p>\n\t\t\t<button>\n\t\t\t\t\uC644\uB8CC\n\t\t\t</button>\n\t\t");
        // add event to go donelist
        var btn = node_1.querySelector('button');
        if (btn !== null) {
            btn.addEventListener('click', function () {
                addNodeDone(content);
                $todolist.removeChild(node_1);
            });
        }
        // append child
        $todolist.appendChild(node_1);
    }
}
;
/* add node in donelist */
var $donelist = document.querySelector('#done ol');
function addNodeDone(content) {
    if ($donelist !== null) {
        var node_2 = document.createElement('li');
        node_2.innerHTML = "\n\t\t\t<p>\n\t\t\t\t".concat(content, "\n\t\t\t</p>\n\t\t\t<button>\n\t\t\t\t\uC0AD\uC81C\n\t\t\t</button>\n\t\t");
        // add event to go remove
        var btn = node_2.querySelector('button');
        if (btn !== null) {
            btn.addEventListener('click', function () {
                $donelist.removeChild(node_2);
            });
        }
        // append child
        $donelist.appendChild(node_2);
    }
}
