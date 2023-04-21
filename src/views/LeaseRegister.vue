<template>
    <div style="margin-top: 60px;margin-left:80px;border: 0px solid red;" >
        <el-form style="margin-left: -40px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="字段：" prop="key">
                <el-select v-model="ruleForm.key" style="width: 160px;float: left" placeholder="请选择字段">
                    <el-option label="名称" value="name"></el-option>
                    <el-option label="面积" value="area"></el-option>
                </el-select>
            </el-form-item>
            <div style="border: 0px solid red;width: 400px;height: 60px;position: relative;top: -64px;left: 270px">
                <el-form-item label="值：">
                    <el-input v-model="ruleForm.value" placeholder="请输入关键字" style="width: 160px;"></el-input>
                    <el-button type="primary" icon="el-icon-search" style="position: relative;left: 10px;" @click="submitForm('ruleForm')">搜索</el-button>
                </el-form-item>
            </div>
        </el-form>

        <el-table
                :data="tableData"
                border
                stripe
                style="width: 1161px;position: relative;top:-30px">
            <el-table-column
                    prop="buildingName"
                    label="楼宇"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="商铺名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="area"
                    label="面积"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    width="240">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="状态"
                    width="140">
            </el-table-column>
            <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="edit(scope.row)">租赁</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 20px;float: right"
                       background
                       layout="prev, pager, next"
                       :page-size="pageSize"
                       :total="total"
                       :current-page.sync="currentPage"
                       @current-change="page">
        </el-pagination>

        <el-dialog title="商铺租赁" :visible.sync="dialogFormVisible" width="40%" @close="close()">
            <el-form :model="form" class="form" :rules="dialogRules">
                <el-form-item label="楼宇名称" :label-width="formLabelWidth">
                    <el-input v-model="form.buildingName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="商铺名称" :label-width="formLabelWidth">
                    <el-input v-model="form.shopName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="租户" :label-width="formLabelWidth" prop="tenantName">
                    <el-select
                        v-model="form.tenantId"
                        filterable placeholder="请选择租户">
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="租赁时间" :label-width="formLabelWidth" prop="date">
                    <el-date-picker
                    v-model="form.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    unlink-panels
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="租金" :label-width="formLabelWidth" prop="rent">
                    <el-input v-model="form.rent" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.remarks" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                tableData: null,
                currentPage: 1,
                pageSize: 3,
                total: null,
                key: '',
                value: '',
                ruleForm: {
                    key: '',
                    value: '',
                    page: '',
                    size: 3
                },
                rules: {
                    key: [
                        { required: true, message: '请选择字段', trigger: 'change' }
                    ]
                },
                dialogRules:{
                    tenantName:[
                        { required: true, message: '请选择租户', trigger: 'blur' }
                    ],
                    date:[
                        { required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    rent:[
                        { required: true, message: '请输入租金', trigger: 'blur' }
                    ]
                },
                dialogFormVisible:false,
                formLabelWidth:'100px',
                form:{},
                loading:false,
                options:[]

            }
        },
        methods:{
            submitForm(formName) {
                const _this = this
                //让翻页复原
                _this.currentPage=1
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        _this.ruleForm.page = _this.currentPage
                        axios.get('http://localhost:8181/lease/search',{params:_this.ruleForm}).then(function (resp) {
                            _this.tableData = resp.data.data.data
                            _this.total = resp.data.data.total
                        })
                    }
                });

            },
            page(currentPage){
                const _this = this
                if(_this.ruleForm.value == ''){
                    axios.get('http://localhost:8181/lease/leaseList/'+currentPage+'/'+_this.pageSize).then(function (resp) {
                        _this.tableData = resp.data.data.data
                        _this.total = resp.data.data.total
                    })
                } else {
                    _this.ruleForm.page = _this.currentPage
                    axios.get('http://localhost:8181/lease/search',{params:_this.ruleForm}).then(function (resp) {
                        _this.tableData = resp.data.data.data
                        _this.total = resp.data.data.total
                    })
                }

            },
            edit(row){
                let _this=this
                this.dialogFormVisible = true
                this.form.buildingName=row.buildingName
                this.form.buildingId=row.buildingId
                this.form.shopName=row.name
                this.form.shopId=row.id
                axios.get('http://localhost:8181/moveout/list/1/'+_this.pageSize).then(function (resp) {
                           console.log(resp.data.data)
                    _this.options=resp.data.data.data
                })
                // axios.get('http://localhost:8181/tenant/list').then(function (resp) {
                //            console.log(resp.data.data)
                //     _this.options=resp.data.data
                // })
            },
            confirm(){
                console.log(this.form)
                let lease={}
                lease.startDate=this.form.date[0]
                lease.endDate=this.form.date[1]
                delete this.form.date;
                delete this.form.buildingName;
                delete this.form.shopName;
                for(let i in this.form){
                    lease[i]=this.form[i]
                }
                console.log(lease)
                axios.post('http://localhost:8181/lease/save',lease).then(function (resp) {
                            if(resp.data.code == 0){
                                _this.$alert('租赁成功', '', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/LeaseRecord')
                                        // axios.put('http://localhost:8181/shop/update',{buildingId: '',name: '',area: '',address: '',state:'已租出',remarks:''},)
                                        // .then(function (resp) {
                                        //     if(resp.data.code == 0){
                                        //         _this.$alert(_this.ruleForm.name+'修改成功', '', {
                                        //             confirmButtonText: '确定',
                                        //             callback: action => {
                                        //                 _this.$router.push('/shopManager')
                                        //             }
                                        //         });
                                        //     }
                                        // })
                                    }
                                });
                            }
                        })
            },
            close(){
                this.form={}
            },
            del(row) {
                const _this = this
                this.$confirm('确认删除【'+row.name+'】吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete('http://localhost:8181/shop/deleteById/'+row.id).then(function (resp) {
                        if(resp.data.code==0){
                            _this.$alert('【'+row.name+'】已删除', '', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    location.reload()
                                }
                            });
                        }
                    });
                });
            },
        },
        created() {
            const _this = this
            axios.get('http://localhost:8181/lease/leaseList/1/'+_this.pageSize).then(function (resp) {
                _this.tableData = resp.data.data.data
                _this.total = resp.data.data.total
                console.log(resp)
            })
        }
    }
</script>

<style scoped>
.form .el-form-item .el-select,.form .el-form-item .el-range-editor{
    width: 100%;   
}
</style>