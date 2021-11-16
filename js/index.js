$(document).ready(function() {
    const contentTitle = document.querySelector('.content__title');
    const contentLocation = document.querySelector('.content__location');
    const contentDate = document.querySelector('.content__date');
    charming(contentTitle);
    contentTitle.style.opacity = 1;
    const titleLetters = [...contentTitle.querySelectorAll('span')];
    const enterCtrl1 = $('.content__button-1');
    const enterCtrl2 = $('.content__button-2');
    const enterCtrl3 = $('.content__button-3');
    const enterCtrl4 = $('.content__button-4');
    const closeBut = $('.close');

    let animation = new explosion.default(
        'container', // id of DOM el
        {
            surface: '000a56', 
            inside: '000343', 
            background: '000000',
            onLoad: ()=>{
                document.body.classList.remove('loading');
            }
        }
    );

    animation.camera.position.z = 500;

    let targetMouseX = 0, mouseX = 0, ta = 0;
    const sign = n => n === 0 ? 1 : n/Math.abs(n);    
    document.addEventListener('mousemove',(e) => {
        targetMouseX = 2*(e.clientX - animation.width/2)/animation.width;
    });
    document.addEventListener('touchmove',(e) => {
        targetMouseX = ( e.touches[0].clientX / animation.width ) * 2 - 1;
    });

    const draw = () => {
        if ( animation ) {
            mouseX += (targetMouseX - mouseX)*0.05;
            ta = Math.abs(mouseX);
            animation.scene.rotation.y = 0.2 *-ta*(2 - ta)*Math.PI * sign(mouseX);
            animation.scene.rotation.z = 0.2 *-ta*(2 - ta)*Math.PI * sign(mouseX);
        }
        window.requestAnimationFrame(draw);
    }
    draw();

    let isOpen = false;
    let $mithNum;
    let $mithNumStr;

    enterCtrl1.bind('touchstart mousedown', function(){
        isOpen = true;
        $mithNum = '1';
        $mithNumStr = '#1';
        runAnimation($mithNum, $mithNumStr)
    });
    enterCtrl2.bind('touchstart mousedown', function(){
        isOpen = true;
        $mithNum = '2';
        $mithNumStr = '#2';
        runAnimation($mithNum, $mithNumStr)
    });
    enterCtrl3.bind('touchstart mousedown', function(){
        isOpen = true;
        $mithNum = '3';
        $mithNumStr = '#3';
        runAnimation($mithNum, $mithNumStr)
    });
    enterCtrl4.bind('touchstart mousedown', function(){
        isOpen = true;
        $mithNum = '4';
        $mithNumStr = '#4';
        runAnimation($mithNum, $mithNumStr)
    });

    closeBut.bind('touchstart mousedown', function(){
        isOpen = false;
        let hideText1 = document.getElementById('show_1');
        let hideText2 = document.getElementById('show_2');
        let hideText3 = document.getElementById('show_3');
        let hideText4 = document.getElementById('show_4');
        if (!isOpen){

            new TimelineMax()
            
            .to(closeBut, 0.3, {
                opacity: 0,
                progress: 2,
                ease: Expo.easeOut,
                complete: () => TweenMax.set([closeBut], {'pointer-events' : 'none'})
            })
            .to(animation.settings, 10, {
                progress: 2,
                ease: Expo.easeOut
            }, 0)
            .staggerTo(titleLetters.sort(() => Math.round(Math.random())-0.5), 1.1, {
                opacity: 0,
                startAt: {scale: 0},
                scale: 1,
                ease: Quart.easeOut
            }, 0.08 , 0)
            .to([contentDate, contentLocation], 1.1, {
                opacity: 0,
                startAt: {scale: 0},
                scale: 1,
                ease: Quart.easeOut
            }, 0.2)
            .to(animation.settings, 1, {
                progress: 0,
                ease: Quart.easeInOut
            }, 2)
            .to(animation.camera.position, 1, {
                z: 500,
                ease: Expo.easeInOut
            }, 2)
            .staggerTo([enterCtrl1, enterCtrl2, enterCtrl3, enterCtrl4], 1, {
                opacity: 1,
                scale: 1,
                ease: Expo.easeInOut,
                complete: () => TweenMax.set([enterCtrl1, enterCtrl2 ,enterCtrl3, enterCtrl4], {'pointer-events' : 'unset'})
            }, 0.06, 2)
            .staggerTo([contentDate, contentLocation], 1, {
                opacity: 1,
                scale: 0,
                ease: Expo.easeInOut
            }, 0.06, 4)
            .staggerTo(titleLetters, 1, {
                opacity: 1,
                scale: 0,
                ease: Expo.easeInOut
            }, 0.04 , 1.7)
            .to([hideText1, hideText2, hideText3, hideText4], 0.3, {
                opacity: 0,
                scale: 0,
                ease: Expo.easeInOut,
                complete: () => TweenMax.set([hideText1, hideText2 ,hideText3, hideText4], {'opacity' : '0', 'pointer-events' : 'none'})
            }, 0.06, 2)
        }
    });
    
    function runAnimation ($mithNum, $mithNumStr) {
        contentTitle.innerText = '';
        contentTitle.insertAdjacentHTML("beforeEnd", 'МIФ' + '&nbsp;<span>' + $mithNumStr + '</span>');
        // contentTitle.removeAttribute('style');

        let textShow = document.getElementById('show_' + $mithNum);

        if (isOpen){
            
        new TimelineMax()
        .to([enterCtrl1, enterCtrl2, enterCtrl3, enterCtrl4], 0.3, {
            opacity: 0,
            scale: 0,
            ease: Expo.easeInOut,
            complete: () => TweenMax.set([enterCtrl1, enterCtrl2 ,enterCtrl3, enterCtrl4], {'pointer-events' : 'none'})
        }, 0.06, 4)
        
        .to(animation.settings, 20, {
            progress: 2,
            ease: Expo.easeOut
        }, 0)
        
        .staggerTo(titleLetters.sort(() => Math.round(Math.random())-0.5), 1.1, {
            opacity: 1,
            startAt: {scale: 0},
            scale: 1,
            ease: Quart.easeOut
        }, 0.08 , 0)
        .to([contentDate, contentLocation, contentTitle], 1.1, {
            opacity: 1,
            startAt: {scale: 0},
            scale: 1,
            ease: Quart.easeOut
        }, 0.2)
        
        .to(animation.settings, 1, {
            progress: 0,
            ease: Quart.easeInOut
        }, 4)
        .to(animation.camera.position, 1, {
            z: 500,
            ease: Expo.easeInOut
        }, 4)
        .staggerTo([contentDate, contentLocation, contentTitle], 1, {
            opacity: 0,
            scale: 0,
            ease: Expo.easeInOut
        }, 0.06, 4)
        
        .staggerTo(titleLetters, 1, {
            opacity: 0,
            scale: 0,
            ease: Expo.easeInOut
        }, 0.04 , 3.7)
        .staggerTo(textShow, 0.6, {
            opacity: 1,
            startAt: {scale: 1.5},
            scale: 1,
            ease: Expo.easeOut,
            
        }, 0.08 , 4.3)
        .to(closeBut, 1.5, {
            opacity: 1,
            ease: Expo.easeOut,
            complete: () => TweenMax.set([closeBut], {'pointer-events' : 'unset'})
        }, 4.6)
        .to(textShow, 1.5, {
            opacity: 1,
            startAt: {scale: 0},
            scale: 1,
            ease: Quart.easeOut,
            complete: () => TweenMax.set([textShow], {'pointer-events' : 'all'})
        }, 4.6)
    }
};


    enterCtrl1.bind('mouseenter', () => {
        if ( isOpen ) return;
        new TimelineMax()
        .to(animation.camera.position, 1, {
            z: 490,
            ease: Expo.easeOut
        }, 0);
    });
    enterCtrl2.bind('mouseenter', () => {
        if ( isOpen ) return;
        new TimelineMax()
        .to(animation.camera.position, 1, {
            z: 490,
            ease: Expo.easeOut
        }, 0);
    });
    enterCtrl3.bind('mouseenter', () => {
        if ( isOpen ) return;
        new TimelineMax()
        .to(animation.camera.position, 1, {
            z: 490,
            ease: Expo.easeOut
        }, 0);
    });
    enterCtrl4.bind('mouseenter', () => {
        if ( isOpen ) return;
        new TimelineMax()
        .to(animation.camera.position, 1, {
            z: 490,
            ease: Expo.easeOut
        }, 0);
    });

    enterCtrl1.bind('mouseleave', () => {
        if ( isOpen ) return;
        new TimelineMax()
        .to(animation.camera.position, 1, {
            z: 500,
            ease: Expo.easeOut
        }, 0);
    });
    enterCtrl2.bind('mouseleave', () => {
        if ( isOpen ) return;
        new TimelineMax()
        .to(animation.camera.position, 1, {
            z: 500,
            ease: Expo.easeOut
        }, 0);
    });
    enterCtrl3.bind('mouseleave', () => {
        if ( isOpen ) return;
        new TimelineMax()
        .to(animation.camera.position, 1, {
            z: 500,
            ease: Expo.easeOut
        }, 0);
    });
    enterCtrl4.bind('mouseleave', () => {
        if ( isOpen ) return;
        new TimelineMax()
        .to(animation.camera.position, 1, {
            z: 500,
            ease: Expo.easeOut
        }, 0);
    });
})