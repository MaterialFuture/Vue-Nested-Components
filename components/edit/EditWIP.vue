<template>
    <div tag="ul" :list="tasks" :group="{ name: 'g1' }">
        <b-card :key="item.name"
                class="card-border-left mt-2"
                v-for="(item, index) in tasks">
            <label hidden :for="'name-'+item.id">Form Label</label>

            <span v-if="!item.name"
                  style="color:darkred">
                Name is required
            </span>
            <b-form-input required
                          class="mb-2"
                          :value="item.name"
                          :id=" 'name-' + item.id "
                          :key="item.id + Math.random().toString(3)"
                          placeholder="Enter Form Label for selection..."
                          @blur="(grabInputBoxData) => sendNameInputData(grabInputBoxData, item)"
                          @keyup.enter="(grabInputBoxData) => sendNameInputData(grabInputBoxData, item)"
            ></b-form-input>

<!--        The @blur tells vue that when you click or tab away it'll do the function, which in this case, updates the model. Remember this! -->
            <label hidden
                   :for="'question-'+item.id">
                Question:
            </label>

<!--            Change v-if to check if validation worked. Make sure validation happens initially on submit in Create.vue. -->
            <span v-if="!item.question"
                  style="color:darkred">
                Question is required
            </span>
            <b-form-input required
                          class="mb-2"
                          :value="item.question"
                          :id=" 'question-' + item.id "
                          :key="item.id + Math.random().toString(3)"
                          placeholder="Enter Question following selection..."
                          @blur="(grabInputBoxData) => sendQuestionInputData(grabInputBoxData, item)"
                          @keyup.enter="(grabInputBoxData) => sendQuestionInputData(grabInputBoxData, item)"
            ></b-form-input>

            <label hidden :for="'select-'+item.id">Form Type:</label>
            <b-form-select required
                           class="mb-2"
                           v-model="item.type"
                           :id="'select-'+item.id"
                           :key="item.id + Math.random().toString(3)"
                           :options="store.state.create.nested_ticket_input_types"
            ></b-form-select>
            <div class="row">
                <b-col cols="6">
<!--                Button is disabled on empty item contents, or select items set to Text, Text Area, or Null-->
                    <b-button v-bind:disabled="
                                item.seen === false ||
                                item.name === null ||
                                item.name === '' ||
                                item.question === null ||
                                item.question === '' ||
                                item.type === 'text' ||
                                item.type === 'text_area' ||
                                item.type === null ||
                                item.type === '' "
                              @click="createOption(item)"
                              variant="primary">
                        Add Option
                    </b-button>
                    <b-button v-if="item.children.length >= 1"
                              @click="item.seen = !item.seen">
                        Collapse Options
                    </b-button>
                </b-col>
                <b-col cols="6" style="text-align:right">
                    <b-button variant="danger"
                              @click="removeInput(index)">
                        Delete Option
                    </b-button><br>
                </b-col>
            </div>

            <edit-nested :tasks="item.children" v-if="item.seen" /> <!-- Recursive adding child elements and such -->
            <p style="margin:15px 0;font-size:30px" v-else>...</p><!-- If Hidden show ellipses -->

        </b-card>
    </div>
</template>
<script>
    import { store } from '../../stores/index'
    export default {
        name: "editNested",
        store,
        props: {
            tasks: {
                required: true,
                type: Array
            },
        },
        data() {
            return {
                store,
            };
        },
        methods: {
            makeSortCounter: (item) => {
                let count = item.sort;
                if (item.children.length !== 0) {
                    let childCount = item.children.length;
                    return count + '.' + (childCount + 1);
                } else {
                    return count + '.' + 1;
                }
            },
            grabInputBoxData: (e) => {}, //This just grabs the event, there's a better way of doing this.
            sendNameInputData: (e, item) => {
                item.name = String(e.srcElement.value);
            },
            sendQuestionInputData: (e, item) => {
                item.question = String(e.srcElement.value);
            },
            removeInput(index) { //Removes that specific Item in the array, ie the card on the view
                this.tasks.splice(index, 1);
            },
            createOption(item) {
                item.children.push({
                    id: Math.random().toString(36).substr(2, 9),
                    name: null,
                    question: null,
                    sort: this.makeSortCounter(item),
                    type: null,
                    seen: true,
                    children: []
                });
            },
        }
    };
</script>
<style scoped>
    .card-border-left .card-body{
        padding: 1rem;
    }
    .card-border-left:nth-child(even) {
        border-left: 5px solid #3490dc;
    }
    .card-border-left:nth-child(odd) {
        border-left: 5px solid #88c9ff;
    }
</style>
