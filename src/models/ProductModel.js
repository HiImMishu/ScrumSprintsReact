export const productModel = {
    id: null,
    name: "",
    owner: {
        id: null,
        firstName: "",
        lastName: "",
        email: ""
    },
    devTeam: {
        id: null,
        createdAt: "",
        name: ""
    },
    backlogs: [{
        id: null,
        description: "",
        startTime: "",
        endTime: ""
    }],
    productItems: [{
        itemId: null,
        description: "",
        addedAt: "",
        status: "",
        modifiedBy: {
            id: null,
            firstName: "",
            lastName: "",
            email: ""
        },
        sprint: {
            id: null,
            description: "",
            startTime: "",
            endTime: ""
        }
    }]
}