<template>
    <div>
        <div class="row">
            <b-col cols="12">
                <div class="row">
                    <b-col cols="12">
                        <div class="row mt-2">
                            <b-col cols="12" class="mb-2">
                                <form @submit.prevent="submit" method="post">
<!--                                Todo: Setup A verification step like a modal or alert to confirm that the user wants to do that. -->
                                    <button v-bind:disabled="store.state.create.list.length < 1"
                                            type="submit"
                                            class="btn btn-primary">
                                        Submit
                                    </button>
                                    <div v-if="store.state.create.success === true"
                                         class="alert alert-success mt-3">
                                        Created!
                                    </div>
                                    <div v-else-if="store.state.create.errors !== null"
                                         class="alert alert-danger mt-3">
                                        {{store.state.create.errors}}
                                    </div>

                                    <label hidden for="data_name"></label>
                                    <input hidden
                                           aria-hidden="true"
                                           id="data_name"
                                           name="data_name"
                                           :value="store.state.create.name"
                                    />
                                    <label hidden for="data_question"></label>
                                    <input hidden
                                           aria-hidden="true"
                                           id="data_question"
                                           name="data_question"
                                           :value="store.state.create.question"
                                    />
                                    <label hidden for="data"></label>
                                    <textarea hidden
                                              id="data"
                                              name="data"
                                              aria-hidden="true">
                                        {{ store.state.create.list }}
                                    </textarea>
                                    <label hidden for="sort_data"></label>
                                    <textarea hidden
                                              aria-hidden="true"
                                              id="sort_data"
                                              name="sort_data">
                                        {{ store.state.create.sortList }}
                                    </textarea>
                                </form>
                            </b-col>

                            <b-col>
                                <b-form-input required
                                              class="mb-2"
                                              id="create-name"
                                              :value="store.state.create.name"
                                              v-model="store.state.create.name"
                                              placeholder="Enter the name of the ticket..."
                                ></b-form-input>
                                <b-form-input required
                                              class="mb-2"
                                              id="create-question"
                                              :value="store.state.create.question"
                                              v-model="store.state.create.question"
                                              placeholder="Enter the question of the ticket..."
                                ></b-form-input>
                                <label hidden :for="'select-'+store.state.create.id">
                                    Form Type:
                                </label>
                                <b-form-select required
                                               class="mb-2"
                                               :key="store.state.create.id + Math.random().toString(3)"
                                               v-model="store.state.create.type"
                                               :options="store.state.create.parent_input_types"
                                               :id="'select-'+store.state.create.id"
                                ></b-form-select>
                            </b-col>
                        </div>
<!--                    Button row that allows you to create the base ticket items, parent level-->
                        <div class="row">
                            <b-col>
                                <b-button v-bind:disabled="
                                            store.state.create.name === null ||
                                            store.state.create.question === null ||
                                            store.state.create.type === null "
                                          @click="createNewInput()">
                                    Add Option
                                </b-button><br>
                            </b-col>
                            <b-col style="text-align:right">
                                <b-button @click="clearInputs()"
                                          variant="danger">
                                    Clear Everything
                                </b-button><br>
                            </b-col>
                        </div>
                        <create-nested v-if="store.state.create.list.length >= 1"
                                     :tasks="store.state.create.list"
                                     :sort="store.state.create.sortList"
                        />
                        <div v-else class="mt-5">
                            <p>You don't have anything here yet :(</p>
                        </div>
                    </b-col>

                </div>
            </b-col>
        </div>
    </div>
</template>

<script>
    import createNested from "./CreateNested";
    import preview from "./Preview";
    import { store } from '../../stores/index'
    export default {
        name: "create-ticket",
        display: "Nested",
        store,
        order: 15,
        components: {
            ticketNested,
            preview
        },
        data() {
            return {
                store,
            };
        },
        // Todo: Make sure that there's a form of validation on submit that ensures that Types and Form Labels are there. Add that to the Laravel controller
        methods: {
            makeSortCounter: item => {
                return item[item.length - 1].sort + 1;
            },
            createNewInput() {
                let list = store.state.create.list;
                if (list.length < 1) {
                    list.push({
                        id: Math.random().toString(36).substr(2, 9),
                        name: null,
                        question: null,
                        sort: 1,
                        type: null,
                        seen: true,
                        children: []
                    });
                } else {
                    list.push({
                        id: Math.random().toString(36).substr(2, 9),
                        name: null,
                        question: null,
                        sort: this.makeSortCounter(list),
                        type: null,
                        seen: true,
                        children: []
                    });
                }
            },
            clearInputs() {
                store.state.create.list = [];
                store.state.create.sortList = [];
            },
            clearSortList() {
                store.state.create.sortList = [];
            },
            grabInputBoxData: (e) => {},
            sendticketNameInputData: (e, item) => {
                store.state.create.name = String(e.srcElement.value);
            },
            createInputOnNameInput() {
                let list = store.state.create.list;
                if (list.length < 1) {
                    list.push({
                        id: Math.random().toString(36).substr(2, 9),
                        name: null,
                        question: null,
                        sort: 1,
                        type: null,
                        seen: true,
                        children: []
                    });
                }
            },
            submit(e) { //Submit the form data via Axios
                store.state.create.loaded = false;
                store.state.create.success = false;
                store.state.create.errors = null;
                store.state.create.sortList = [];
                // e.preventDefault();
                let errors     = store.state.create.errors,
                    sortArr    = store.state.create.sortList,
                    filterList = store.getters.filteredBySort;

                sortArr.push(filterList); //Push data created by filteredBySort to be in the sortArr to submit
                console.log("Sort Array Created and Data Set :)"); //for debug

                // Check the array recursively for any null fields in keys for name, question, and type.
                if (!store.state.create.name) {
                    store.state.create.errors = "Error: ticket Name is empty. Please Put something there.";
                }
                if (!store.state.create.question) {
                    store.state.create.errors = "Error: ticket Question is empty. Please Put something there.";
                }
                if (store.getters.emptyFieldCheckName === true) {
                    store.state.create.errors = "Error: There's some empty name fields, please go back and review your ticket";
                } else if (store.getters.emptyFieldCheckQuestion === true) {
                    store.state.create.errors = "Error: There's some empty name fields, please go back and review your ticket";
                } else if (store.getters.emptyFieldCheckType === true) {
                    store.state.create.errors = "Error: There's some empty type fields, please go back and review your ticket";
                } else {
                    console.log("All fields good :)")
                }
                if (store.getters.emptyFieldCheckName === false &&
                    store.getters.emptyFieldCheckQuestion === false &&
                    store.getters.emptyFieldCheckType === false &&
                    store.state.create.name && store.state.create.question && store.state.create.type ) {
                    axios.post('/ticket', { //Post name, question, list[], and sort[]
                        name: store.state.create.name,
                        question: store.state.create.question,
                        list: store.state.create.list,
                        sort: sortArr,
                    })
                    .then(response => {
                        store.state.create.loaded = true;
                        store.state.create.success = true;
                        store.state.create.errors = null;
                        console.log("ticket is Created :)", store.state.create.success);
                        //Route to form
                    })
                    .catch(error => {
                        if ( error.response.status === 422 || error.response.status === 500 || error.response.status === 404 ) {
                            store.state.create.success = false;
                            store.state.create.errors = "Error: unable to be processed. Check the form for missing fields, if this continues please contact an admin.";
                            errors = error.response.data.errors || {};
                        }if ( error.response.status === 401 ) {
                            store.state.create.success = false;
                            store.state.create.errors = "Error 401: You're not logged in. Please Log in to continue";
                            errors = error.response.data.errors || {};
                        }
                    });
                } else {
                    console.log("Failed To Send :(")
                }
            },
        },
    }
</script>
