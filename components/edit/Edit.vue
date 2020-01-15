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
                                    <button v-bind:disabled="store.state.edit.list.length < 1"
                                            type="submit"
                                            class="btn btn-primary">
                                        Submit ticket
                                    </button>
                                    <div v-if="store.state.edit.success === true"
                                         class="alert alert-success mt-3">
                                        ticket Created!
                                    </div>
                                    <div v-else-if="store.state.edit.errors !== null"
                                         class="alert alert-danger mt-3">
                                        {{store.state.edit.errors}}
                                    </div>

                                    <label hidden for="ticket_data_name"></label>
                                    <input hidden
                                           aria-hidden="true"
                                           id="ticket_data_name"
                                           name="ticket_data_name"
                                           :value="store.state.edit.name"
                                    />
                                    <label hidden for="ticket_data_question"></label>
                                    <input hidden
                                           aria-hidden="true"
                                           id="ticket_data_question"
                                           name="ticket_data_question"
                                           :value="store.state.edit.question"
                                    />
                                    <label hidden for="ticket_data"></label>
                                    <textarea hidden
                                              id="ticket_data"
                                              name="ticket_data"
                                              aria-hidden="true">
                                        {{ store.state.edit.list }}
                                    </textarea>
                                    <label hidden for="ticket_sort_data"></label>
                                    <textarea hidden
                                              aria-hidden="true"
                                              id="ticket_sort_data"
                                              name="ticket_sort_data">
                                        {{ store.state.edit.sortList }}
                                    </textarea>
                                </form>
                            </b-col>

                            <b-col>
                                <b-form-input required
                                              class="mb-2"
                                              id="ticket-name"
                                              :value="store.state.edit.name"
                                              v-model="store.state.edit.name"
                                              placeholder="Enter the name of the ticket..."
                                ></b-form-input>
                                <b-form-input required
                                              class="mb-2"
                                              id="ticket-question"
                                              :value="store.state.edit.question"
                                              v-model="store.state.edit.question"
                                              placeholder="Enter the question of the ticket..."
                                ></b-form-input>
                                <label hidden :for="'select-'+store.state.edit.id">
                                    Form Type:
                                </label>
                                <b-form-select required
                                               class="mb-2"
                                               :key="store.state.edit.id + Math.random().toString(3)"
                                               v-model="store.state.edit.type"
                                               :options="store.state.edit.parent_ticket_input_types"
                                               :id="'select-'+store.state.edit.id"
                                ></b-form-select>
                            </b-col>
                        </div>
<!--                    Button row that allows you to create the base ticket items, parent level-->
                        <div class="row">
                            <b-col>
                                <b-button v-bind:disabled="
                                            store.state.edit.name === null ||
                                            store.state.edit.question === null ||
                                            store.state.edit.type === null "
                                          @click="createNewInput()">
                                    Add Option
                                </b-button><br>
                            </b-col>
                            <b-col style="text-align:right">
<!--                            Todo: Setup A verification step like a modal or alert to confirm that the user wants to do that.-->
                                <b-button @click="clearInputs()"
                                          variant="danger">
                                    Clear Everything
                                </b-button><br>
                            </b-col>
                        </div>
<!--                    The actual tickets that the user is creating, also includes a simple empty state that has something when there is nothing -->
                        <edit-nested v-if="store.state.edit.list.length >= 1"
                                     :tasks="store.state.edit.list"
                                     :sort="store.state.edit.sortList"
                        />
                        <div v-else class="mt-5">
                            <p>You don't have anything here yet :(</p>
                        </div>
                    </b-col>

                </div>
            </b-col>

            <b-col col="12">
                See Arrays:<br>
                {{ JSON.parse(this.tickets) }}
                {{ JSON.parse(this.form_rows) }}
            </b-col>

        </div>
    </div>
</template>

<script>
    import editNested from "./EditticketNested";
    import { store } from '../../stores/index'
    export default {
        name: "edit-ticket",
        display: "Nested",
        store,
        order: 15,
        components: {
            editNested,
            props: [
                'tickets',
                'form_rows',
            ],
        },
        data() {
            return {
                store,
                // ticketList: {
                //     parent: JSON.parse(this.tickets),
                //     children: JSON.parse(this.form_rows),
                // },
            };
        },
        // Todo: Make sure that there's a form of validation on submit that ensures that Types and Form Labels are there. Add that to the Laravel controller
        methods: {
            makeSortCounter: item => {
                return item[item.length - 1].sort + 1;
            },
            createNewInput() {
                let list = store.state.edit.list;
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
                store.state.edit.list = [];
                store.state.edit.sortList = [];
            },
            clearSortList() {
                store.state.edit.sortList = [];
            },
            grabInputBoxData: (e) => {},
            sendticketNameInputData: (e, item) => {
                store.state.edit.name = String(e.srcElement.value);
            },
            createInputOnNameInput() {
                let list = store.state.edit.list;
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
                store.state.edit.loaded = false;
                store.state.edit.success = false;
                store.state.edit.errors = null;
                store.state.edit.sortList = [];
                // e.preventDefault();
                let errors     = store.state.edit.errors,
                    sortArr    = store.state.edit.sortList,
                    filterList = store.getters.filteredBySort;

                sortArr.push(filterList); //Push data created by filteredBySort to be in the sortArr to submit
                console.log("Sort Array Created and Data Set :)"); //for debug

                // Check the array recursively for any null fields in keys for name, question, and type.
                if (!store.state.edit.name) {
                    store.state.edit.errors = "Error: ticket Name is empty. Please Put something there.";
                }
                if (!store.state.edit.question) {
                    store.state.edit.errors = "Error: ticket Question is empty. Please Put something there.";
                }
                if (store.getters.emptyFieldCheckName === true) {
                    store.state.edit.errors = "Error: There's some empty name fields, please go back and review your ticket";
                } else if (store.getters.emptyFieldCheckQuestion === true) {
                    store.state.edit.errors = "Error: There's some empty name fields, please go back and review your ticket";
                } else if (store.getters.emptyFieldCheckType === true) {
                    store.state.edit.errors = "Error: There's some empty type fields, please go back and review your ticket";
                } else {
                    console.log("All fields good :)")
                }
                if (store.getters.emptyFieldCheckName === false &&
                    store.getters.emptyFieldCheckQuestion === false &&
                    store.getters.emptyFieldCheckType === false &&
                    store.state.edit.name && store.state.edit.question && store.state.edit.type ) {
                    axios.post('/ticket', { //Post name, question, list[], and sort[]
                        name: store.state.edit.name,
                        question: store.state.edit.question,
                        list: store.state.edit.list,
                        sort: sortArr,
                    })
                        .then(response => {
                            store.state.edit.loaded = true;
                            store.state.edit.success = true;
                            store.state.edit.errors = null;
                            console.log("ticket is Created :)", store.state.edit.success);
                            //Route to form
                        })
                        .catch(error => {
                            if ( error.response.status === 422 || error.response.status === 500 || error.response.status === 404 ) {
                                store.state.edit.success = false;
                                store.state.edit.errors = "Error: unable to be processed. Check the form for missing fields, if this continues please contact an admin.";
                                errors = error.response.data.errors || {};
                            }if ( error.response.status === 401 ) {
                                store.state.edit.success = false;
                                store.state.edit.errors = "Error 401: You're not logged in. Please Log in to continue";
                                errors = error.response.data.errors || {};
                            }
                        });
                } else {
                    console.log("Failed To Send :(")
                }
            },
            onLoadPopulateList() {
                //Fill store.state.edit.list
                console.log("page loaded...")
            },
        },

        mounted() {
            this.onLoadPopulateList();
        },
    }
</script>
