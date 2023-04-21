<template>
    <el-container class="home_container">
        <el-header class="home_header">
            <div class="home_title">校园商铺管理系统-租户</div>
            <div class="home_userinfoContainer">
                <el-dropdown>
                  <span class="el-dropdown-link home_userinfo">
                    {{admin.name}}<i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>

            <el-aside class="home_aside" width="200px">

                <el-menu router>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-s-custom"></i>个人中心</template>
                        <el-menu-item index="/personalCenter" :class="$route.path=='/dormitoryAdminAdd'?'is-active':''">
                            <i class="el-icon-folder-add"></i>个人中心
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-user-solid"></i>租户模块</template>
                        <el-menu-item index="/tenantManager2">
                            <i class="el-icon-document-copy"></i>租户管理
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-s-home"></i>楼宇模块</template>
                        <el-menu-item index="/buildingManager2">
                            <i class="el-icon-document-copy"></i>楼宇管理
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-s-shop"></i>商铺模块</template>
                        <el-menu-item index="/shopManager2">
                            <i class="el-icon-document-copy"></i>商铺管理
                        </el-menu-item>
                    </el-submenu>
                    
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-s-grid"></i>商铺租赁模块</template>
                        <el-menu-item index="/LeaseRecord2">
                            <i class="el-icon-document-copy"></i>租赁记录
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title"><i class="el-icon-s-release"></i>租户迁出模块</template>
                        <el-menu-item index="/MoveRecord2">
                            <i class="el-icon-document-copy"></i>迁出记录
                        </el-menu-item>
                    </el-submenu>
<!-- 
                    <el-menu-item index="/moveoutRegister">
                        <i class="el-icon-s-unfold"></i>
                        <span slot="title">学生迁出登记</span>
                    </el-menu-item>

                    <el-menu-item index="/moveoutRecord">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">学生迁出记录</span>
                    </el-menu-item>

                    <el-menu-item index="/absentRecord">
                        <i class="el-icon-error"></i>
                        <span slot="title">学生缺寝记录</span>
                    </el-menu-item> -->
                </el-menu>

            </el-aside>

            <el-container>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view></router-view>
                </el-main>
                <!-- <el-footer class="home_footer">2022 © DORMS</el-footer> -->
            </el-container>

        </el-container>

    </el-container>
</template>
<script>
    export default{
        name:'tenantAdmin',
        methods: {
            logout(){
                let _this = this;
                this.$confirm('注销登录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    localStorage.removeItem('tenantAdmin')
                    _this.$router.replace({path: '/login'})
                })
            }
        },
        data(){
            return {
                admin:''
            }
        },
        created() {
            let admin = JSON.parse(window.localStorage.getItem('tenantAdmin'))
            this.admin = admin
        }
    }
</script>
<style  lang="less">
    .home_container {
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        .home_header {
            background:rgba(0, 0,0, 0.7);
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .home_aside {
            background:rgba(255,255,255,0.8);
        }
        .el-menu{
            background:none;
        }
        .el-main{
            background:rgba(255,255,255,0.5);
        }
    }

    .home_title {
        color: #C2C2C2;
        font-size: 22px;
        display: inline;
    }

    .home_userinfo {
        color: #fff;
        cursor: pointer;
    }

    .home_userinfoContainer {
        display: inline;
        margin-right: 20px;
    }


</style>
