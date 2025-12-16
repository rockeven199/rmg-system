<template>
	<div class="w-full h-full relative">
		<!-- 添加对话框 -->
		<el-dialog title="添加员工" width="900" v-model="visible" :draggable="true">
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-row :gutter="5">
					<el-col :span="24">
						<el-form-item label="员工编号" prop="employee_id">
							<el-input placeholder="自动填写" :maxLength="20" v-model="form.employee_id" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="11">
						<el-form-item label="员工名称" prop="employee_name">
							<el-input placeholder="请输入员工名" :maxLength="20" v-model="form.employee_name"
								clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item label="员工年龄" prop="employee_age">
							<el-input-number :min="18" :max="100" :step="1" v-model="form.employee_age"
								placeholder="请输入年龄" style="width: 100%;" controls-position="right">
							</el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="11">
						<el-form-item label="员工性别" prop="employee_sex">
							<el-select v-model="form.employee_sex" placeholder="请选择员工性别" clearable class="w-full">
								<el-option v-for="item in sex" :label="item" :value="item" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item label="联系地址" prop="employee_address">
							<el-input v-model="form.employee_address" placeholder="请输入联系地址" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="11">
						<el-form-item label="一级部门" prop="employee_department">
							<el-select v-model="form.employee_department" placeholder="请选择一级部门" clearable
								class="w-full">
								<el-option v-for="(item, index) in this.firstDepartment" :key="index" :label="item"
									:value="item">{{ item }}
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item label="二级部门" prop="employee_second_department">
							<el-select v-model="form.employee_second_department" placeholder="请选择二级部门" clearable
								class="w-full">
								<el-option v-for="(item, index) in this.secondDepartment" :key="index" :label="item"
									:value="item">{{ item }}
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="11">
						<el-form-item label="工作时长" prop="employee_worked_time">
							<el-input v-model="form.employee_worked_time" placeholder="请输入工作时长" />
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item label="职位/岗位" prop="employee_job" label-width="85">
							<el-input v-model="form.employee_job" placeholder="请输入职位/岗位" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="11">
						<el-form-item label="员工等级" prop="employee_level">
							<el-select v-model="form.employee_level" placeholder="请选择员工等级" clearable class="w-full">
								<el-option v-for="(item, index) in this.employeeLevel" :key="index" :label="item"
									:value="item">{{ item }}
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item label="手机号码" prop="employee_phone">
							<el-input-number style="width: 100%;" :controls="false" v-model="form.employee_phone"
								placeholder="请输入手机号码"></el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="11">
						<el-form-item label="证件号" prop="employee_card_id">
							<el-input-number style="width: 100%;" :controls="false" v-model="form.employee_card_id"
								placeholder="请输入证件号"></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item label="电子邮件" prop="employee_email">
							<el-input v-model="form.employee_email" placeholder="请输入电子邮件" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button size="small" type="danger" @click="visible = false">取消</el-button>
					<el-button size="small" type="primary" @click="addData">确定</el-button>
				</div>
			</template>
		</el-dialog>
		<!-- 删除数据对话框 -->
		<el-dialog v-model="delDialog" title="删除数据" width="500px">
			<main>确认删除选中的数据？</main>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="default" @click="delDialog = false">取消</el-button>
					<el-button type="danger" @click="delDialog = false"> 确定 </el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 表格控制 -->
		<el-row class="w-full my-[5px]">
			<el-row :gutter="0" class="w-full py-[5px]">
				<el-col :span="3" class="ml-[30px]">
					<el-button type="primary"
						@click="() => { this.visible ? this.visible = false : this.visible = true }"
						size="small">添加员工</el-button>
					<el-button type="danger" @click="multipleDeleteData" size="small" v-show="delFlag">删除数据</el-button>
				</el-col>
			</el-row>
		</el-row>
		<!-- 数据表格 -->
		<el-table :data="sqlData" :style="{ width: '100%', height: '88%' }" :row-style="{ height: '60px' }" :fit="true"
			:highlight-current-row="true" size="large" v-loading="isLoading" @selection-change="selectRow"
			:border="true" max-height="700px">
			<el-table-column type="selection" :resizable="false" />
			<el-table-column prop="employee_id" label="员工编号" width="150" sortable align="left" />
			<el-table-column prop="employee_name" label="员工名称" width="200" align="left">
				<template #default="scope">
					<el-input v-model="scope.row.employee_name" v-if="scope.row.isEdit"
						@blur="getRow(scope)"></el-input>
					<span v-else>{{ scope.row.employee_name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="employee_age" label="员工年龄" width="130" align="left">
				<template #default="scope">
					<el-input v-model="scope.row.employee_age" v-if="scope.row.isEdit" @blur="getRow(scope)"></el-input>
					<span v-else>{{ scope.row.employee_age }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="employee_sex" label="员工性别" width="130" sortable align="left">
				<template #default="scope">
					<el-select v-model="scope.row.employee_sex" placeholder="employee_sex" @change="getRow(scope)"
						v-if="scope.row.isEdit">
						<el-option v-for="(item, index) in sex" :key="index" :label="item" :value="item"></el-option>
					</el-select>
					<span v-else>{{ scope.row.employee_sex }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="employee_address" label="联系地址" width="200" align="left">
				<template #default="scope">
					<el-input v-model="scope.row.employee_address" v-if="scope.row.isEdit"
						@blur="getRow(scope)"></el-input>
					<span v-else>{{ scope.row.employee_address }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="employee_worked_time" label="工作时长" width="130" align="left">
				<template #default="scope">
					<el-input v-model="scope.row.employee_worked_time" v-if="scope.row.isEdit"
						@blur="getRow(scope)"></el-input>
					<span v-else>{{ scope.row.employee_worked_time }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="employee_department" label="一级部门" width="200" align="left">
				<template #default="scope">
					<el-select v-model="scope.row.employee_department" placeholder="请选择" v-if="scope.row.isEdit" @blur="getRow(scope)">
						<el-option v-for="item in firstDepartment"
						:value="item">
						{{ item }}
						</el-option>>
					</el-select>
					<span v-else>{{ scope.row.employee_department }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="employee_second_department" label="二级部门" width="200" align="left">
				<template #default="scope">
					<el-select placeholder="" v-model="scope.row.employee_second_department" v-if="scope.row.isEdit"
						@blur="getRow(scope)">
					  <el-option
						v-for="item in secondDepartment"
						:value="item"
					  >	{{ item }}</el-option>
					</el-select>
					<span v-else>{{ scope.row.employee_second_department }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="employee_job" label="职位/岗位" width="130" align="left">
				<template #default="scope">
					<el-input v-model="scope.row.employee_job" v-if="scope.row.isEdit" @blur="getRow(scope)"></el-input>
					<span v-else>{{ scope.row.employee_job }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="employee_level" label="员工等级" width="130" align="left">
				<template #default="scope">
					<el-input v-model="scope.row.employee_level" v-if="scope.row.isEdit"
						@blur="getRow(scope)"></el-input>
					<span v-else>{{ scope.row.employee_level }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="employee_phone" label="手机号码" width="130" align="left">
				<template #default="scope">
					<el-input v-model="scope.row.employee_phone" v-if="scope.row.isEdit"
						@blur="getRow(scope)"></el-input>
					<span v-else>{{ scope.row.employee_phone }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="employee_card_id" label="证件号" width="200" align="left">
				<template #default="scope">
					<el-input v-model="scope.row.employee_card_id" v-if="scope.row.isEdit"
						@blur="getRow(scope)"></el-input>
					<span v-else>{{ scope.row.employee_card_id }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="employee_email" label="电子邮件" width="200" align="left">
				<template #default="scope">
					<el-input v-model="scope.row.employee_email" v-if="scope.row.isEdit"
						@blur="getRow(scope)"></el-input>
					<span v-else>{{ scope.row.employee_email }}</span>
				</template>
			</el-table-column>
			<!-- 操作列 -->
			<el-table-column width="200px" label="操作" align="center" fixed="right">
				<template #default="{ row }">
					<el-button type="default" size="small" :plain="true" v-if="row.isEdit == false" @click="edit(row)">
						<Edit theme="outline" size="20" fill="#66b1ff" :plain="true" />
					</el-button>
					<el-button type="default" size="small" v-else @click="editRowData(row)">
						<Save theme="outline" size="20" fill="#66b1ff" :plain="true" />
					</el-button>
					<el-button type="default" size="small" :plain="true">
						<Delete theme="outline" size="20" fill="#f78989" @click="deleteRowData(row)" />
					</el-button>
				</template>
			</el-table-column>
			<template #empty>
				未查询到数据
			</template>
		</el-table>
		<div class="w-[95.5%] absolute bottom-0 flex justify-center z-[5] py-[10px]">
			<el-pagination layout="prev, pager, next" :page-count="totalPage" :background="true" :total="totalCount"
				@current-change="togglePagination" />
		</div>
	</div>
</template>
<script>
import { Delete, Edit, Save } from '@icon-park/vue-next';
import { ElDialog, ElMessage, ElMessageBox } from 'element-plus';

export default {
	components: { Delete, Edit, Save },
	data() {
		return {
			// 性别
			sex: [],
			// 提交表单
			form: {},
			// 表单验证
			rules: {
				employee_name: [{ required: true, trigger: "blur", message: "请输入员工姓名" }],
				employee_age: [{ required: true, trigger: "blur", message: "请输入员工年龄" }],
				employee_sex: [{ required: true, trigger: "blur", message: "请选择员工性别" }],
				employee_address: [{ required: true, trigger: "blur", message: "请输入联系地址" }],
				employee_worked_time: [{ required: true, trigger: "blur", message: "请输入工作时长" }],
				employee_department: [{ required: true, trigger: "blur", message: "请选择主管部门" }],
				employee_second_department: [{ required: true, trigger: "blur", message: "请选择下级部门" }],
				employee_job: [{ required: true, trigger: "blur", message: "请输入职位/岗位" }],
				employee_level: [{ required: true, trigger: "blur", message: "请选择员工" }],
				employee_phone: [{ required: true, trigger: "blur", message: "请输入手机号" }],
				employee_card_id: [{ required: true, trigger: "blur", message: "请输入证件号" }],
				employee_email: [{ required: true, trigger: "blur", message: "请输入电子邮件" }],
			},
			// 对话框flag
			visible: false,
			// 表格数据
			sqlData: [],
			// 删除对话框flag
			delDialog: false,
			// 删除数据按钮flag
			delFlag: false,
			// 加载效果
			isLoading: true,
			// 编辑的行
			nowArr: [],
			// 批量选中的数据
			multipleSelectRowData: [],
			// 数据总量
			totalCount: 0,
			// 分页总量
			totalPage: 0,
			// 关键字搜索
			search: "",
			// 员工等级
			employeeLevel: [],
			// 一级部门
			firstDepartment: [],
			// 二级部门
			secondDepartment: []
		};
	},
	methods: {
		// 重置
		reset() {
			this.Form.employeeName = "";
			this.Form.employeeStatus = "";
		},
		// 选中表格数据
		selectRow(value) {
			this.multipleSelectRowData = value;
			value.length ? this.delFlag = true : this.delFlag = false
		},
		// 添加数据
		addData() {
			this.$refs.form.validate((a, b) => {
				if (a == false) {
					ElMessage.error("添加失败，请输入必填项！")
				} else {
					this.g_reqData("/employee/insert_employee", "GET", { Authorization: this.$cookies.get("token") }, this.form, null).then((res) => {
						if (res.code == "200") {
							ElMessage.success("添加成功！");
							this.visible = false
							this.getData()
						} else {
							ElMessage.success("添加失败，服务器错误！")
						}
					})
				}
			})
		},
		// 编辑数据
		edit(row) {
			row.isEdit = row.isEdit == true ? false : true
			if (!row.isEdit) {
				this.nowArr.forEach(item => {
					this.g_reqData("/employee/update_employee", "PUT", { Authorization: this.$cookies.get("token") }, item, null).then((res) => {
						this.getData()
					})
				})
			}
		},
		// 编辑数据
		editRowData(row) {
			row.isEdit = row.isEdit == true ? false : true
			if (!row.isEdit) {
				this.nowArr.forEach(item => {
					this.g_reqData("/employee/update_employee", "PUT", { Authorization: this.$cookies.get("token") }, item, null).then((res) => {
						this.getData()
					})
				})
			}
		},
		// 获取编辑行内容
		getRow(row) {
			let nowEdit = {
				id: "",
				yield: "",
				value: ""
			}
			nowEdit.yield = row.column.property;
			nowEdit.id = row.row.employee_id
			nowEdit.value = row.row[row.column.property]
			this.nowArr.push(nowEdit)

		},
		// 请求所有数据
		getData(index_start = 0, index_end = 12) {
			this.g_reqData("/employee/select_employee", "POST", { Authorization: this.$cookies.get("token") }, { startIndex: index_start, endIndex: index_end }, null).then(res => {
				this.sqlData = res.data
				this.isLoading = false
				this.totalCount = res.data.length
				res.data.forEach(element => {
					element.isEdit = false
				});
				if (res.data.length % 12) {
					this.pageCount = res.data.length / 12
				} else {
					this.pageCount = (res.data.length / 12) + 1
				}
			})
		},
		// 删除数据
		deleteRowData(e) {
			ElMessageBox.confirm("确定删除选中的数据吗？", {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning",
				confirmButtonClass: "dangerButton"
			}).then(() => {
				this.g_reqData("/employee/delete_employee/" + e.employee_id, "DELETE", { Authorization: this.$cookies.get("token") }, null, null).then((res) => {
					if (res.code == "200") {
						ElMessage.success("删除成功！");
						this.getData()
					} else {
						ElMessage.error("删除失败，服务器错误！")
					}
				})
			}).catch(e)
		},
		// 批量删除确认框
		multipleDeleteData(e) {
			ElMessageBox.confirm('确认删除选中的所有数据吗?', {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning",
				confirmButtonClass: "dangerButton"
			}).then((value) => {
				// 批量删除数据
				this.multipleSelectRowData.forEach((item, index) => {
					this.g_reqData("/employee/delete_employee/" + item.employee_id, "DELETE", { Authorization: this.$cookies.get("token") }, null, null).then((res) => {
						if (res.code == "200") {
							this.getData()
						} else {
							ElMessage.error("删除失败，服务器错误！")
						}
					})

					if (index == (this.multipleSelectRowData.length - 1)) {
						ElMessage.success("删除成功！")
					}
				})

			}).catch(e)

		},
		// 获取性别
		getSex() {
			this.g_reqData("/base/get_options", "GET", { Authorization: this.$cookies.get("token") }, { "options_type": "person_sex" }, null).then((res) => {
				this.sex = res.data[0].person_sex.split(",");
			})
		},
		// 分页切换
		togglePagination(index) {
			this.getData(index * 12 - 12, (index - 1) * 12 + 12)
		},
		// 查询员工等级
		getEmployeeLevel() {
			this.g_reqData("/base/get_options", "GET", { Authorization: this.$cookies.get("token") }, { "options_type": "employee_level" }, null).then((res) => {
				this.employeeLevel = res.data[0].employee_level.split(",")
			})
		},
		// 查询一级部门
		getFirstDepartment() {
			this.g_reqData("/base/get_options", "GET", { Authorization: this.$cookies.get("token") }, { "options_type": "top_department" }, null).then((res) => {
				this.firstDepartment = res.data[0].top_department.split(",")
			})
		},
		// 查询二级部门
		getSecondDepartment() {
			this.g_reqData("/base/get_options", "GET", { Authorization: this.$cookies.get("token") }, { "options_type": "sub_department" }, null).then((res) => {
				this.secondDepartment = res.data[0].sub_department.split(",")
			})
		},
	},
	mounted() {
		this.getData(0, 12)
		this.getSex()
		this.getEmployeeLevel()
		this.getFirstDepartment()
		this.getSecondDepartment()
		this.$store.commit("setSearchType", "employee")
		this.$store.commit("setEnableSearch", true)
	},
	beforeUnmount() {
		this.$store.commit("setEnableSearch", false);
	},
	computed: {
		setResult() {
			return this.$store.state.resultData
		},
		setKeywordIsNull() {
			return this.$store.state.keywordIsNull
		}
	},
	watch: {
		// 监听搜索返回内容项
		setResult(n, o) {
			this.sqlData = n

		},
		// 监听关键字是否为空
		setKeywordIsNull(n, o) {
			if (n == true) {
				this.getData()
			}
		}
	},
	beforeMount() {
		// 登录验证
		this.g_checkLogin()
	}
};
</script>
<style>
.el-input__wrapper .el-input__inner {
	text-align: left;
}

.dangerButton {
	background: #f78989 !important;
	border: 1px solid #f78989 !important;
}
</style>