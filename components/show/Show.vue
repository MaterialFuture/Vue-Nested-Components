<template>
    <div>
        <div class="row">
            <b-col cols="12" class="mb-2">
                <div class="card-body">

                    <b-button @click="store.state.show.selection = null" variant="danger">Clear Selection</b-button>

                    <b-form-group :label="store.state.show.parent_list.question"
                                  label-for="input-group-parent"
                                  :key="'parent-'+store.state.show.parent_list.id"
                                  id="input-group-parent">
                        <b-form-select @change=""
                                       v-model="store.state.show.selection"
                                       class="mb-2"
                                       required>
                            <option value="null">--- Please Select One---</option>
                            <option v-for="(item) in (store.state.show.list)" v-if="(item.sort_order).toString().length <= 2"
                                    :value="item.sort_order"
                                    :key="item.form_row.id">
                                {{item.form_row.name}}
                            </option>
                        </b-form-select>
                    </b-form-group>

                    <div v-for="(item) in store.state.show.list" v-bind:hidden="item.sort_order !== store.state.show.selection">
                        <b-form-group :label="item.form_row.question"
                                      :label-for="'parent-'+item.form_row.id"
                                      :key="'parent-'+item.form_row.id"
                                      :id="'parent-'+item.form_row.id">
                            <b-form-select @change=""
                                           v-model="store.state.show.selection"
                                           class="mb-2"
                                           required>
                                <option value="null">--- Please Select One---</option>
                                <option v-for="(option) in item.children"
                                        :value="option.sort_order"
                                        :key="option.sort_order">
                                    {{option.form_row.name}}
                                </option>
                            </b-form-select>
                        </b-form-group>
                    </div>

<!--                Todo: -->
<!--                    Have the state work correctly by storing the selections in an array or something of that sort-->
<!--                        Refer to previous attempts and gather how to create the step by step.-->
                    
<!--                    <b>Parent Selection</b> {{store.state.show.parent_selection}}<br>-->
<!--                    <b>Selection</b> {{store.state.show.selection}}<br>-->
<!--                    <div v-for="(item) in store.state.show.list" class="card mb-2 p-2">-->
<!--                        <span>Sort_order: {{item.sort_order}}</span>-->
<!--                        <span>ID: {{item.form_row.id}}</span>-->
<!--                        <span>Name: {{item.form_row.name}}</span>-->
<!--                        <span>Question: {{item.form_row.question}}</span>-->
<!--                        <ul v-for="(child) in item.children">-->
<!--                            <li>{{child}}</li>-->
<!--                        </ul>-->
<!--                    </div>-->

<!--                    {{store.state.show.parent_list}}-->
<!--                    {{store.state.show.list}}-->

                </div>
            </b-col>
<!--            <b-col cols="4" class="mb-2 p-4">-->
<!--                &lt;!&ndash; For Debugging: Remove when in Prod &ndash;&gt;-->
<!--                <b>New Sort List:</b> {{store.state.show.sort_list}}<br>-->
<!--                <b>The Main List:</b> {{store.state.show.list}}<br>-->
<!--                <b>The Main List:</b>-->

<!--                <br>-->
<!--            </b-col>-->
        </div>

    </div>
</template>

<script>
    import { store } from '../../stores/index'
    Array.prototype.longest = function() {  //Get the longest string in the array  (eg. arr.longest #> '1.1.12')
        return this.sort(                   //Since this is something that can be reused, it's set as a prototype and can be easily accessed
            function(a,b) {
                if (a.length > b.length) return -1;
                if (a.length < b.length) return 1;
                return 0
            }
        )[0];
    };
    export default {
        name: "show-ticket",
        display: "Nested",
        store,
        order: 15,
        props: [
            'tickets',
            'form_rows',
        ],
        data() {
            return {
                store,
            };
        },
        methods: {
            createArrOfSorts() {
                let list_children = this.store.state.show.list,
                    store_sorts = store.state.show.sort_list;
                list_children.forEach( (item) => {
                    store_sorts.push(item.sort_order.toString());
                });
            },
            addChildrenArrToObj() {
                let list_children = this.store.state.show.list,
                    store_sorts = store.state.show.sort_list,
                    len = store_sorts.longest().toString().length;
                console.log(store_sorts);
                list_children.forEach( (item, index) => {
                    item.form_row.id = index;
                    item.children = [];
                    item.children_match = [];

                    // Populate an array of fake sort orders that are within the largest length possible.
                    for (let i = 1; i < len; i++) {
                        item.children.push(item.sort_order + '.' + i)
                    }

                    // Make sure that all children match existing sort orders
                    item.children.forEach( (child) => {
                        store_sorts.forEach((sort) => {
                            if ( sort === child ) {
                                item.children_match.push(child)
                            }
                        });
                        item.children = [];
                    });

                    // Match children_match to actual objects and put them into children array
                    item.children_match.forEach( (child) => {
                        list_children.forEach( (ticket) => {
                            if (ticket.sort_order.toString() === child) {
                                item.children.push(ticket);
                            }
                        });
                    })
                });
            },
            dumpChildren() {
                this.store.state.show.list.forEach( (item) => {
                    item.children = []
                })
            },
        },

        mounted() { //Gets all the functions below to fire on page load (when vue comp is mounted) and fires them sequentially.
            store.state.show.parent_list = JSON.parse(this.tickets); //Push the data coming from laravel to the state so it keeps the vue cleaner
            store.state.show.list = JSON.parse(this.form_rows);
            this.createArrOfSorts();
            this.addChildrenArrToObj();
        },
    }
</script>
