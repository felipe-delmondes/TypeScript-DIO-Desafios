"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var apiKey;
let requestToken;
let username;
let password;
let sessionId;
let listId;
let accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTU4NzdhMDEyOGY5NWM5MTlhNjllYzNkZWNhNjI5NyIsInN1YiI6IjYyZTZlZTJjOTM2OWEyMDA1N2JhNzk2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Aqce3bbEyXDdgzoDGh1O6NoVr8jMl6wcAFZQytfoIhE';
//Example API request https://api.themoviedb.org/3/movie/550?api_key=a55877a0128f95c919a69ec3deca6297
//API READ Access Token eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTU4NzdhMDEyOGY5NWM5MTlhNjllYzNkZWNhNjI5NyIsInN1YiI6IjYyZTZlZTJjOTM2OWEyMDA1N2JhNzk2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Aqce3bbEyXDdgzoDGh1O6NoVr8jMl6wcAFZQytfoIhE
let searchButton = document.getElementById('search-button');
let searchContainer = document.getElementById('search-container');
let searchBox = document.getElementById('search');
let loginButton = document.getElementById('login-button');
let passwordBox = document.getElementById('senha');
let usernameBox = document.getElementById('login');
let apiBox = document.getElementById('api-key');
loginButton === null || loginButton === void 0 ? void 0 : loginButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Clique Feito");
    yield criarRequestToken();
    console.log("O request Token é" + requestToken);
    yield logar();
    console.log("Login tentado");
    yield criarSessao();
    console.log("Sessão criada");
    console.log(sessionId);
}));
function criarRequestToken() {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
            method: "GET"
        });
        requestToken = result.request_token;
    });
}
function logar() {
    return __awaiter(this, void 0, void 0, function* () {
        yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
            method: "POST",
            body: {
                username: `${username}`,
                password: `${password}`,
                request_token: `${requestToken}`
            }
        });
    });
}
function criarSessao() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
            method: "GET"
        });
        sessionId = result.session_id;
    });
}
function preencherSenha() {
    password = passwordBox === null || passwordBox === void 0 ? void 0 : passwordBox.value;
    validateLoginButton();
}
function preencherLogin() {
    username = usernameBox === null || usernameBox === void 0 ? void 0 : usernameBox.value;
    validateLoginButton();
}
function preencherApi() {
    apiKey = apiBox === null || apiBox === void 0 ? void 0 : apiBox.value;
    validateLoginButton();
}
function validateLoginButton() {
    if (password && username && apiKey) {
        if (loginButton)
            loginButton.disabled = false;
    }
    else {
        if (loginButton)
            loginButton.disabled = true;
    }
}
class HttpClient {
    static get({ url, method, body }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open(method, url, true);
                request.onload = () => {
                    if (request.status >= 200 && request.status < 300) {
                        resolve(JSON.parse(request.responseText));
                    }
                    else {
                        reject({
                            status: request.status,
                            statusText: request.statusText
                        });
                    }
                };
                request.onerror = () => {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    });
                };
                if (body) {
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    body = JSON.stringify(body);
                }
                request.send(body);
            });
        });
    }
}
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    let lista = document.getElementById("lista");
    if (lista) {
        lista.outerHTML = "";
    }
    let query = searchBox === null || searchBox === void 0 ? void 0 : searchBox.value;
    let listaDeFilmes = yield procurarFilme(query);
    let ul = document.createElement('ul');
    ul.id = "lista";
    for (const item of listaDeFilmes.results) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(item.original_title + " id:" + item.id));
        ul.appendChild(li);
    }
    console.log(listaDeFilmes);
    searchContainer === null || searchContainer === void 0 ? void 0 : searchContainer.appendChild(ul);
}));
function procurarFilme(query) {
    return __awaiter(this, void 0, void 0, function* () {
        query = encodeURI(query);
        console.log(query);
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
            method: "GET"
        });
        return result;
    });
}
//Gerenciando as WatchLists
let IdFilme;
let IdLista;
let ListaName;
let ListaDesc;
let addListButton = document.getElementById('add-list-button');
let addNewListButton = document.getElementById('add-new-list-button');
let IdMovieBox = document.getElementById('IdFilme');
let IdListBox = document.getElementById('IdLista');
let ListaNameBox = document.getElementById('ListaName');
let DescNameBox = document.getElementById('ListaDesc');
let movieContainer = document.getElementById('movie-container');
let listsContainer = document.getElementById('lists-container');
function preencherNomeLista() {
    ListaName = ListaNameBox === null || ListaNameBox === void 0 ? void 0 : ListaNameBox.value;
    validateAddNewListButton();
}
function preencherDescLista() {
    ListaDesc = DescNameBox === null || DescNameBox === void 0 ? void 0 : DescNameBox.value;
    validateAddNewListButton();
}
function preencherMovieLista() {
    IdFilme = IdMovieBox === null || IdMovieBox === void 0 ? void 0 : IdMovieBox.value;
    validateAddListButton();
}
function preencherLista() {
    IdLista = IdListBox === null || IdListBox === void 0 ? void 0 : IdListBox.value;
    validateAddListButton();
}
function validateAddNewListButton() {
    if (ListaName && ListaDesc) {
        if (addNewListButton)
            addNewListButton.disabled = false;
    }
    else {
        if (addNewListButton)
            addNewListButton.disabled = true;
    }
}
function validateAddListButton() {
    if (IdFilme && IdLista) {
        if (addListButton)
            addListButton.disabled = false;
    }
    else {
        if (addListButton)
            addListButton.disabled = false;
    }
}
addNewListButton === null || addNewListButton === void 0 ? void 0 : addNewListButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    let ListaName = ListaNameBox === null || ListaNameBox === void 0 ? void 0 : ListaNameBox.value;
    let ListaDesc = DescNameBox === null || DescNameBox === void 0 ? void 0 : DescNameBox.value;
    let ul = document.createElement('ul');
    ul.id = "lista listas";
    let lista = yield criarLista(ListaName, ListaDesc);
    console.log(lista);
    let li = document.createElement('li');
    li.appendChild(document.createTextNode("Lista:" + ListaName + " Descrição: " + ListaDesc + " ID: " + lista.list_id));
    ul.appendChild(li);
    listsContainer === null || listsContainer === void 0 ? void 0 : listsContainer.appendChild(ul);
}));
addListButton === null || addListButton === void 0 ? void 0 : addListButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    let IdFilme = IdMovieBox === null || IdMovieBox === void 0 ? void 0 : IdMovieBox.value;
    let IdLista = IdListBox === null || IdListBox === void 0 ? void 0 : IdListBox.value;
    let ul = document.createElement('ul');
    ul.id = "lista filmes";
    adicionarFilmeNaLista(IdFilme, IdLista);
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(IdFilme));
    ul.appendChild(li);
    movieContainer === null || movieContainer === void 0 ? void 0 : movieContainer.appendChild(ul);
}));
function adicionarFilme(filmeId) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
            method: "GET"
        });
        console.log(result);
    });
}
function criarLista(nomeDaLista, descricao) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
            method: "POST",
            body: {
                name: nomeDaLista,
                description: descricao,
                language: "pt-br"
            }
        });
        return result;
    });
}
function adicionarFilmeNaLista(filmeId, listaId) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
            method: "POST",
            body: {
                media_id: filmeId
            }
        });
        console.log(result);
    });
}
function pegarLista() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
            method: "GET"
        });
        console.log(result);
    });
}
