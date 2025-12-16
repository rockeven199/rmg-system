<template>
	<div class="w-full h-full relative">
		<!-- 添加对话框 -->
		<el-dialog title="添加采购" width="700" v-model="visible" :draggable="true">
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-row :gutter="5">
					<el-col :span="11">
						<el-form-item label="采购编号" prop="purchase_id">
							<el-input placeholder="自动填写" :maxLength="20" v-model="form.purchase_id" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item label="采购名称" prop="purchase_name">
							<el-input placeholder="请输入采购名称" :maxLength="20" v-model="form.purchase_name"
								clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="11">
						<el-form-item label="采购状态" prop="purchase_state">
							<el-select v-model="form.purchase_state" placeholder="请选择采购状态" clearable class="w-full">
								<el-option v-for="item in state" :label="item" :value="item" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item label="采购数量" prop="purchase_count">
							<el-input-number :min="0" :max="100" :step="1" v-model="form.purchase_count"
								placeholder="请输入采购数量" style="width: 100%;" controls-position="right">
							</el-input-number>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="11">
						<el-form-item label="开始时间" prop="purchase_start_time">
							<el-date-picker type="date" v-model="form.purchase_start_time" format="YYYY-MM-DD"
								value-format="YYYY-MM-DD" clearable></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item label="结束时间" prop="purchase_end_time">
							<el-date-picker type="date" v-model="form.purchase_end_time" format="YYYY-MM-DD"
								value-format="YYYY-MM-DD" clearable></el-date-picker>
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
						size="small">添加采购</el-button>
					<el-button type="danger" @click="multipleDeleteData" size="small" v-show="delFlag">删除数据</el-button>
				</el-col>
			</el-row>
		</el-row>
		<!-- 数据表格 -->
		<el-table :data="sqlData" :style="{ width: '100%', height: '88%' }" :row-style="{ height: '60px' }" :fit="true"
			:highlight-current-row="true" size="large" v-loading="isLoading" @selection-change="selectRow"
			:row-class-name="tableRowClassName" :border="true" max-height="700px">
			<el-table-column type="selection" :resizable="false" />
			<el-table-column prop="purchase_id" label="采购编号" width="120" sortable align="left" />
			<el-table-column prop="purchase_name" label="采购名称" width="250" align="left">
				<template #default="scope">
					<el-input v-model="scope.row.purchase_name" v-if="scope.row.isEdit"
						@blur="getRow(scope)"></el-input>
					<span v-else>{{ scope.row.purchase_name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="purchase_count" label="采购数量" width="250" align="left">
				<template #default="scope">
					<el-input-number :min="0" :max="5000" :step="1" v-model="scope.row.purchase_count"
						placeholder="请输入采购数量" style="width: 200px;" v-if="scope.row.isEdit">
					</el-input-number>
					<span v-else>{{ scope.row.purchase_count }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="purchase_start_time" label="开始时间" width="250" align="left">
				<template #default="scope">
					<el-date-picker type="date" v-model="scope.row.purchase_start_time" v-if="scope.row.isEdit"
						format="YYYY-MM-DD" value-format="YYYY-MM-DD" clearable @blur="getRow(scope)"></el-date-picker>
					<span v-else>{{ scope.row.purchase_start_time }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="purchase_end_time" label="结束时间" width="250" align="left">
				<template #default="scope">
					<el-date-picker type="date" v-model="scope.row.purchase_end_time" v-if="scope.row.isEdit"
						format="YYYY-MM-DD" value-format="YYYY-MM-DD" clearable @blur="getRow(scope)"></el-date-picker>
					<span v-else>{{ scope.row.purchase_end_time }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="purchase_state" label="采购状态" width="200" align="left">
				<template #default="scope">
					<el-select v-model="scope.row.purchase_state" placeholder="请选择采购状态" @change="getRow(scope)"
						v-if="scope.row.isEdit">
						<el-option v-for="(item, index) in state" :key="index" :label="item" :value="item"></el-option>
					</el-select>
					<span v-else>{{ scope.row.purchase_state }}</span>
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
		<div class="w-full absolute bottom-0 flex justify-center z-[5] py-[10px]">
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
			// 采购状态
			state: [],
			// 提交表单
			form: {},
			// 表单验证
			rules: {
				purchase_name: [{ required: true, trigger: "blur", message: "请输入采购名称" }],
				purchase_count: [{ required: true, trigger: "blur", message: "请选择采购数量" }],
				purchase_start_time: [{ required: true, trigger: "blur", message: "请输入采购开始时间" }],
				purchase_end_time: [{ required: true, trigger: "blur", message: "请输入采购结束时间" }],
				purchase_state: [{ required: true, trigger: "blur", message: "请选择采购状态" }],
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
			total: 0,
			// 数据总量
			totalCount: 0,
			// 分页总量
			totalPage: 0,
			// 关键字搜索
			search: ""
		};
	},
	methods: {
		// 重置
		reset() {
			this.Form.purchaseName = "";
			this.Form.purchaseStatus = "";
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
					this.g_reqData("/purchase/insert_purchase", "GET", { Authorization: this.$cookies.get("token") }, this.form, null).then((res) => {
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
					this.g_reqData("/purchase/update_purchase", "PUT", { Authorization: this.$cookies.get("token") }, item, null).then((res) => {
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
					this.g_reqData("/purchase/update_purchase", "PUT", { Authorization: this.$cookies.get("token") }, item, null).then((res) => {
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
			nowEdit.id = row.row.purchase_id
			nowEdit.value = row.row[row.column.property]
			this.nowArr.push(nowEdit)

		},
		// 数据状态
		tableRowClassName(row) {
			if (row.row.purchase_state == "正常") { return 'success-row' }
			if (row.row.purchase_state == "禁用") { return 'danger-row' }
			if (row.row.purchase_state == "已满") { return 'warning-row' }
			if (row.row.purchase_state == "空置") { return 'primary-row' }
			// 正常,禁用,已满,空置
		},
		// 请求所有数据
		getData(index_start = 0, index_end = 12) {
			this.g_reqData("/purchase/select_purchase", "GET", { Authorization: this.$cookies.get("token") }, { startIndex: index_start, endIndex: index_end }, null).then(res => {
				this.sqlData = res.data
				this.isLoading = false
				res.data.forEach(element => {
					element.isEdit = false
				});
				this.g_reqData("/base/get_data_total_count", "GET", { Authorization: this.$cookies.get("token") }, { type: "purchase" }, false).then(res => {
					this.totalCount = Number(res.data)
					this.totalPage = Math.ceil(Number(res.data) / 12);
				})
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
				this.g_reqData("/purchase/delete_purchase/" + e.purchase_id, "DELETE", { Authorization: this.$cookies.get("token") }, null, null).then((res) => {
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

				this.multipleSelectRowData.forEach((item, index) => {
					this.g_reqData("/purchase/delete_purchase/" + item.purchase_id, "DELETE", { Authorization: this.$cookies.get("token") }, null, null).then((res) => {
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
		getState() {
			this.g_reqData("/base/get_options", "GET", { Authorization: this.$cookies.get("token") }, { "options_type": "purchase_state" }, null, false).then((res) => {
				this.state = res.data[0].purchase_state.split(",");
			})
		},
		// 分页切换
		togglePagination(index) {
			this.getData(index * 12 - 12, (index - 1) * 12 + 12)
		},
	},
	mounted() {
		this.getData(0, 12)
		this.getState()
		this.g_getCount("purchase").then(res => {
			this.total = Number(res)
		})
		this.$store.commit("setSearchType", "purchase")
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
		setResult(n, o) {
			this.sqlData = n
		},
		setKeywordIsNull(n, o) {
			if (n == true) {
				this.getData()
			}
		}
	},
	beforeMount() {
		this.g_checkLogin()
	}
};
</script>
<style>
.dangerButton {
	background: #f78989 !important;
	border: 1px solid #f78989 !important;
}
</style>