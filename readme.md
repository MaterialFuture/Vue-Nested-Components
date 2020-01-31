# Vue.JS Nested Components

This is an example of some recursion I used for an application in Vue.JS. This was created as part of a Laravel application, names and functions were changed a bit to make more sense as to not be tied to that project.

This on its own is not intended to work, but rather be used as a part of a larger project such as a Laravel or Rails application.

The idea was that you create the data on the front-end, Laravel takes the data and makes it easy to store in the DB creating relationships and such, and then Vue takes that data and displays it. The data is deeply nested, so recursion is used to get the data and create a step by step questionnaire sort of tool. The intention was for it to be used with Laravel, but I will be trying to get this working standalone.

This project implements
- Nested components
- State management with Vuex
- Creating Sort orders on the fly in the view
- Handling complex sort orders once stored in the API

This is a work in progress, there's still more that needs to be done to get this as a stand-alone application.

### Todo
- Write documentation on the data coming in
- Mock data coming in
- Have this as working standalone application