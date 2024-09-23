


var url0=`https://webapis-j8hu.onrender.com/`;
$(()=>{
    $('body').ready(()=>{
        $('section').html(`<div class='loadContainer'>Loading notes please wait...<div class="loader"></div></div>`);
       loadNotes();
    })


    function loadNotes(){
        $.ajax({
            method:'get',
            url:url0+'notes',
            success:(data)=>{
                $('section').html('');
                for(var x in data){
                    $('section').append(`<div class='card'><h3>${data[x].Title}</h3>
                    <textarea disabled>${data[x].Descriptions}</textarea><br>
                    <div class='${data[x].uid}'><button class='delete' id='${data[x].uid}'>Delete</button>
                    </div></div>`);
                }
            }
        }).then(()=>{
            $('section').append('<div class="btnAdd"><div class="plus">+<span>Add a note</span></div></div>')
        })
    }

$(document).on('click','.plus',()=>{
    $('.btnAdd').html(`<label>Title</label><br><input id='title' type='text'>
        <br><label>Description</label><br><textarea id='descriptions'></textarea>
        <div class='error'></div>
        <button id='cancel'>Cancel</button><button id='add'>Add</button>`);
})

$(document).on('click',"#add",()=>{
    var newNote={
        Title:$('#title').val(),
        Descriptions:$('#descriptions').val()
    }
    if($('#title').val().trim().length>0 && $('#descriptions').val().trim().length>0){
        $.ajax({
            method:'post',
            url:url0+'addnote',
            data:newNote
        }).then(()=>{loadNotes();
            Alert('.Alert2','<div class="ss">A new note added.</div>',1500);
        })
    }else if($('#title').val().trim().length<1){
        Alert('.error','Enter a title.',900);
    }else if($('#descriptions').val().trim().length<1){
        Alert('.error','Descriptios can not be epmty.',900);
    }
})

$(document).on('click','#cancel',()=>{
    $(".btnAdd").html('<div class="plus">+<span>Add a note</span></div>');
})

$(document).on('click','.delete',(e)=>{
    var id=e.target.id;
    $('.'+id).html(`Are you sure to delete? <button class='yes' id='${id}'>Yes</button>
         or <button id='${id}.0' class='no'>No</button>.`);
    $('.'+id).addClass('center');
})


$(document).on('click','.yes',(e)=>{
    var id=e.target.id;
        $.ajax({
            method:'delete',
            url:url0+'deletenote/'+id
        }).then(()=>{
            loadNotes();Alert('.Alert2','<div class="err">Note deleted.</div>',1500);
        });
})


$(document).on('click','.no',(e)=>{
    var id=e.target.id.replace('.0','');
    $('.'+id).html(`<button class='delete' id='${id}'>Delete</button>`);
})

function Alert(el,txt,ms){
    $(el).html(txt);
    setTimeout(()=>{$(el).html('')},ms);
}

})