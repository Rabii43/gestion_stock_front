export const menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.dashboards.text",
        icon: "bx-home-circle",
        badge: {
            variant: "info",
            text: "menuitems.dashboards.badge"
        },
        subItems: [
            {
                id: 3,
                label: "menuitems.dashboards.list.default",
                link: "/",
                parentId: 2
            },
            {
                id: 3,
                label: "menuitems.dashboards.list.saas",
                link: "/marche",
                parentId: 2
            },
            {
                id: 4,
                label: "menuitems.dashboards.list.users",
                link: "/users",
                parentId: 2
            },
        ]
    },
];

