var ajax = function(method, url, data, runCallBack){
    var r = new XMLHttpRequest()
    r.open(method, url, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = function(){
        if(r.readyState == 4){
            runCallBack(r.response)
        }
    }
    r.send(data)
}

var log = function(){
    console.log.apply(console, arguments)
}

var template = function(data){
    var passage = `
        <div class="todo-cell row">
                <div class="todo-content col-sm-8 col-md-8 col-lg-8 col-xs-8">
                    <span class="col-sm-3 col-md-3 col-lg-3 col-xs-3">${data.id}</span>
                    <span class="col-sm-3 col-md-3 col-lg-3 col-xs-3">${data.task}</span>
                    <span class="col-sm-3 col-md-3 col-lg-3 col-xs-3">${data.time}</span>
                    <span class="col-sm-3 col-md-3 col-lg-3 col-xs-3">${data.done}</span>
                </div>
                <div class="todo-edit col-sm-4 col-md-4 col-lg-4 col-xs-8">
                    <button class="btn btn-success btn-sm todo-done">done</button>
                    <button class="btn btn-success btn-sm todo-update">update</button>
                    <button class="btn btn-success btn-sm todo-delete">delete</button>
                </div>
        </div>
    `
    return passage
}

var appendHtml = function(selector, template){
    selector.insertAdjacentHTML('beforeend', template)
}

var AddEvent = function(){
    log('add a todo')
    var todo_input = document.querySelector('.todo-input')
    var url = '/api/todo/add'
    var task = document.querySelector('input[type="text"]').value
    var t = {
        'task': task,
    }
    var message = JSON.stringify(t)
    log('post message add', message)
    var Add_runCallBack = function(data){
       var dt = JSON.parse(data)
        if(dt.success){
            var t = dt.data
            t = JSON.parse(t)
            var todo_box = document.querySelector('.todo-box')
            appendHtml(todo_box, template(t))
        }else{
            log('error', dt.message)
        }
    }
    ajax('POST', url, message, Add_runCallBack)
}

var UpdateEvent = function(){

}

var DeleteEvent = function(){}

var add = function(){
    var add_button = document.querySelector('.input-add')
    log('add_button', add_button)
    add_button.addEventListener('click', function(){
        log('click')
        AddEvent()
    })
}

var main = function(){
   add()
}

window.onload = function () {
    main()
}