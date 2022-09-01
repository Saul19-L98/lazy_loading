'use strict'

import { registerImage } from "./lazy";


const url = 'https://randomfox.ca';

const imagesContainer = document.querySelector('#images');

//Crete Buttons
const imageManipulationControls = () => {
    //Reference for the insertioning  of the new node.
    const defaultContainer = document.querySelector('#default');
    
    const instructionsContent = document.querySelector('#intructions-content');
    const instructionText = document.createElement('div');
    const instructionTextFlex = document.createElement('div');
    const instructionButtons = document.createElement('div');
    const instructionButtonsFlex = document.createElement('div');
    const add = document.createElement('button');
    const clean = document.createElement('button');
    const text = document.createElement('p');

    let instructions = [instructionText,instructionButtons];
    let actions = [add,clean];

    //Styles with tailwind
    instructionsContent.className = 'py-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8';
    instructionTextFlex.className = 'flex justify-center';
    instructionButtonsFlex.className = 'flex flex-col items-center';
    add.className = 'mt-2 w-1/3 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out';
    clean.className = 'mt-2 w-1/3 inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out';
    text.innerText = 'Add new images 🖼';
    add.id = 'add-button';
    add.innerText = 'Add ➕';
    clean.id = 'clean-button';
    clean.innerText = 'Clean 🧹';

    instructionsContent.append(...instructions);
    instructionText.append(instructionTextFlex);
    instructionTextFlex.append(text);
    instructionButtons.append(instructionButtonsFlex);
    instructionButtonsFlex.append(...actions);
}

imageManipulationControls();
//Buttons
const addButton = document.querySelector('#add-button');
const cleanButton = document.querySelector('#clean-button');

//function that remove all nodes.
const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}

//Random numbet to 123.
const randomNumber = () => {
    return Math.floor(Math.random()*122) + 1;
};

const fetchDataToImages = async (imageNum) => {
    const response = await fetch(`${url}/images/${imageNum}.jpg`);
    const imgSource = response.url;

    //Add image container
    const divTag = document.createElement('div');
    divTag.id = 'image-container'
    divTag.className = 'bg-yellow-300 mt-6 mx-auto w-96';

    //Add image tag
    const imageTag = document.createElement('img');
    imageTag.alt = '#';
    imageTag.className = 'mx-auto w-96';
    imageTag.dataset.src = `${imgSource}`;
    
    imagesContainer.append(divTag);
    divTag.append(imageTag);

    //Container is being observe
    registerImage(divTag);
};



//fetchDataToImages(randomNumber());

addButton.addEventListener('click',(e) => {
    e.preventDefault();
    // if(!imagesContainer.firstChild){
    //     createArrOfNumbers(imagesToGenerate).forEach(imageNum => fetchDataToImages(imageNum));
    // }
    fetchDataToImages(randomNumber());;
});

cleanButton.addEventListener('click',(e) => {
    e.preventDefault();
    removeAllChildNodes(imagesContainer);
});
