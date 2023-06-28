# 3MO x Nima 🧑‍💻
This interview project is a simple web application that includes dummy data locally to reduce the need for external API calls. Tasks are to be found via `TODO` markups in the code, additionally these are summarized in this readme file. Changing external behavioral modifications to the existing code which alters the course of the project is not allowed.
Questions are gladly answered. Time to accomplish the tasks is estimated to be a maximum of 6 hours.

---

## Setup

### Prerequisites
- Latest version of Node.js & npm
- IDE of choice with TypeScript support (If you use Visual Studio Code, [Lit Plugin](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin) helps with Lit development)


### Fire up the local environment
- Install all dependencies `npm i`
- Start the local server `npm start`

----

## Project

### Task 1
Implement `getAllFlattened` and `search` functions in [PhotoService.ts](data/services/PhotoService.ts)
as [PagePhotos.ts](application/photo/PagePhotos.ts) calls it to fetch the photos. The result should be the flattened list of all photos including the new `parentId` property.

The next step is to convert [Photo.ts](data/types/Photo.ts) to a class rather that leaving it as a literal object to be able to implement the getter `isRoot`.

Then, render two new appropriate columns for `parentId` and `isRoot` in the data-grid.

Last but not least, let's get everything wired up to the UI. Make the `mo-field-search`, `sample-field-select-album` and `mo-checkbox` components which are slotted in the data-grid toolbar filter the results.

### Task 2
Now that the flattened data is represented in the `mo-data-grid` component, we want to have an alternative layout for showing the data in a grid of cards. This layout should be a truly-responsive css grid layout without JavaScript intervention which shall be implemented using the `mo-grid` component. `mo-grid` is a wrapper around the CSS's native `display: grid` functionality, so study it shortly to get to know it's attributes. The grid's columns shall auto-fit the content with a minimum column width of `200px` and a gap of `10px` between columns and rows.

After the grid container is ready, render the existing component `sample-card` for each photo object. As there are too many photos to render, limit the rendering to the first 50 photos.

Then, implement a recursive dynamic scroll rendering mechanism to load 50 more photos each time the user scrolls to the bottom of the grid.

### Task 3
Let's spice it up a bit! The goal is to synchronize the selection of cards with the selection in data-grid, meaning any selection change in cards is reflected to the data-grid and vice versa.

The `mo-data-grid`'s API offers properties & events such as `selectionMode`, `selectedData` and `selectionChange` which are used to implement the selection, so study them shortly.

The `sample-photo-card` already has a property `selected`. Make sure to set it while rendering the cards in the grid container. Implement an event called `selectionChange` on `sample-photo-card` also to notify the outside world about the selection change.

Last but not least, use the APIs of both components to synchronize the selection of cards-view with the selection of data-grid-view.

### Task 4
Let's test a unit in the application. Our system under test will be the [PhotoCard.ts](application/photo/PhotoCard.ts) component. It will be a behavioral test therefore strict testing of css styles and dom layout is not required. Outline test cases and implement them in [PhotoCard.test.ts](application/photo/PhotoCard.test.ts).
The integrated test runner is Karma and the test framework is Jasmine. There is a passing dummy test in [PhotoCard.test.ts](application/photo/PhotoCard.test.ts) to use as a starting point. Tests can be run with `npm test` or `npm run test`.
And finally outline the tests that could be written in the [PagePhotos.test.ts](application/photo/PagePhotos.test.ts) without implementation.

Good Luck 🍀