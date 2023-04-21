<template>
    <div style="margin-top: 60px;margin-left:330px;width: 300px;height: 500px;border: 0px solid red;" >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <div style="width: 170px;height: 30px;">
                    <template>
                        <el-radio v-model="ruleForm.sex" label="男">男</el-radio>
                        <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
                    </template>
                </div>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idNumber">
                <el-input v-model="ruleForm.idNumber"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" :disabled="editFlag">立即修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                editFlag:false,
                category:null,
                ruleForm: {
                    name: '',
                    sex: '',
                    phone: '',
                    idNumber: '',
                    password: '',
                    state:'未迁出'
                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    idNumber: [
                        { required: true, message: '请输入身份证号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请选输入密码', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    console.log(_this.ruleForm)
                    if (valid) {
                        axios.put('http://localhost:8181/tenant/update',_this.ruleForm).then(function (resp) {
                            if(resp.data.code == 0){
                                _this.$alert(_this.ruleForm.name+'修改成功', '', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/tenantManager')
                                    }
                                });
                            }
                        })
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created(){
            const _this=this
            axios.get('http://localhost:8181/tenant/findById/'+_this.$route.query.id).then(function (resp) {
                if(resp.data.code == 0){
                    _this.ruleForm=resp.data.data
                    if(resp.data.data.state=='已迁出'){
                        _this.editFlag=true
                    }
                }
            })
        }
    }
</script>
