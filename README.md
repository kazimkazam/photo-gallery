# photo gallery

The application is deployed and can be accessed through the link below:

## https://kazimkazam-photo-gallery.netlify.app

This application is based on React-Redux and coded with Typescript and it delivers a single page application (SPA) that allows the user to search for photos. The photos can be searched using one of the two following navigation tabs:
- random: the website will return the user all the photos it can fetch related with a random word;
- search: the user can insert whatever they want to search for in the search bar and the website will look for related photos and return them.

## Table of Contents

- [Development](#development);
- [How to Use](#how-to-use);
- [Screenshots](#screenshots);
- [Tests](#tests);
- [Author](#author);
- [References](#references);
- [License](#license).

## Development

The SPA was coded using TypeScript and React and Redux libraries.

The SPA fetches all photos from Pexels API (https://www.pexels.com/api/documentation/). To find a random word to search for related photos, the SPA uses the random-words package (https://www.npmjs.com/package/random-words).

The loading spinner animation used while waiting for photos to be fetched and shown is based on the react-loading package (https://www.npmjs.com/package/react-loading).

The Footer component was not planned to be like it is, i.e., not even looks like a footer... But I'll leave this way for now. This way, is also preety fast to change the component's look to whatever we may want to.

The website is running on:

- "@reduxjs/toolkit": "^1.9.1",
- "@types/react": "^18.0.26",
- "@types/react-dom": "^18.0.9",
- "pexels": "^1.4.0",
- "random-words": "^1.2.0",
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-loading": "^2.0.3",
- "react-redux": "^8.0.5",
- "react-router-dom": "^6.6.1",
- "react-scripts": "5.0.1",
- "typescript": "^4.9.4",

## How to Use

When the user enters the website, the homepage will be presented. From here, the user can click one of 4 navigation tabs: 1) home - to enter / reenter the homepage; 2) random - to enter the random page where the user will be shown all the photos found related to a random word; 3) search - to enter a search page where the user can insert any topic and search for related photos. After clicking on the search button or hitting enter while the text input is active, the website will fetch all related photos and present them to the user; and 4) acknowledgements - page where credits are given and some "mock" terms of use are presented.

## Screenshots

### Page Home

![image](https://github.com/kazimkazam/photo-gallery/blob/master/screenshots/client/home.png?raw=true)

### Page Random loading photos

![image](https://github.com/kazimkazam/photo-gallery/blob/master/screenshots/client/randomLoadingPhotos.png?raw=true)

### Page Random

![image](https://github.com/kazimkazam/photo-gallery/blob/master/screenshots/client/randomPhotos.png?raw=true)

### Page Random loading photos when no results are found

![image](https://github.com/kazimkazam/photo-gallery/blob/master/screenshots/client/randomNoPhotos.png?raw=true)

### Page Search

![image](https://github.com/kazimkazam/photo-gallery/blob/master/screenshots/client/searchPage.png?raw=true)

### Page Search loading photos

![image](https://github.com/kazimkazam/photo-gallery/blob/master/screenshots/client/searchLoadingPhotos.png?raw=true)

### Page Search results

![image](https://github.com/kazimkazam/photo-gallery/blob/master/screenshots/client/searchResults.png?raw=true)

### Page Search when no results are found

![image](https://github.com/kazimkazam/photo-gallery/blob/master/screenshots/client/searchNoPhotos.png?raw=true)

### Page Random and Search while loading photos on scroll

![image](https://github.com/kazimkazam/photo-gallery/blob/master/screenshots/client/photosLoadingOnScroll.png?raw=true)

## Tests

Tests were conducted using React Testing Library.

To intersect requests made to the Pexels API, it was used the Mock Service Worker (MSW) and mocked responses were returned.

- "@testing-library/jest-dom": "^5.16.5"
- "@testing-library/react": "^13.4.0"
- "@testing-library/user-event": "^13.5.0"
- "@types/jest": "^27.5.2"
- "msw": "^0.49.2"

![image](https://github.com/kazimkazam/photo-gallery/blob/master/screenshots/tests.png?raw=true)

## Author

[@kazimkazam](https://github.com/kazimkazam) (monsieurkazimkazam@gmail.com)

## References

- Camera icons created by Freepik - Flaticon (https://www.flaticon.com/free-icons/camera);
- Homepage Wallpaper: photo by Tim Mossholder from Pexels (https://www.pexels.com/photo/black-and-white-wooden-welcome-sign-3643925/);
- All photos present on this website are fetched from Pexels (https://www.pexels.com);
- Loading spinner animation (https://www.npmjs.com/package/react-loading).

## Licence

MIT
