# User Guide

This guide is meant to provide an overview of how to add, edit, and delete various bits of content of this web app. This project is written in **JSX** using the **React** frontend framework. A basic understanding on this framework is assumed; however, there are no advanced use cases present. Please note that the project utilizes a React component library called [**Semantic UI React**](https://react.semantic-ui.com/introduction). It is advisable to read through the *Introduction* and *Usage* portions of the *Getting Started* section of its documentaiton. With that background at hand, the references to Semantic React's elements will make more sense. There are also many usage examples in the project's code.

**Components** are the lowest-level pieces of content and they hold the bare-minimum structure and styling. These components are imported into **containers**, which imbue them with, at least, functionality and styling. They sometimes hold raw data that is passed down to the underlying component. Above containers sit **Views**, which import containers and place them on the page. This is not the typical React architecture, but this extra layer was found to ease maintanence and implementation. Other than placing containers within a page, a View may sometimes hold raw data to be passed down to containers, which in turn passes data down to the component. This can be seen in the `Papers` View. There, the View passes each paper to a container called `Publications`, which then passes each paper to a component called `Paper`. This structure was found helpful because each paper type could be dealt with separately.
Finally, Views are imported into the top-level **Screens** component, which present all of this structure differently depending upon the detected screen width of the client.

## Working with Components

These are the lowest-level pieces of content. They are imported into higher-level containers, which imbue them with functionality and styling. It typically contains the HTML structure and basic styling inherent to it. A good way to think about it is that a component should be able to be thrown into almost any container available.

## Working with Containers

Containers are typically used to hold and pass data to underlying components to get the needed structure. An example would be the Undergrads container: Undergrads holds an array of students, through which it loops, passing each student to the Person component. Once the looping is done, each student from the data array is now a Person React component, and they are all held in an Undergrads React component. This higher-level component is then imported into the People View, along with the Graduates and Principal Investigators containers.

However, there are exceptions to this rule. For example, the

## Working with Views

To add a new "page" to the app, create a new `View`

## Working with Screen

Screens are React components that get pulled in via the `src/Screens/Root.jsx` file. There, the client device's screen width is assessed and either the `Desktop` or the `Mobile` Screen is sent back.

Within those two components, there are the `Header`, `Footer`, and `Routes`, the last of which corresponds to the page content. That content is provided by `React Router`, which examines the browser's URL and matches that URL to the corresponding page.

### Adding a Screen

To support a new screen width, first create it in `src/Screens/` following the same pattern as the other two. Note that you would most likely have to create new Header and Footer components. However, the `Routes` component would remain the same. The `Views` are the components that provide the content needed by that width. It is these `Views` that are called by the `Routes`.

Once the new Screen is coded, add it to `Root.jsx`, again following the same pattern as the other two Screens.
