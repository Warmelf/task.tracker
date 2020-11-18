window.addEventListener('load', () => {

    const button = document.querySelector('.button');
    const inputList = document.querySelector('.input_list');
    const buttonSort = document.querySelector('.arr_icon');
    let sorted = false;
    let liSelected;



    const getLi = () => {
        const li = document.createElement('li');
        const dragbutton = document.createElement('div');
        const input = document.createElement('input');
        const removebutton = document.createElement('div');
        li.classList.add('li');
        dragbutton.classList.add('list_icon');
        dragbutton.classList.add('top_list_icon'); 
        input.classList.add('task');
        removebutton.classList.add('list_icon');
        removebutton.classList.add('bot_list_icon');
        removebutton.addEventListener('click', function (e) {
            this.parentElement.remove();
            [...inputList.children].forEach((el, id) => {
                el.dataset.id = id;
            });
        });
        li.addEventListener('dragstart', dragStart)
        li.addEventListener('dragend', dragEnd)
        li.addEventListener('dragleave', dragLeave)
        li.addEventListener('dragover', dragOver)       
        li.addEventListener('drop', onDdrop)
        li.appendChild(dragbutton);
        li.appendChild(input);
        li.appendChild(removebutton);
        li.draggable = true;
        return li;
    };

    function dragStart(event) {
        setTimeout(() => {
            this.classList.add('li_selected');
            this.firstChild.style.backgroundImage = 'url(../images/white_dotes.png)';
            this.lastChild.style.backgroundImage = 'url(../images/white_delete.png)';
        }, 0);       
       
        liSelected = this;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', this.innerHTML);
    };

    function dragEnd() {
        this.classList.remove('li_selected');
        this.firstChild.style.backgroundImage = 'url(../images/dotes-list-icon.png)';
        this.lastChild.style.backgroundImage = 'url(../images/delete.png)';
        liSelected = null;
    };

    function dragOver(event) {
        if ((event.clientY - this.offsetTop) > (this.offsetHeight / 2)) {
            this.classList.remove('top_border_select');
            this.classList.add('bot_border_select');
        } else {
            this.classList.add('top_border_select');
            this.classList.remove('bot_border_select');
        }

        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        return false;
    };

    function dragLeave(event) {
        this.classList.remove('bot_border_select');
        this.classList.remove('top_border_select');
        event.stopPropagation();
    };

    function onDdrop(event) { 
        if (liSelected != this) {
            let getUnsortarr = [...inputList.children].map(e => e.children.item(1).value);
            let getSelectedValue = liSelected.children.item(1).value;
            let isTop = this.classList.contains('top_border_select');
            getUnsortarr.splice(parseInt(liSelected.dataset.id), 1);
            let index = parseInt(this.dataset.id);
            //console.log((liSelected.dataset.id > this.dataset.id), isTop);            
            if (liSelected.dataset.id > this.dataset.id) {
                if (isTop) {                   
                    
                } else {
                    index += 1;
                }
            } else {
                if (isTop) {                  
                    index -= 1;
                }
            }
            //console.log(liSelected.dataset.id, this.dataset.id, index);
            getUnsortarr.splice(index, 0, getSelectedValue);
            [...inputList.children].forEach((el, id) => {
                el.children.item(1).value = getUnsortarr[id];
            });
        }
        
        if (liSelected) {
            this.classList.remove('bot_border_select');
            this.classList.remove('top_border_select');
            buttonSort.firstChild.style.opacity = '0.2';
        }       
    };
    
    function addToInputList(str = '') {
        const li = getLi();
        li.children.item(1).value = str;
        li.dataset.id = inputList.children.length;
        inputList.appendChild(li);
    };

    addToInputList();
    

    button.addEventListener('click', (event) => {
        event.preventDefault();
        addToInputList();
    });


    buttonSort.addEventListener('click', (event) => {
        event.preventDefault();
        let getUnsortarr; 
        if (sorted  && (sorted == 2)) {
            getUnsortarr = [...inputList.children].map(e => e.children.item(1).value).sort( (a, b) => b.charCodeAt(0) - a.charCodeAt(0));
            sorted = 1;
            buttonSort.firstChild.src = '../images/arr-black-top.png';
        } else {
            getUnsortarr = [...inputList.children].map(e => e.children.item(1).value).sort( (a, b) => a.charCodeAt(0) - b.charCodeAt(0));
            sorted = 2;
            buttonSort.firstChild.src = '../images/arr-black-bot.png';
        }
        buttonSort.firstChild.style.opacity = '1';
        [...inputList.children].forEach((el, id) => {
            el.children.item(1).value = getUnsortarr[id];
        });

    });
});