export const moduleShow = {
    state: {
        name: null,
        question: null,
        type: null,
        parent_list: [],
        list: [],
        selection: null,
        sort_list: [],
        errors: null,
        success: false,
        loaded: true,

        // Below is for creating tickets in the API
        ticket: { // This is the form data that will be sent to API as a ticket will all the required fields
            subject: null,
            description: null,
            status: null,
            priority: null,
            type: null,
        },
        articles: [], //The Articles array used for the Search API Articles function
        searchQuery: null, //Todo: Create a function that takes all the selections and puts them into lowercase and for each thing in this.store.form have "%20%" between each (like ddg)
        statusOptions: [ //This is the status used for ticket creation that replicates what API has available
            { text: 'Select One', value: null },
            { text: 'Claimed', value: 1 },
            { text: 'In Progress', value: 2 },
            { text: 'Awaiting Customer Response', value: 3 },
            { text: 'Awaiting Customer Response HOLD', value: 4 },
            { text: 'Awaiting Agent Response', value: 5 },
            { text: 'Scheduled', value: 6 },
            { text: 'Escalated to Manufacturer', value: 7 },
            { text: 'Resolved', value: 8 },
            { text: 'Closed', value: 9 },
            { text: 'Pending', value: 10 },
            { text: 'Open', value: 11 },
        ],
        priorityOptions: [ //This is the status used for ticket creation that replicates what API has available
            { text: 'Select One', value: null },
            { text: 'Low', value: 1 },
            { text: 'Medium', value: 2 },
            { text: 'High', value: 3 },
            { text: 'Urgent', value: 4 },
        ],
        typeOptions: [ //This is the types used for ticket creation that replicates what API has available
            { text: 'Select One', value: null },
            { text: 'Support', value: 1 },
            { text: 'Installation', value: 2 },
            { text: 'Configuration', value: 3 },
            { text: 'Training', value: 4 },
            { text: 'Resources', value: 5 },
            { text: 'Sales', value: 6 },
            { text: 'Welcome Kit', value: 7 },
            { text: 'Account Management', value: 8 },
            { text: 'Engineering', value: 9 },
            { text: 'Bulk', value: 10 },
            { text: 'Repair', value: 11 },
            { text: 'Product Education', value: 12 },
        ],
    }
};
