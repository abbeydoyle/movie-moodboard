# Movie Moodboard
A site to create movie recommendations from user input

## Description

This project uses html, css, javascript, two third-party APIs to create movie and tv show recommendations based on user input. The first drop down allows the user to select a media type: movie or tv show. The second genre drop down is dependent on this first choice, as movies and tv shows have different genre categories. Submitting these choices saves the search history and populates the page with twenty recommendations and a custom color scheme. 

This project allowed four contributors to in turn test the pair programming model, work in branches, and merge each individual coding style into the larger collaboration project. Further, it solidified the working knowledge of html, css elements, javascript, third-party APIs, and local storage. This project was styled using Tailwind CSS, which was learned entirely throughout the duration of this project. 


<!-- TODO: write it -->

<!-- Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:

- What was your motivation?
- Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")
- What problem does it solve?
- What did you learn? -->

## Table of Contents (Optional)

<!-- If your README is long, add a table of contents to make it easy for users to find what they need. -->

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Badges](#badges)
- [Features](#features)
- [Tests](#tests)


## Installation

<!-- FIXME: lets deploy this site using the specific naming convention in github so the link itself doesn't include my repo. We'll potentially be linking this in our portfolio so it shouldn't be specific to any one of us -->

There is no installation required for this Movie Moodboard. Simply follow this [link](https://abbeydoyle.github.io/movie-moodboard/), open in your preferred browser, and use the search form to see the weather for a city of your choice!

<!-- What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running. -->


## Usage

There are 8 main sections of this repository:

- [Assets Folder](https://github.com/abbeydoyle/movie-moodboard/tree/development/assets) - Contains the notes folder, the javascript and css files, and the images folder, containing images for the ReadME

- [JS Folder](https://github.com/abbeydoyle/movie-moodboard/tree/development/assets/js) - Contains the Javascript file encoding all webpage script

- [CSS Folder](https://github.com/abbeydoyle/movie-moodboard/tree/development/assets/css) - Contains all CSS styling for the webpage, excluding the Tailwind styling done within the html

- [Notes Folder](https://github.com/abbeydoyle/movie-moodboard/tree/development/assets/notes) - Contains a graveyard.js file, which contains nonfunctional code to reference, and a pseudo.js file, that has an opening scripting process

- [Index.html](https://github.com/abbeydoyle/movie-moodboard/blob/development/index.html) - Contains the HTML enconding the Movie Moodboard webpage, as well as the Tailwind styling elements

- [License](https://github.com/abbeydoyle/movie-moodboard/blob/development/LICENSE) - Contains the webpage license

- [.gitignore](https://github.com/abbeydoyle/movie-moodboard/blob/development/.gitignore) - Contains files unnecessary for Git to track

- [ReadME](https://github.com/abbeydoyle/movie-moodboard/blob/development/README.md) - This file containing an executive overview of the project



<!-- TODO: include deployed page screenshots -->

<!-- FIXME: we will have to change "development" to "main" when we merge back to main -->




<!-- Provide instructions and examples for use. Include screenshots as needed.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ``` -->

## Credits

This webpage was built using UW Trilogy Bootcamp class materials as references.

Advice on this project was received from the following tutors: Rene Trevino, 
<!-- FIXME: mat add your tutor -->

<!-- TODO: add contributions -->
There are four contributors to this project. Each member along with their contributions are listed below.

- Mathew Chandler:

- Abigail Doyle:

- Parker Mathis:

- Eric Wall:


## License

MIT License

Copyright (c) 2022 abbeydoyle

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<!-- The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/). -->

---

<!-- 🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections. -->

## Badges

![badmath](https://img.shields.io/github/repo-size/abbeydoyle/movie-moodboard?color=pink&style=plastic)

![badmath](https://img.shields.io/github/issues-closed-raw/abbeydoyle/movie-moodboard?color=pink&style=plastic)

![badmath](https://img.shields.io/github/issues-raw/abbeydoyle/movie-moodboard?color=pink&style=plastic)

![badmath](https://img.shields.io/github/license/abbeydoyle/movie-moodboard?color=pink&style=plastic)

![badmath](https://img.shields.io/github/commits-since/abbeydoyle/movie-moodboard/7110f63/development?color=pink&style=plastic)

![badmath](https://img.shields.io/github/last-commit/abbeydoyle/movie-moodboard?color=pink&style=plastic)

![badmath](https://img.shields.io/maintenance/yes/2022?color=pink&style=plastic)


<!-- ![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time. -->

## Features

This page features:

- Local storage
- Responsive webpage
- Sticky user input sidebar
- User input dropdowns for media type and genre
- Opening image that is replaced by media recommendations after the user input form is submitted
- Card sizing that is responsive to the fetched API data
- Clear search history button
- Color schemes that are responsive to genre selection
- Footer with the Github portfolios of each member linked
- IMDB ratings, release dates, movie titles, and summaries


<!-- If your project has a lot of features, list them here. -->

<!-- ## How to Contribute

If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer. -->

## Tests

- Select different genres and watch the color scheme change according to your input!
- Watch the input sidebar stick at a fixed position as you scroll through your move/tv show recommendation
- Click on the Github links to be redirected to a contributor's Github portfolio in a new tab
- After your searches, use the Clear Search History button and the page will refresh and local storage will be cleared.



<!-- Go the extra mile and write tests for your application. Then provide examples on how to run them here. -->