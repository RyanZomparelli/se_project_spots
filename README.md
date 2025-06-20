# Spots

A photo-sharing social media web app.

**Check out Spots** [here](https://ryanzomparelli.github.io/se_project_spots/)

**Watch a brief video overview** [here](https://drive.google.com/file/d/13w7uFwlzL-z5HIjMBbJHGKxwVurm0Lfc/view?usp=sharing)

## Overview

- Intro
- Figma
- Form validation
- Images

**Intro**

This project is made so all the elements are displayed correctly on popular screen sizes. Some of the project features are:

- Semantic HTML5
- Flexbox
- Grid
- Media queries
- Flat BEM file structure
- Form validation

**Figma**

- [Link to the original project on Figma](https://www.figma.com/file/BBNm2bC3lj8QQMHlnqRsga/Sprint-3-Project-%E2%80%94-Spots?type=design&node-id=2%3A60&mode=design&t=afgNFybdorZO6cQo-1)

- [Preview modal design](https://www.figma.com/design/p7amENvGmugKHfrOif5p1E/Sprint-5-Project-Spots---March-2025?node-id=0-1&p=f&t=nvLNQfAvaHZdK2UN-0)

- [Latest figma iteration(form validation)](https://www.figma.com/design/jFtXsDr4XOyebKcgjyXN6W/Sprint-6-Project--Spots?node-id=4392-312&t=xtGjqIPVOXevyczR-0)

**Form validation**

The Spots application features dynamic form validation messages that update in real-time as users enter input.

This is achieved using the validationMessage property of form elements, which returns a browser-generated error message when an input is invalid. If the input is valid, it returns an empty string.

The validation message is dynamically assigned to the form field using a template literal that combines a unique id and class for each input element.

The validation.js file is designed to be flexible and reusable, with no hardcoded values or variables. It will automatically support new forms and inputs without requiring any updates or changes to the code.

Check out the validation.js file to see how I utilized a modular format with reusable functions for form validation. You can also experiment with the modals yourself by clicking the 'Spots' link at the top of the README.

**Images**

1440px Resolution

![Spots app 1440](./src/images/spots_demo/spots_1440.png)

Mobile view 320px resolution

![Spots mobile view](./src/images/spots_demo/spots_mobile.png)

Preview modal popup

![Preview modal](./src/images/preview__modal.png)

Modal window with dynamic from validation

![Modal window with form validation](./src/images/form_validation-1.png)

Mobile view of modal with dynamic form validation

![Mobile view of modal form validation](./src/images/form_validation-2.png)
