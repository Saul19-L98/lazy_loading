'use strict'

let countFromLazy = 0;
let count = 0;

const isIntersection = (entry) => {
    return entry.isIntersecting; //true dentro de la pantalla
}

const loadImage = (entry) => {
    const container = entry.target; //cotainer (DIV)
    const image = container.firstChild; 
    const url = image.dataset.src;
    image.src = url;

    //Image loaded
    image.onload = () => {
        countFromLazy++;
        imagesState();
    }

    observer.unobserve(container);
}

const observer = new IntersectionObserver((entries) => {
    entries.filter(isIntersection).forEach(loadImage)
},{
    root: null,
    threshold: 0,
    rootMargin: `0px 0px 5px 0px`,
});

export const registerImage = (image) => {
    //IntersectionObservasion -> observer(image)
    observer.observe(image);
    count++;
    imagesState();
};

const imagesState = () => {
    console.log(`👀 Images generated: ${count}`);
    console.log(`📦 Images loaded: ${countFromLazy}`);
    console.log('-------------------------')
};

