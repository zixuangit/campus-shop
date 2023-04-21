<template>
    <div style="margin-top: 60px;margin-left:80px;border: 0px solid red;" >
        <el-form style="margin-left: -40px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="字段：" prop="key">
                <el-select v-model="ruleForm.key" style="width: 160px;float: left" placeholder="请选择字段">
                    <el-option label="租户姓名" value="name"></el-option>
                    <el-option label="手机号" value="phone"></el-option>
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
                style="width: 1150px;position: relative;top:-30px">
            <el-table-column
                    fixed
                    prop="buildingName"
                    label="楼宇名称"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="shopName"
                    label="商铺名称"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="tenantName"
                    label="租户"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="startDate"
                    label="开始日期"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="endDate"
                    label="结束日期"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="rent"
                    label="租金">
            </el-table-column>
            <el-table-column label="操作" fixed="right" v-if="state">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="edit(scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="del(scope.row)">删除</el-button>
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
        <el-dialog title="商铺租赁修改" :visible.sync="dialogFormVisible" width="40%" @close="close()">
            <el-form :model="form" class="form" :rules="dialogRules" ref="ruleForm">
                <el-form-item label="楼宇名称" :label-width="formLabelWidth">
                    <el-input v-model="form.buildingName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="商铺名称" :label-width="formLabelWidth">
                    <el-input v-model="form.shopName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="租户" :label-width="formLabelWidth" prop="tenantName">
                    <el-input v-model="form.tenantName" autocomplete="off" disabled></el-input>
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
                <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                state:true,
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
                leaseForm:{}
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
                    axios.get('http://localhost:8181/lease/moveoutList/'+currentPage+'/'+_this.pageSize).then(function (resp) {
                        _this.tableData = resp.data.data.data
                        _this.total = resp.data.data.total
                    })
                } else {
                    _this.ruleForm.page = _this.currentPage
                    axios.get('http://localhost:8181/lease/moveoutSearch',{params:_this.ruleForm}).then(function (resp) {
                        _this.tableData = resp.data.data.data
                        _this.total = resp.data.data.total
                    })
                }

            },
            edit(row){
                let _this=this
                this.dialogFormVisible = true
                this.form=row
                this.form.date=[row.startDate,row.endDate]
                axios.get('http://localhost:8181/lease/findById/'+row.id).then(function (resp) {
                    if(resp.data.code == 0){
                        _this.leaseForm=resp.data.data
                    }
                })
            },
            confirm(formName){
                let _this=this
                _this.leaseForm.rent=_this.form.rent
                _this.leaseForm.remarks=_this.form.remarks
                _this.leaseForm.startDate=_this.form.date[0]
                _this.leaseForm.endDate=_this.form.date[1]
                console.log(this.leaseForm)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put('http://localhost:8181/lease/update',_this.leaseForm).then(function (resp) {
                            if(resp.data.code == 0){
                                _this.$alert('修改成功', '', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.dialogFormVisible = false
                                        _this.$router.push('/leaseRecord')
                                    }
                                });
                            }
                        })
                    }
                });
            },
            del(row){
                console.log(row)
                const _this = this
                this.$confirm('确认删除该租赁记录吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete('http://localhost:8181/lease/deleteById/'+row.id).then(function (resp) {
                        if(resp.data.code==0){
                            _this.$alert('删除成功', '', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    location.reload()
                                    axios.get('http://localhost:8181/shop/findById/'+row.shopId).then(function (resp) {
                                        if(resp.data.code == 0){
                                            console.log(resp.data.data)
                                            let list=resp.data.data
                                            list.state='未租出'
                                            console.log(list)
                                            axios.put('http://localhost:8181/shop/update',list).then(function (resp) {
                                                if(resp.data.code == 0){ 
                                                    _this.$router.push('/shopManager')
                                                }
                                             })
                                        }
                                    })
                                }
                            });
                        }
                    });
                });
            }
        },
        created() {
            if(this.$route.path=='/leaseRecord2'){
                this.state=false
            }
            const _this = this
            axios.get('http://localhost:8181/lease/list/1/'+_this.pageSize).then(function (resp) {
                _this.tableData = resp.data.data.data
                _this.total = resp.data.data.total
            })
        }
    }
</script>