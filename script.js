const toasterContainer = document.querySelector('.toaster-container');
const toastsContainer = document.querySelectorAll('.toast-inset-container');
const slider = document.querySelector('.slider');
const lights = document.querySelectorAll('.timer-lights .light');
const toasts = document.querySelectorAll('.toast');
let toastLevel = 1;
let breadState = 'bread';

slider.addEventListener('click', ()=>{
    if (breadState == 'bread' && !toastsContainer[0].children[0].classList.contains('rotate')) {
        toasterContainer.style.pointerEvents = 'none';
        slider.style.pointerEvents = 'none';

        toastLevel = knobState + 1;
        toasterContainer.classList.add("active");
        toastsContainer.forEach((toastContainer) => { toastContainer.classList.add("active"); });
        
        lights.forEach((light, i) => {
            if ( i < toastLevel){
                light.classList.add('on');
            }
            light.style.transitionDelay = '0s';
        })
    
        document.body.style.setProperty('--toast-time', `${toastLevel*2}s`);
        if (toastLevel == 1 ){ toasts.forEach((toast) => { toast.classList.add('levelone');});}
        if (toastLevel == 2 ){ toasts.forEach((toast) => { toast.classList.add('leveltwo');});}
        if (toastLevel == 3 ){ toasts.forEach((toast) => { toast.classList.add('levelthree');});}
        if (toastLevel == 4 ){ toasts.forEach((toast) => { toast.classList.add('levelfour');});}
    
        setTimeout(() => {
            lights.forEach((light, i) => {
                light.style.transitionDelay = `${(toastLevel*2) - ((i+1)*2)}s`;
                light.classList.remove('on');
            })
            if (toastLevel == 1 ){ finishToast(); toastNotification('Best thing since sliced bread.<br>That is the appeal that sin masquerades as.', 'normal') }
        }, "2000");
        setTimeout(() => {
            if (toastLevel == 2 ){ finishToast(); toastNotification('&#128076; Its never as good as its made out to be.', 'normal')}
        }, "4000");
        setTimeout(() => {
            if (toastLevel == 3 ){ finishToast(); toastNotification('Sin never satisfies the soul, it is never worth the price that must be paid.', 'alert') }
        }, "6000");
        setTimeout(() => {
            if (toastLevel == 4 ){ finishToast();  toastNotification('In the end it leaves you empty, defeated, burnt, drained, and hellbound.', 'warning') }
        }, "8000");

        breadState = 'toast';
    } else if (breadState == 'bread' && toastsContainer[0].children[0].classList.contains('rotate')) {
        toastsContainer[0].children[0].classList.remove('rotate');
        toastsContainer[1].children[0].classList.remove('rotate');
    } else if (breadState == 'toast') {
      toastNotification('I AM THE BREAD OF LIFE.', 'normal');  
			resetToast();
    }
});

toasts.forEach((toast) => {
    toast.addEventListener('click', ()=>{
        if (toasterContainer.classList.contains('active')){
            toastNotification('SIN IS MORE DANGEROUS THAN PLAYING AROUND WITH A TOASTER NEAR WATER...', 'warning');
        } else if (toast.classList.contains('rotate')) {
            toastsContainer[0].children[0].classList.remove('rotate');
            toastsContainer[1].children[0].classList.remove('rotate');
            slider.style.pointerEvents = 'all';
        } else {
            toastsContainer[0].children[0].classList.add('rotate');
            toastsContainer[1].children[0].classList.add('rotate');
            slider.style.pointerEvents = 'none';
        }
    });
})

function finishToast() {
    toasterContainer.classList.remove("active");
    toastsContainer.forEach((toastContainer) => { toastContainer.classList.remove("active"); })
    
    setTimeout(() => {
        slider.style.pointerEvents = 'all';
        toasterContainer.style.pointerEvents = 'all';
    }, "1000");
}

function resetToast() {
		slider.style.pointerEvents = 'none';
    toasts.forEach((toast) => {
        toast.classList.remove('levelone');
        toast.classList.remove('leveltwo');
        toast.classList.remove('levelthree');
        toast.classList.remove('levelfour');
        toast.classList.add('reset');
        setTimeout(() => {
            toast.classList.remove('reset');
            slider.style.pointerEvents = 'all';
        }, "4000");
    })
    breadState = 'bread';
}

const knob = document.querySelector( ".toaster-front .knob-face" );
let knobState = 0;
knob.addEventListener('click', ()=>{
    if (knobState != 3) { knobState++ } else { knobState = 0 }
    knob.style.setProperty('--knob-rot', `${knobState*40 - 80}deg`);
    lights.forEach((light, i) => {
        light.style.transitionDelay = '0s';
        if ( i < knobState+1){
            light.classList.add('level');
        } else {
            light.classList.remove('level');
        }
    })
});

const toastNotificationContainer = document.querySelector('.toast-notification-container');


function toastNotification(message, importance) {
    const time = 10000;
    const newToastNotif = document.createElement('div');
    newToastNotif.classList.add('toast-notification', importance);
    newToastNotif.innerHTML = `
        <div class="message">${message}</div>
        <div class="x-icon" onClick=''>&#10006;</div>
    `;
    const xIcon = newToastNotif.querySelector('.x-icon');
    xIcon.addEventListener('click', function() {
        toastNotificationContainer.removeChild(newToastNotif);
    });
    toastNotificationContainer.appendChild(newToastNotif);
    setTimeout(() => {
        toastNotificationContainer.removeChild(newToastNotif);
    }, time);
}