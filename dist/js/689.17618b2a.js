"use strict";(self["webpackChunkssm"]=self["webpackChunkssm"]||[]).push([[689],{7689:function(e,t,s){s.r(t),s.d(t,{default:function(){return u}});var l=function(){var e=this,t=e._self._c;return t("div",[t("el-form",{attrs:{inline:!0}},[t("el-form-item",[t("el-input",{attrs:{placeholder:"用户名",clearable:""},model:{value:e.searchForm.username,callback:function(t){e.$set(e.searchForm,"username",t)},expression:"searchForm.username"}})],1),t("el-form-item",[t("el-button",{on:{click:e.getUserList}},[e._v("搜索")])],1),t("el-form-item",[e.hasAuth("sys:user:save")?t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("新增")]):e._e()],1),t("el-form-item",[t("el-popconfirm",{attrs:{title:"这是确定批量删除吗？"},on:{confirm:function(t){return e.delHandle(null)}}},[e.hasAuth("sys:user:delete")?t("el-button",{attrs:{slot:"reference",type:"danger",disabled:e.delBtlStatus},slot:"reference"},[e._v("批量删除")]):e._e()],1)],1)],1),t("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",border:"",stripe:""},on:{"selection-change":e.handleSelectionChange}},[t("el-table-column",{attrs:{type:"selection",width:"55"}}),t("el-table-column",{attrs:{label:"头像",width:"50"},scopedSlots:e._u([{key:"default",fn:function(e){return[t("el-avatar",{attrs:{size:"small",src:e.row.avatar}})]}}])}),t("el-table-column",{attrs:{prop:"username",label:"用户名",width:"120"}}),t("el-table-column",{attrs:{prop:"code",label:"角色名称"},scopedSlots:e._u([{key:"default",fn:function(s){return e._l(s.row.sysRoles,(function(s){return t("el-tag",{key:s,attrs:{size:"small",type:"info"}},[e._v(e._s(s.name))])}))}}])}),t("el-table-column",{attrs:{prop:"email",label:"邮箱"}}),t("el-table-column",{attrs:{prop:"phone",label:"手机号"}}),t("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(s){return[1===s.row.status?t("el-tag",{attrs:{size:"small",type:"success"}},[e._v("正常")]):0===s.row.status?t("el-tag",{attrs:{size:"small",type:"danger"}},[e._v("禁用")]):e._e()]}}])}),t("el-table-column",{attrs:{prop:"created",width:"200",label:"创建时间"}}),t("el-table-column",{attrs:{prop:"icon",width:"260px",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(s){return[t("el-button",{attrs:{type:"text"},on:{click:function(t){return e.roleHandle(s.row.id)}}},[e._v("分配角色")]),t("el-divider",{attrs:{direction:"vertical"}}),e.hasAuth("sys:user:repass")?t("el-button",{attrs:{type:"text"},on:{click:function(t){return e.repassHandle(s.row.id,s.row.username)}}},[e._v("重置密码")]):e._e(),t("el-divider",{attrs:{direction:"vertical"}}),t("el-button",{attrs:{type:"text"},on:{click:function(t){return e.editHandle(s.row.id)}}},[e._v("编辑")]),t("el-divider",{attrs:{direction:"vertical"}}),[t("el-popconfirm",{attrs:{title:"这是一段内容确定删除吗？"},on:{confirm:function(t){return e.delHandle(s.row.id)}}},[t("el-button",{attrs:{slot:"reference",type:"text"},slot:"reference"},[e._v("删除")])],1)]]}}])})],1),t("el-pagination",{attrs:{layout:"total, sizes, prev, pager, next, jumper","page-sizes":[10,20,50,100],"current-page":e.current,"page-size":e.size,total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),t("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"600px","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[t("el-form",{ref:"editForm",attrs:{model:e.editForm,rules:e.editFormRules}},[t("el-form-item",{attrs:{label:"用户名",prop:"username","label-width":"100px"}},[t("el-input",{attrs:{autocomplete:"off"},model:{value:e.editForm.username,callback:function(t){e.$set(e.editForm,"username",t)},expression:"editForm.username"}}),t("el-alert",{staticStyle:{"line-height":"12px"},attrs:{title:"初始密码为888888",closable:!1,type:"info"}})],1),t("el-form-item",{attrs:{label:"邮箱",prop:"email","label-width":"100px"}},[t("el-input",{attrs:{autocomplete:"off"},model:{value:e.editForm.email,callback:function(t){e.$set(e.editForm,"email",t)},expression:"editForm.email"}})],1),t("el-form-item",{attrs:{label:"手机号",prop:"phone","label-width":"100px"}},[t("el-input",{attrs:{autocomplete:"off"},model:{value:e.editForm.phone,callback:function(t){e.$set(e.editForm,"phone",t)},expression:"editForm.phone"}})],1),t("el-form-item",{attrs:{label:"状态",prop:"status","label-width":"100px"}},[t("el-radio-group",{model:{value:e.editForm.status,callback:function(t){e.$set(e.editForm,"status",t)},expression:"editForm.status"}},[t("el-radio",{attrs:{label:0}},[e._v("禁用")]),t("el-radio",{attrs:{label:1}},[e._v("正常")])],1)],1)],1),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){return e.resetForm("editForm")}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("editForm")}}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"分配角色",visible:e.roleDialogFormVisible,width:"600px"},on:{"update:visible":function(t){e.roleDialogFormVisible=t}}},[t("el-form",{attrs:{model:e.roleForm}},[t("el-tree",{ref:"roleTree",attrs:{data:e.roleTreeData,"show-checkbox":"","check-strictly":e.checkStrictly,"node-key":"id","default-expand-all":!0,props:e.defaultProps}})],1),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.roleDialogFormVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitRoleHandle("roleForm")}}},[e._v("确 定")])],1)],1)],1)},a=[],r=(s(4114),{name:"User",data(){return{searchForm:{},delBtlStatus:!0,total:0,size:10,current:1,dialogVisible:!1,editForm:{},tableData:[],editFormRules:{username:[{required:!0,message:"请输入用户名称",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"}],status:[{required:!0,message:"请选择状态",trigger:"blur"}]},multipleSelection:[],roleDialogFormVisible:!1,defaultProps:{children:"children",label:"name"},roleForm:{},roleTreeData:[],treeCheckedKeys:[],checkStrictly:!0}},created(){this.getUserList(),this.$axios.get("/sys/role/list").then((e=>{this.roleTreeData=e.data.data.pageData.records}))},methods:{toggleSelection(e){e?e.forEach((e=>{this.$refs.multipleTable.toggleRowSelection(e)})):this.$refs.multipleTable.clearSelection()},handleSelectionChange(e){console.log("勾选"),console.log(e),this.multipleSelection=e,this.delBtlStatus=0==e.length},dateFormat(e){let t=new Date(e),s=t.getFullYear(),l=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,a=t.getDate()<10?"0"+t.getDate():t.getDate();return s+"-"+l+"-"+a},handleSizeChange(e){console.log(`每页 ${e} 条`),this.size=e,this.getUserList()},handleCurrentChange(e){console.log(`当前页: ${e}`),this.current=e,this.getUserList()},resetForm(e){this.$refs[e].resetFields(),this.dialogVisible=!1,this.editForm={}},handleClose(){this.resetForm("editForm")},getUserList(){this.$axios.get("/sys/user/list",{params:{username:this.searchForm.username,current:this.current,size:this.size}}).then((e=>{this.tableData=e.data.data.pageData.records;for(let t=0;t<this.tableData.length;t++)this.tableData[t].created=this.dateFormat(this.tableData[t].created);this.size=e.data.data.pageData.size,this.current=e.data.data.pageData.current,this.total=e.data.data.pageData.total}))},submitForm(e){this.$refs[e].validate((e=>{if(!e)return console.log("error submit!!"),!1;this.$axios.post("/sys/user/"+(this.editForm.id?"update":"save"),this.editForm).then((e=>{this.$message({showClose:!0,message:"恭喜你，操作成功",type:"success",onClose:()=>{this.getUserList()}}),this.editForm={},this.dialogVisible=!1}))}))},editHandle(e){this.$axios.get("/sys/user/info/"+e).then((e=>{this.editForm=e.data.data.info,this.dialogVisible=!0}))},delHandle(e){let t=[];e?t.push(e):this.multipleSelection.forEach((e=>{t.push(e.id)})),console.log(t),this.$axios.post("/sys/user/delete",t).then((e=>{this.$message({showClose:!0,message:"恭喜你，操作成功",type:"success",onClose:()=>{this.getUserList()}})}))},roleHandle(e){this.roleDialogFormVisible=!0,this.$axios.get("/sys/user/info/"+e).then((e=>{console.log(e.data.data.info),this.roleForm=e.data.data.info;let t=[];e.data.data.info.sysRoles.forEach((e=>{t.push(e.id)})),this.$refs.roleTree.setCheckedKeys(t)}))},submitRoleHandle(e){let t=this.$refs.roleTree.getCheckedKeys();console.log(t),this.$axios.post("/sys/user/role/"+this.roleForm.id,t).then((e=>{this.$message({showClose:!0,message:"恭喜你，操作成功",type:"success",onClose:()=>{this.getUserList()}}),this.roleDialogFormVisible=!1}))},repassHandle(e,t){this.$confirm("将重置用户【"+t+"】的密码, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{this.$axios.post("/sys/user/repass",e).then((e=>{this.$message({showClose:!0,message:"恭喜你，操作成功",type:"success",onClose:()=>{}})}))}))}}}),o=r,i=s(1656),n=(0,i.A)(o,l,a,!1,null,"7212425c",null),u=n.exports}}]);
//# sourceMappingURL=689.17618b2a.js.map