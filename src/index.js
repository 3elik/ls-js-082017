import './index.less';

let saveBtn = document.getElementById('js-save');
let inputSearchAll = document.getElementById('js-search-all-friends');
let inputSearchSelected = document.getElementById('js-search-selected-friends');
let listAllFriends = document.getElementById('js-all-friends');
let listSelectedFriends = document.getElementById('js-selected-friends');
let vkApiId = 6195385;
let friendsLists = {
    allFriends: [],
    selectedFriends: []
};
let userTemplate = require('./user_template.hbs');
let isDropped = false;
let classPhantom = 'friends--phantom';
let classDragging = 'friend--dragging';
let classHidden = 'friend--hidden';
let timer;

function vkApi(method, options) {
    if (!options.v) {
        options.v = '5.68';
    }

    return new Promise((resolve, reject) => {
        VK.api(method, options, data => {
            if (data.error) {
                reject(new Error(data.error.error_msg));
            } else {
                resolve(data.response);
            }
        });
    });
}

function vkInit() {
    return new Promise((resolve, reject) => {
        VK.init({
            apiId: vkApiId
        });

        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}

function startProcess(resolve) {
    document.addEventListener('DOMContentLoaded', () => {

        listAllFriends.addEventListener('dragstart',onDragStart, false);
        listSelectedFriends.addEventListener('dragstart',onDragStart, false);

        listAllFriends.addEventListener('dragover',onDragOver, false);
        listSelectedFriends.addEventListener('dragover',onDragOver, false);

        listAllFriends.addEventListener('drop',onDrop, false);
        listSelectedFriends.addEventListener('drop',onDrop, false);

        listAllFriends.addEventListener('dragend',onDragEnd, false);
        listSelectedFriends.addEventListener('dragend',onDragEnd, false);

        saveBtn.addEventListener('click', onSaveFriends);

        inputSearchAll.addEventListener('input', onSearch);
        inputSearchSelected.addEventListener('input', onSearch);

        resolve();
    });
}

let process = new Promise(resolve => {
    startProcess(resolve);
})
.then(() => vkInit())
.then(() => vkApi('friends.get', { fields: 'name,photo_50' }))
.then(friends => {
    friends = friends.items.sort((a,b) => {
        return (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name);
    });

    return friends;
})
.then(friends => {
    let fragAllList = '';
    let fragSelectedList = '';
    let selectedFriends = [];

    if (localStorage.selectedFriends && localStorage.selectedFriends.length) {
        selectedFriends = JSON.parse(localStorage.selectedFriends);
    }

    for (let i = 0; i < friends.length; i++) {
        let template = userTemplate(friends[i]);

        if (selectedFriends.indexOf(friends[i].id) > -1) {
            friendsLists.selectedFriends.push(friends[i]);
            fragSelectedList += template;
        } else {
            friendsLists.allFriends.push(friends[i]);
            fragAllList += template;
        }
    }

    listAllFriends.innerHTML += fragAllList;
    listSelectedFriends.innerHTML += fragSelectedList;
});

function onDragStart(e) {
    let target = e.target;

    if (!target.classList.contains('friend')) {
        return;
    }

    target.classList.add(classDragging);
    e.dataTransfer.setData('id', target.dataset.user_id);
    e.dataTransfer.setData('list', this.dataset.list);
}

function onDragEnd(e) {
    if (!isDropped) {
        let target = e.target;

        target.classList.remove(classDragging)
    }

    let lists = document.getElementsByClassName(classPhantom);

    for (let i = 0; i < lists.length; i++) {
        lists[i].classList.remove(classPhantom);
    }
}

function onDragOver(e) {
    e.preventDefault();
}

function onDrop(e) {
    let friendID = e.dataTransfer.getData('id');
    let friendItem = document.getElementById('friend_' + friendID);
    let list = e.dataTransfer.getData('list');
    let newList = this.dataset.list;

    if (list == newList) {
        friendItem.classList.remove(classDragging);
        return;
    }

    let index = friendsLists[list].findIndex(item => {
        if (friendID == item.id) {
            return true;
        }

        return false;
    });

    let friend = friendsLists[list].splice(index, 1)[0];

    /**
     *  В конечном массиве провести сравнение элементов с новым элементом по имени.
     *  Найти индекс для нового элемента
     *  Вставить новый элемент по полученному индексу
     */
    index = friendsLists[newList].findIndex(item => {
        if ( (friend.first_name + friend.last_name).localeCompare(item.first_name + item.last_name) < 0 ) {
            return true;
        }

        return false;
    });

    index = index > -1 ? index : friendsLists[newList].length;
    friendsLists[newList].splice(index, 0, friend);

    if (this.children.length > 0) {
        this.insertBefore(friendItem, this.children[index]);
    } else {
        this.appendChild(friendItem);
    }

    friendItem.classList.remove(classDragging);

    isDropped = true;
}

function onSaveFriends(e) {
    let ids = [];
    let list = friendsLists.selectedFriends;
    let length = list.length;

    for (let i = 0; i < length; i++) {
        ids.push(list[i].id);
    }

    localStorage.selectedFriends = JSON.stringify(ids);
}

function onSearch(e) {
    clearTimeout(timer);

    timer = setTimeout(() => {
        console.log('test');
        let list = e.target.dataset.target;
        let s = e.target.value.toLowerCase();

        friendsLists[list].forEach(friend => {
            let el = document.getElementById('friend_' + friend.id);

            if ( (friend.first_name + ' ' + friend.last_name).toLowerCase().indexOf(s) > -1) {
                el.classList.remove(classHidden);
            } else {
                el.classList.add(classHidden);
            }
        })
    }, 1500);
};