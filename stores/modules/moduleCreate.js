export const moduleCreate = {
    state: {
        name: null,
        question: null,
        type: null,
        list: [],
        sortList: [],
        errors: null,
        success: false,
        loaded: true,

        parent_ticket_input_types: [
            { text: '-- Select Form Type --', value: null },
            { text: 'Select', value: 'select' },
            { text: 'Radio', value: 'radio' },
            { text: 'Checkbox', value: 'checkbox' },
        ],
        nested_ticket_input_types: [
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
