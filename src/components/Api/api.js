// //ПРО ПОСТЫ
// GET https://api.react-learning.ru/v2/group-7/posts // получение всех постов
// GET https://api.react-learning.ru/v2/group-7/posts/search/?query=<строка фильтрации по title> // для поиска постов
// GET https://api.react-learning.ru/v2/group-7/posts/:id // получение поста по id

// GET https://api.react-learning.ru/v2/group-7/posts/paginate?page=<номер страницы>&limit=<число ограничивающее вывод на страницу>&query=<строка фильтрации по title> //добавление навигации

// POST https://api.react-learning.ru/v2/group-7/posts // создание нового поста
// PATCH https://api.react-learning.ru/v2/group-7/posts/:postId //редактирование поста по id
// DELETE https://api.react-learning.ru/v2/group-7/posts/:postId //удаление поста по id
// PUT https://api.react-learning.ru/v2/group-7/posts/likes/:postId // установка лайка по id
// DELETE https://api.react-learning.ru/v2/group-7/posts/likes/:postId // снятие лайка по id
// POST https://api.react-learning.ru/v2/group-7/posts/comments/:postId // добавление комментария по id
// DELETE https://api.react-learning.ru/v2/group-7/posts/comments/:postId/:commentId // удаление комментария по id
// GET https://api.react-learning.ru/v2/group-7/posts/comments/ // получение всех комментариев
// GET https://api.react-learning.ru/v2/group-7/posts/comments/:postId // получение комментариев конкрентного поста.

const config = {
    // --> /v2/group-7
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZhNTEwNjU5Yjk4YjAzOGY3NzljZWUiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2Njc5MTE5NDUsImV4cCI6MTY5OTQ0Nzk0NX0.bEvM_arMGz2WXSZor54blXvOjHvTEGOC5TjIZwjGXt4'
    }
}

const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

class Api {
    // тут деструктурируется ({}) объект config по его ключам
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

// GET https://api.react-learning.ru/v2/group-7/posts // получение всех постов
getAllPosts() {
    return fetch(`${this._baseUrl}/v2/group-7/posts`, {
        headers: this._headers
    }).then(onResponce)
}

// GET https://api.react-learning.ru/v2/group-7/posts/:id // получение поста по id

getPost(postid) {
    return fetch(`${this._baseUrl}/v2/group-7/posts/${postid}`, {
        headers: this._headers
    }).then(onResponce)
}

// GET https://api.react-learning.ru/v2/group-7/posts/search/?query=<строка фильтрации по title> // для поиска постов
// POST https://api.react-learning.ru/v2/group-7/posts // создание нового поста
// PATCH https://api.react-learning.ru/v2/group-7/posts/:postId //редактирование поста по id
// DELETE https://api.react-learning.ru/v2/group-7/posts/:postId //удаление поста по id
// PUT https://api.react-learning.ru/v2/group-7/posts/likes/:postId // установка лайка по id
// DELETE https://api.react-learning.ru/v2/group-7/posts/likes/:postId // снятие лайка по id
// POST https://api.react-learning.ru/v2/group-7/posts/comments/:postId // добавление комментария по id
// DELETE https://api.react-learning.ru/v2/group-7/posts/comments/:postId/:commentId // удаление комментария по id
// GET https://api.react-learning.ru/v2/group-7/posts/comments/ // получение всех комментариев
// GET https://api.react-learning.ru/v2/group-7/posts/comments/:postId // получение комментариев конкрентного поста.

}

const api = new Api(config);
export default api;