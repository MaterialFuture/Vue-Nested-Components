export const moduleEdit = {
    state: {
        name: null,
        question: null,
        type: null,
        errors: null,
        success: false,
        loaded: true,

        list: [],
        sortList: [],

        parent_input_types: [
            { text: '-- Select Form Type --', value: null },
            { text: 'Select', value: 'select' },
            { text: 'Radio', value: 'radio' },
            { text: 'Checkbox', value: 'checkbox' },
        ],
        nested_input_types: [
            { text: '-- Select Form Type --', value: null },
            { text: 'Select', value: 'select' },
            { text: 'Text', value: 'text' },
            { text: 'Text Area', value: 'text_area' },
            { text: 'Radio', value: 'radio' },
            { text: 'Checkbox', value: 'checkbox' },
        ],
        show: true,
    },
};
