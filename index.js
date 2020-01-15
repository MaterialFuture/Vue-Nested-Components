import Vue from 'vue';
import Vuex from 'vuex';
import { getByKeyword, hasEmptyFields } from './stores/getters';
import { moduleCreate } from './stores/modules/moduleCreate';
import { moduleShow } from './stores/modules/moduleShow';
import { moduleEdit } from './stores/modules/moduleEdit';

Vue.use(Vuex);

export const store = new Vuex.Store({
    getters: {
        filteredBySort() {
            return getByKeyword(store.state.list, 'sort');
        },
        emptyFieldCheckName() {
            return hasEmptyFields(store.state.list, 'name', store.state.errors);
        },
        emptyFieldCheckQuestion() {
            return hasEmptyFields(store.state.list, 'question');
        },
        emptyFieldCheckType() {
            return hasEmptyFields(store.state.list, 'type');
        },
    },
    modules: {                  //base the names of the modules on the crud route they'll be in, state prop be like: store.state.{module}.name
        create: moduleCreate,   //access state prop like store.state.create.name.
        show: moduleShow,       //access state prop like store.state.show.name
        edit: moduleEdit,       //access state prop like store.state.edit.name
    },
});
