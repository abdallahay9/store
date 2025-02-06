import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import { faCartPlus, faFileCirclePlus, faKeyboard, faUserPlus, faUsers  } from "@fortawesome/free-solid-svg-icons";
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
export const links = [
    {
        name:"Users",
        path:"users",
        icon:faUsers,
        role:["1995"]
    },
    {
        name:"Add User",
        path:"/dashboard/user/add",
        icon:faUserPlus,
        role:["1995"]
    },
    {
        name:"Categories",
        path:"/dashboard/categories",
        icon:faLayerGroup,
        role:["1999","1995"]
    },
    {
        name:"Add categories",
        path:"/dashboard/categore/add",
        icon:faCartPlus,
        role:["1999","1995"]
    },
    {
        name:"Products",
        path:"/dashboard/products",
        icon:faProductHunt,
        role:["1999","1995"]
    },
    {
        name:"Add Products",
        path:"/dashboard/product/add",
        icon:faFileCirclePlus,
        role:["1999","1995"]
    },
    
];