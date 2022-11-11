// Menu Toggle
const nav = document.getElementById('menu');
function toggleMobileMenu() {
    nav.classList.toggle('open');
}

// End of Menu Toggle

// Связь с сервером

function createSlideItems(slide) {
    const slideItem = `<div class="slider_item">
                                       <div class="slide_content">
                                            <img class="slider_img" src='${slide.image}' alt="catalog card">
                                            <p class="slider_name">${slide.name}</p>
                                             <p class="slider_flowers">${slide.flovers}</p>
                                            <p class="slider_price">${slide.price} грн</p>
                                            <button class="slider_item_button">В кошик</button>
                                       </div>
                                    </div>`;
    return createTemplate(slideItem);
}

function createTemplate(str) {
    const template = document.createElement('template');
    template.innerHTML = str;
    return template.content;
}

function appendContent(content) {
    const el = document.getElementById('slider_items');
    el.appendChild(content);
}

function init() {
    fetch('https://run.mocky.io/v3/275cc213-7485-4396-b1ba-c1969194d67f')
        .then((res) => res.json())
        .then((data) => {
            const fragment = document.createDocumentFragment();
                data.forEach((slide) => {
                    fragment.appendChild(createSlideItems(slide));
                });
            appendContent(fragment);
        }).then(initSlider);
}

init();

//End

// Slider

function initSlider() {

    /* конфигурация */

    var  sliderWidth = document.querySelector('.slider_items').clientWidth; // ширина слайдера
    var  sliderItemWidth = document.querySelector('.slider_item').firstElementChild.clientWidth; //ширина каждого слайда
    var countOfItemsOnPage = 2//Math.round(sliderWidth / sliderItemWidth); // видимое количество изображений

    var list = document.querySelector('.slider_items');
    var listElems = document.querySelectorAll('.slider_item');

    var position = 0;   // положение ленты прокрутки

    document.getElementById('slider_btn_prev').onclick = function () {
        // сдвиг влево
        if (Math.abs(position) === 0) {
            position = -((listElems.length * sliderItemWidth) - sliderItemWidth * countOfItemsOnPage);
        } else {
            position += sliderItemWidth * countOfItemsOnPage;
        }
        // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
        position = Math.round(Math.min(position, 0));
        list.style.marginLeft = position + 'px';
    };

    document.getElementById('slider_btn_next').onclick = function()  {
        // сдвиг вправо
        position -= sliderItemWidth * countOfItemsOnPage;
        if (Math.abs(position) === listElems.length * sliderItemWidth) {
            position = 0;
        }
        // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
        position = Math.round(Math.max(position, -sliderItemWidth * (listElems.length - countOfItemsOnPage)));
        console.log(position, sliderItemWidth, listElems.length, countOfItemsOnPage);
        list.style.marginLeft = position + 'px';
    };
}
// End of Slider


//Add Review

// const reviewForm = document.getElementById('reviewForm');
// const reviewList = document.getElementById('reviewList');
// const inputName = document.getElementById('reviewName');
// const inputMessage = document.getElementById('reviewMessage');
//
// reviewForm.addEventListener('submit', function(event) {
//     event.preventDefault();
//     if (inputName.value === '' || inputMessage.value === "") {
//         alert('Введіть, будь ласка, ім\'я та повідомлення!');
//         return;
//     } else {
//         const newReviewMessage = document.createElement('p');
//         newReviewMessage.textContent =  inputMessage.value;
//         reviewList.appendChild(newReviewMessage);
//         newReviewMessage.className = 'review';
//
//         const newReviewName = document.createElement('p');
//         newReviewName.textContent =  inputName.value;
//         reviewList.appendChild(newReviewName);
//         newReviewName.className = 'reviews_name';
//
//         reviewList.className = 'reviews';
//         event.target.reset();
//     };
// });

    const inputName = document.getElementById('reviewName');
    const inputMessage = document.getElementById('reviewMessage');
    const reviewForm = document.getElementById('reviewForm');


    reviewForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (inputName.value === '' || inputMessage.value === "") {
        alert('Введіть, будь ласка, ім\'я та повідомлення!');
        return;
    } else {
        const reviewFragment = document.createDocumentFragment();
        reviewFragment.appendChild(createNewReview(inputName, inputMessage));
        appendReviewContent(reviewFragment);
        event.target.reset();
        return false;
    }
})

function createNewReview(inputName, inputMessage) {
            const reviewItem= `<article class="new_review">
                                              <div></div>
                                               <div>
                                                   <p class="review">'${inputMessage.value}'</p>
                                                   <p class="reviews_name">'${inputName.value}'</span></p>
                                               </div>
                                           </article>`;
             return createReviewTemplate(reviewItem);
}

function createReviewTemplate(str) {
    const template = document.createElement('template');
    template.innerHTML = str;
    return template.content;
}

function appendReviewContent(content) {
    const reviewList = document.getElementById('reviewList');
    reviewList.appendChild(content);
}


//End of Add Review


