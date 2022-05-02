let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoImg = document.querySelector('.intro-logo');
let logoText = document.querySelectorAll('.intro-logo');

window.addEventListener('DOMContentLoaded', ()=> {
    setTimeout(()=>{

        logoText.forEach((span,index) => {
            setTimeout(()=>{
                span.classList.add('active');
            }, (index +1) * 400);
            console.log(span);
        })
        setTimeout(() =>{
            logoImg.classList.add('active');
        }, 400);
        
        setTimeout(() => {
            logoText.forEach((span, index) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (index +1) *50)
                console.log(span);
            })
            setTimeout(() => {
                logoImg.classList.remove('active');
                logoImg.classList.add('fade');
            }, 50)
        }, 2000);

        setTimeout(()=> {
            // intro.style.top = '-100vh';
            // intro.style.transition ='1s';
            intro.style.opacity = '0';
        }, 2300)

        
    });
})