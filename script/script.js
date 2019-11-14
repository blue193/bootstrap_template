function getStarted() {
    console.log('start')
}
function getInTouch() {
    console.log('ready')
}

var swiper = new Swiper('.slider-swiper-container', {
    loop: true,
    pagination: {
        el: '.slider-swiper-pagination',
    },
    navigation: {
        nextEl: '.slider-swiper-button-next',
        prevEl: '.slider-swiper-button-prev',
    },
});

var swiperForm = new Swiper('.form-swiper-container', {
    pagination: {
        el: '.form-swiper-pagination',
    },
    speed: 0,
    slideToClickedSlide: true,
    effect: 'fade',
    allowSlideNext: false,
    paginationClickable: true,
});

var typeIsChecked = false;
var guestIsChecked = false;
var inputsIsChecked = false;
var dateSelected = false;

function nextStep(swiper) {
    swiper.allowSlideNext = true,
        swiper.slideNext()
    swiper.allowSlideNext = false
}

document.querySelector('.type-button').addEventListener('click', () => {
    if (typeIsChecked) {
        nextStep(swiperForm)
    }
})
document.querySelector('.num-button').addEventListener('click', () => {
    if (guestIsChecked) {
        nextStep(swiperForm)
    }
})
document.querySelector('.selects-button').addEventListener('click', () => {
    if (dateSelected) {
        nextStep(swiperForm)
    }
})
finalFormPage()
function finalFormPage() {
    var inputs = document.querySelectorAll('.form-input input');
    inputs.forEach(input => {
        input.addEventListener('keyup', () => {
            var button = inputs[0].parentNode.parentNode.parentNode.children[2]
            if (inputs[0].value.length > 2 && inputs[1].value.length > 2) {
                this.inputsIsChecked = true;
                button.removeAttribute('disabled')
            }
            else {
                this.inputsIsChecked = true;
                button.setAttribute('disabled', '')
            }
        })
    });
}
function finish() {
    document.querySelector('.form-swiper-container').classList.add('done')
    document.querySelector('.form-swiper-container').innerHTML = `
            <img src="./image/done.png">
            <h2>You’re all set</h2>
            <p>A group travel consultants will be in touch with you shortly, and will help you arrange and customize the perfect trip!</p>
        `
}

document.querySelector('.finish',()=>{
    finish()
})


function formSlider() {
    var types = document.querySelectorAll('input[name="type"]');
    types.forEach(type => {
        type.closest('div').addEventListener('click', function () {
            Array.from(this.parentNode.children).forEach(elm => {
                elm.classList.remove('selected')
            });
            this.classList.add('selected');
            type.checked = true;
            typeIsChecked = true;
            this.parentNode.parentNode.children[2].removeAttribute('disabled')
        })
    });
    var guests = document.querySelectorAll('input[name="numberGuests"]');
    guests.forEach(guest => {
        guest.closest('div').addEventListener('click', function () {
            Array.from(this.parentNode.children).forEach(elm => {
                elm.classList.remove('selected')
            });
            this.classList.add('selected');
            guest.checked = true;
            guestIsChecked = true;
            this.parentNode.parentNode.children[2].removeAttribute('disabled')
        })
    });
}
formSlider()

function days() {
    let select = document.querySelector('#days');
    let options = ""
    for (let i = 1; i <= 31; i++) {
        options += `<option value="day-${i}">${i}<option>`
    }
    select.innerHTML = options;
    for (let i = 1; i < select.children.length; i++) {
        if (select.children[i].innerHTML == '') {
            select.removeChild(select.childNodes[i]);
        }
    }
}

days()
function datePicker() {
    $('#datepicker').datepicker({
        uiLibrary: 'bootstrap4',
        format: 'mm.dd.yyyy',
    });
}

function date() {
    let radio = document.querySelector('.radio input').value;

    $('#datepicker').change(function () {
        dateSelected = true;
        if (dateSelected || radio != 'date-not') {
            document.querySelector('.selects-button').removeAttribute('disabled')
        }
    });
    document.querySelector('#date-not').addEventListener('change', () => {
        dateSelected = true;
        document.querySelector('.selects-button').removeAttribute('disabled')
    })
}
date()
datePicker()


const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if(isMobile){
    document.querySelector('.container').classList.add('mobile')
}