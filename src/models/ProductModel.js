export const backlogModel = {
    id: null,
    description: "",
    startTime: "",
    endTime: ""
}

export const itemModel = {
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
    sprint: backlogModel
}

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
    backlogs: [backlogModel],
    productItems: [itemModel]
}