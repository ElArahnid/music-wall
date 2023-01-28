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
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserInfoById(userId) {
        return fetch(`${this._baseUrl}/v2/group-7/users/${userId}`, {
            headers: this._headers
        }).then(onResponce)
    }

    editUserNameAbout(data) {
        return fetch(`${this._baseUrl}/v2/group-7/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
          }).then(onResponce)
    }

    editUserAvatar(data) {
        return fetch(`${this._baseUrl}/v2/group-7/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
          }).then(onResponce)
    }

    getAllPosts() {
        return fetch(`${this._baseUrl}/v2/group-7/posts`, {
            headers: this._headers
        }).then(onResponce)
    }

    search(query) {
        return fetch(`${this._baseUrl}/v2/group-7/posts/search/?query=${query}`, {
            headers: this._headers
        }).then(onResponce)
    }

    getPost(postid) {
        return fetch(`${this._baseUrl}/v2/group-7/posts/${postid}`, {
            headers: this._headers
        }).then(onResponce)
    }

    addPost(postData) {
        return fetch(`${this._baseUrl}/v2/group-7/posts`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(postData)
          }).then(onResponce)
    }

    delPost(postId) {
        return fetch(`${this._baseUrl}/v2/group-7/posts/${postId}`, {
            method: 'DELETE',
            headers: this._headers,
          }).then(onResponce)
    }

    editPost(postId, reviewData) {
        return fetch(`${this._baseUrl}/v2/group-7/posts/${postId}`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(reviewData)
          }).then(onResponce)
    }

    addLike(postId) {
        return fetch(`${this._baseUrl}/v2/group-7/posts/likes/${postId}`, {
            method: 'PUT',
            headers: this._headers
          }).then(onResponce)
    }

    delLike(postId) {
        return fetch(`${this._baseUrl}/v2/group-7/posts/likes/${postId}`, {
            method: 'DELETE',
            headers: this._headers,
          }).then(onResponce)
    }

    getReviews(postid) {
        return fetch(`${this._baseUrl}/v2/group-7/posts/comments/${postid}`, {
            headers: this._headers
        }).then(onResponce)
    }

    addReview(postId, reviewData) {
        return fetch(`${this._baseUrl}/v2/group-7/posts/comments/${postId}`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(reviewData)
          }).then(onResponce)
    }

    delReview(postId, reviewId) {
        return fetch(`${this._baseUrl}/v2/group-7/posts/comments/${postId}/${reviewId}`, {
            method: 'DELETE',
            headers: this._headers,
          }).then(onResponce)
    }

    putAuthLocalInfo(email, password) {
        const data = require("../../utilites/vipPersons.json");
        data.map((uData) => {
            if ((uData.email === email) && (uData.password === password)) {
                localStorage.setItem('authorised', true);
                localStorage.setItem('id', uData.id);
                localStorage.setItem('avatar', uData.avatar);
                localStorage.setItem('name', uData.name);
            }
            else {
                localStorage.removeItem('id');
                localStorage.setItem('authorised', false);
            }
        }
        )
    }

}

const api = new Api(config);
export default api;
