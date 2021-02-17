'use strict';

const cardsProjects = document.querySelector('.cards-projects');
const sectionTabs = document.querySelector('.tabs');
const tabs = document.querySelectorAll('.tab');

const getData = async function (url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, 
        статус ошибки ${response.status}`);
    } else {
        return await response.json();
    }
};


function createCardProject(project) {
    const { name, img, promo, repository, stack, date } = project;
    let stackStr = '', promoStr = '';
    if (promo) {
        promoStr = '' + '<a href="' + promo + '" class="promo-link" target="_blank">Открыть</a>';
    }
    stack.forEach(elem => stackStr += '<li class="stack-item">' + elem + '</li>');
    const card = `
        <div class="card-project">
            <img src="${img}" alt="Image project" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${name}</h3>
                </div>
                <div class="card-info">
                    <div class="card-stack">
                        <ul class="stack-items">
                            ${stackStr}
                        </ul>
                    </div>
                    <div class="card-link">
                        ${promoStr}
                        <a href="${repository}" class="repository-link"
                            target="_blank">GitHub</a>
                    </div>      
                    <span class="card-date">${date}</span>              
                </div>
            </div>
        </div>
    `;
    cardsProjects.insertAdjacentHTML('beforeend', card);
};

function switchTabs(event) {
    const target = event.target;
    if (target.classList.contains("tab")) {
        tabs.forEach(t => t.classList.remove('active'));
        target.classList.toggle('active');
        cardsProjects.innerHTML = '';
        getData(`./db/${target.id}.json`).then(function (data) {
            data.forEach(createCardProject);
        });
    }
};

function openProject(event) {
    const target = event.target;

    const proJect = target.closest('.card-project');
    if (proJect) {

    }
};

getData('./db/layoutProjects.json').then(function (data) {
    data.forEach(createCardProject);
});

sectionTabs.addEventListener('click', switchTabs);
cardsProjects.addEventListener('click', openProject);
