# E-commerce product page

Main goal of this project was to play with the **Glide.js** library to create carousel. Apart from that I learned how `localStorage` works. Using this property every order added to the cart is saved to the `Storage` object, which means the stored data is saved across browser sessions. To improve the accessibility of the *cart modal* or *lightbox* I used **focus trap** technique which literally locks the user's focus into a given component as they navigate the page using the keyboard. Later on in the project I came across an interesting alternative to event listener on window's resize event which fire every time the window is resized and there is a need to debounce or fire it only at last change. Instead I use `matchMedia` method and attached an event listener to it. Unlike the window resize, *matchMedia* is used with a CSS media query and the event listener is fired only every time it passes that breakpoint.

- Live Site URL: [design-portfolio-tediko.netlify.app](https://ecomerce-product-tediko.netlify.app/)

## Table of contents

- [My process](#my-process)
  - [What I learned](#what-i-learned)
  - [Built with](#built-with)
- [Setup](#setup)
- [Overview](#overview)
  - [Screenshot](#screenshot)
- [Author](#author)

## My process

### What I learned

- [Glide.js](https://glidejs.com/) - **Glide.js** is a dependency-free JavaScript ES6 slider and carousel.
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - **localStorage** is read-only property of the window interface allows you to access a Storage object for the Document's origin. The stored data is saved across browser sessions.
- [focus trap](https://hidde.blog/using-javascript-to-trap-focus-in-an-element/) - **Focus trap** is functionality that limits keyboard focus to a specific set of elements/containers.
- [matchMedia](https://webdevetc.com/blog/matchmedia-events-for-window-resizes/) - **matchMedia** method is alternative to window resize event. Unlike the window resize, `matchMedia` is used with a CSS media query and the event listener is fired only every time it passes that breakpoint.

### Built with

- [Vite](https://vitejs.dev/) - **Vite** is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts: a *dev server*, and *build command* that bundles your code with *Rollup*.
- [Sass CSS pre-processor](https://sass-lang.com/). **Sass** is a stylesheet language that’s compiled to CSS. It allows to use variables, nested rules, mixins, functions, and more, all with a fully CSS-compatible syntax. Sass helps keep large stylesheets well-organized and makes it easy to share design within and across projects.
- [BEM - Block, Element, Modifier](https://getbem.com/) methodology, which is a popular naming convention for classes in HTML and CSS. BEM is useful when it comes to larger, more complex projects when code organization becomes crucial. The idea behind it is to speed up the development process, and ease the teamwork of developers by arranging CSS classes into independent modules.

## Setup
To run this project, clone the repository and install it locally:

```
$ git clone git@github.com:tediko/e-commerce-product-page.git
$ cd e-commerce-product-page
$ npm install
```

Start dev server and watch assets for changes:

```
$ npm run dev
```

*(optional)* Start a local web server and locally preview the production build:

```
$ npm run preview
```

## Overview

### Screenshot

![Design preview for the Single-page design portfolio ](./public/desktop-preview.jpg)

## Author

- Frontend Mentor - [@tediko](https://www.frontendmentor.io/profile/tediko)
- Twitter - [@tediko123](https://www.twitter.com/tediko123)
