import Home from '../components/Home.vue'
import PersonCenter from '../components/Person_center.vue'
import Carts from '../components/Carts.vue'
import CommodityDetails from '../components/Commodity_details.vue'
export default{
    routes:[
        { path: '/home', component: Home },
        { path: '/person_center/:userId', component: PersonCenter },
        { 
            path: '/carts', 
            component: Carts,
            children:[
                { path: 'commodityId/:commodityId', component: CommodityDetails }
            ]

        },
        { path: '*', redirect: '/home' }
    ]
}