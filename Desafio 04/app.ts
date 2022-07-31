
var apiKey:string;
let requestToken:string;
let username:string;
let password:string;
let sessionId:string;
let listId:string;
let accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTU4NzdhMDEyOGY5NWM5MTlhNjllYzNkZWNhNjI5NyIsInN1YiI6IjYyZTZlZTJjOTM2OWEyMDA1N2JhNzk2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Aqce3bbEyXDdgzoDGh1O6NoVr8jMl6wcAFZQytfoIhE';

//Example API request https://api.themoviedb.org/3/movie/550?api_key=a55877a0128f95c919a69ec3deca6297
//API READ Access Token eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTU4NzdhMDEyOGY5NWM5MTlhNjllYzNkZWNhNjI5NyIsInN1YiI6IjYyZTZlZTJjOTM2OWEyMDA1N2JhNzk2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Aqce3bbEyXDdgzoDGh1O6NoVr8jMl6wcAFZQytfoIhE

let searchButton = document.getElementById('search-button') as HTMLButtonElement;
let searchContainer = document.getElementById('search-container') as HTMLButtonElement;
let searchBox = document.getElementById('search') as HTMLInputElement;
let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let passwordBox = document.getElementById('senha') as HTMLInputElement;
let usernameBox = document.getElementById('login') as HTMLInputElement;
let apiBox = document.getElementById('api-key') as HTMLInputElement;

loginButton?.addEventListener('click', async () => {
  console.log("Clique Feito");
  await criarRequestToken();
  console.log("O request Token é" + requestToken);
  await logar();
  console.log("Login tentado");
  await criarSessao();
  console.log("Sessão criada");
  
  console.log(sessionId);
})

async function criarRequestToken () {
  let result:any;
  result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  })
  requestToken = result.request_token;
}

async function logar() {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  })
}

async function criarSessao() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET"
  })
  sessionId = result.session_id;
}

function preencherSenha() {
  password = passwordBox?.value;
  validateLoginButton();
}

function preencherLogin() {
  username =  usernameBox?.value;
  validateLoginButton();
}

function preencherApi() {
  apiKey = apiBox?.value;
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    if(loginButton)
        loginButton.disabled = false;
  } else {
    if(loginButton)
        loginButton.disabled = true;
  }
}

type Requisicao = {
    url:string,
    method:string,
    body?:any
}

class HttpClient {
  static async get({url, method, body}:Requisicao):Promise<any> {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

searchButton?.addEventListener('click', async () => {
  let lista = document.getElementById("lista");
  if (lista) {
    lista.outerHTML = "";
  }
  let query = searchBox?.value;
  let listaDeFilmes = await procurarFilme(query);
  let ul = document.createElement('ul');
  ul.id = "lista"
  for (const item of listaDeFilmes.results) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item.original_title + " id:" + item.id))
    ul.appendChild(li)
  }
  console.log(listaDeFilmes);
  searchContainer?.appendChild(ul);
})

async function procurarFilme(query:string) {
  query = encodeURI(query)
  console.log(query)
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  })
  return result
}

//Gerenciando as WatchLists

let IdFilme:string;
let IdLista:string;
let ListaName:string;
let ListaDesc:string;
let addListButton = document.getElementById('add-list-button') as HTMLButtonElement;
let addNewListButton = document.getElementById('add-new-list-button') as HTMLButtonElement;
let IdMovieBox = document.getElementById('IdFilme') as HTMLInputElement;
let IdListBox = document.getElementById('IdLista') as HTMLInputElement;
let ListaNameBox = document.getElementById('ListaName') as HTMLInputElement;
let DescNameBox = document.getElementById('ListaDesc') as HTMLInputElement;
let movieContainer = document.getElementById('movie-container') as HTMLButtonElement;
let listsContainer = document.getElementById('lists-container') as HTMLButtonElement;

function preencherNomeLista() {
  ListaName = ListaNameBox?.value;
  validateAddNewListButton();
}

function preencherDescLista() {
  ListaDesc = DescNameBox?.value;
  validateAddNewListButton();
}


function preencherMovieLista() {
  IdFilme = IdMovieBox?.value;
  validateAddListButton();
}

function preencherLista() {
  IdLista = IdListBox?.value;
  validateAddListButton();
}

function validateAddNewListButton() {
  if (ListaName && ListaDesc) {
    if(addNewListButton)
    addNewListButton.disabled = false;
  } else {
    if(addNewListButton)
    addNewListButton.disabled = true;
  }
}

function validateAddListButton() {
  if (IdFilme && IdLista) {
    if(addListButton)
    addListButton.disabled = false;
  } else {
    if(addListButton)
    addListButton.disabled = false;
  }
}

addNewListButton?.addEventListener('click', async () => {
  let ListaName = ListaNameBox?.value;
  let ListaDesc = DescNameBox?.value;
  let ul = document.createElement('ul');
  ul.id = "lista listas"
 

  let lista = await criarLista(ListaName,ListaDesc);

  console.log(lista);
  let li = document.createElement('li');
  li.appendChild(document.createTextNode("Lista:" +  ListaName + " Descrição: " +  ListaDesc + " ID: " + lista.list_id));
  ul.appendChild(li);

  listsContainer?.appendChild(ul);

})

addListButton?.addEventListener('click', async () => {
  let IdFilme = IdMovieBox?.value;
  let IdLista = IdListBox?.value;
  let ul = document.createElement('ul');
  ul.id = "lista filmes"

  adicionarFilmeNaLista(IdFilme , IdLista);

  let li = document.createElement('li');
  li.appendChild(document.createTextNode(IdFilme));
  ul.appendChild(li);

  movieContainer?.appendChild(ul);
  
})

async function adicionarFilme(filmeId:string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: "GET"
  })
  console.log(result);
}


async function criarLista(nomeDaLista:string, descricao:string){
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  return result;
}

async function adicionarFilmeNaLista(filmeId:string, listaId:string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result);
}

async function pegarLista() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: "GET"
  })
  console.log(result);
}
