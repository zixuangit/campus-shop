import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import SystemAdmin from '../views/SystemAdmin'
import TenantAdmin from '../views/TenantAdmin'
import TenantAdd from '../views/TenantAdd'
import TenantUpdate from '../views/TenantUpdate'
import TenantManager from '../views/TenantManager'
import BuildingAdd from '../views/BuildingAdd'
import BuildingUpdate from '../views/BuildingUpdate'
import BuildingManager from '../views/BuildingManager'
import ShopAdd from '../views/ShopAdd'
import ShopUpdate from '../views/ShopUpdate'
import ShopManager from '../views/ShopManager'
import MoveoutRegister from '../views/MoveoutRegister'
import MoveRecord from '../views/MoveRecord'
import LeaseRegister from '../views/LeaseRegister'
import LeaseRecord from '../views/LeaseRecord'
import PersonalCenter from '../views/PersonalCenter'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '登录',
    component: Login
  },
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/systemAdmin',
    name: '系统管理员',
    component: SystemAdmin,
    redirect:'/tenantAdd',
    children:[
      {
        path: '/tenantAdd',
        name: '添加租户',
        component: TenantAdd
      },
      {
        path: '/tenantUpdate',
        name: '修改租户',
        component: TenantUpdate
      },
      {
        path: '/tenantManager',
        name: '租户管理',
        component: TenantManager
      },
      {
        path: '/BuildingAdd',
        name: '添加楼宇',
        component: BuildingAdd
      },
      {
        path: '/BuildingUpdate',
        name: '修改楼宇',
        component: BuildingUpdate
      },
      {
        path: '/BuildingManager',
        name: '楼宇管理',
        component: BuildingManager
      },
      {
        path: '/ShopAdd',
        name: '添加商铺',
        component: ShopAdd
      },
      {
        path: '/ShopUpdate',
        name: '修改商铺',
        component: ShopUpdate
      },
      {
        path: '/ShopManager',
        name: '商铺管理',
        component: ShopManager
      },
      {
        path: '/MoveoutRegister',
        name: '租户迁出',
        component: MoveoutRegister
      },
      {
        path: '/MoveRecord',
        name: '迁出记录',
        component: MoveRecord
      },
      {
        path: '/LeaseRegister',
        name: '商铺租赁',
        component: LeaseRegister
      },
      {
        path: '/LeaseRecord',
        name: '租赁记录',
        component: LeaseRecord
      },
    ]
  },
  {
    path: '/tenantAdmin',
    name: '租户',
    component: TenantAdmin,
    redirect:'/personalCenter',
    children:[
      {
        path: '/personalCenter',
        name: '个人中心',
        component: PersonalCenter
      },
      {
        path: '/tenantManager2',
        name: '租户管理',
        component: TenantManager
      },
      {
        path: '/BuildingManager2',
        name: '楼宇管理',
        component: BuildingManager
      },
      {
        path: '/ShopManager2',
        name: '商铺管理',
        component: ShopManager
      },
      {
        path: '/MoveRecord2',
        name: '迁出记录',
        component: MoveRecord
      },
      {
        path: '/LeaseRecord2',
        name: '租赁记录',
        component: LeaseRecord
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
