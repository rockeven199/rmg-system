<template>
  <div class="w-full h-full">
    <!-- 添加对话框 -->
    <el-dialog title="添加供应商" width="700px" v-model="visible" :draggable="true">
      <el-form ref="form" :model="form" :rules="rules" label-width="130">
        <el-form-item label="供应商编号" prop="suppliers_id">
          <el-input placeholder="自动填写" v-model="form.suppliers_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" prop="suppliers_name">
          <el-input placeholder="请填写供应商名称" :maxLength="20" v-model="form.suppliers_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商国家/地区" prop="suppliers_country" required>
          <el-input placeholder="请填写供应商国家/地区" :maxLength="20" v-model="form.suppliers_country" clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商地址" prop="suppliers_address" required>
          <el-input placeholder="请填写供应商地址" :maxLength="20" v-model="form.suppliers_address" clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商电子邮件" prop="suppliers_email" required>
          <el-input placeholder="请填写供应商电子邮件" :maxLength="20" v-model="form.suppliers_email" clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商联系电话" prop="suppliers_phone">
          <el-input placeholder="请填写供应商电子邮件" :maxLength="20" v-model="form.suppliers_phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商备注" prop="suppliers_description">
          <el-input placeholder="请填写供应商备注" v-model="form.suppliers_description" clearable type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" type="danger" @click="visible = false">取消</el-button>
          <el-button size="small" type="primary" @click="addData">确定</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 表格控制 -->
    <el-row class="w-full my-[5px]">
      <el-row :gutter="0" class="w-full py-[5px]">
        <el-col :span="3" class="ml-[30px]">
          <el-button type="primary" @click="() => { this.visible ? this.visible = false : this.visible = true }"
            size="small">添加供应商</el-button>
          <el-button type="danger" @click="multipleDeleteData" size="small" v-show="delFlag">删除数据</el-button>
        </el-col>
      </el-row>
    </el-row>
    <!-- 数据表格 -->
    <el-table :data="sqlData" :style="{ width: '100%', height: '88%' }" :row-style="{ height: '60px' }" :fit="true"
      :highlight-current-row="true" size="large" v-loading="isLoading" @selection-change="selectRow" empty-text="空数据"
      :border="true" max-height="700px">
      <el-table-column type="selection" :resizable="false" />
      <el-table-column prop="suppliers_id" label="供应商编号" width="130" sortable align="left" />
      <el-table-column prop="suppliers_name" label="供应商名称" align="left" sortable width="300">
        <template #default="scope">
          <el-input v-model="scope.row.suppliers_name" v-if="scope.row.isEdit" @blur="getRow(scope)"></el-input>
          <span v-else>{{ scope.row.suppliers_name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="suppliers_phone" label="供应商联系电话" resizable width="200">
        <template #default="scope">
          <el-input placeholder="请输入供应商联系电话" v-model="scope.row.suppliers_phone" v-if="scope.row.isEdit"
            @blur="getRow(scope)"></el-input>
          <span v-else>{{ scope.row.suppliers_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="suppliers_email" label="供应商联联系邮箱" width="200">
        <template #default="scope">
          <el-input placeholder="请输入供应商联联系邮箱" v-model="scope.row.suppliers_email" v-if="scope.row.isEdit"
            @blur="getRow(scope)"></el-input>
          <span v-else>{{ scope.row.suppliers_email }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="suppliers_country" label="供应商国家/地区" sortable align="left" width="200">
        <template #default="scope">
          <el-input placeholder="请输入供应商联系邮箱" v-model="scope.row.suppliers_country" v-if="scope.row.isEdit"
            @blur="getRow(scope)"></el-input>
          <span v-else>{{ scope.row.suppliers_country }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="suppliers_address" label="供应商地址" align="left" width="200">
        <template #default="scope">
          <el-input placeholder="请输入供应商地址" v-model="scope.row.suppliers_address" v-if="scope.row.isEdit"
            @blur="getRow(scope)"></el-input>
          <span v-else>{{ scope.row.suppliers_address }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="suppliers_description" label="供应商备注" align="left" width="200">
        <template #default="scope">
          <el-input placeholder="请输入供应商供应商备注" v-model="scope.row.suppliers_description" v-if="scope.row.isEdit"
            @blur="getRow(scope)"></el-input>
          <span v-else>{{ scope.row.suppliers_description }}</span>
        </template>
      </el-table-column>
      <!-- 表格操作 -->
      <el-table-column width="200px" label="操作" align="center" fixed="right">
        <template #default="{ row }">
          <el-button type="default" size="small" :plain="true" v-if="row.isEdit == false" @click="edit(row)">
            <Edit theme="outline" size="20" fill="#66b1ff" :plain="true" />
          </el-button>
          <el-button type="default" size="small" v-else @click="edit(row)">
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
      // 提交表单
      form: {
        suppliers_id: "",
        suppliers_address: "",
        suppliers_country: "",
        suppliers_description: "",
        suppliers_email: "",
        suppliers_name: "",
        suppliers_phone: ""
      },
      // 表单验证
      rules: {
        suppliers_name: [
          {
            required: true,
            trigger: "blur",
            message: "请输入供应商名",
          },
        ],
        suppliers_phone: [
          {
            required: true,
            trigger: "blur",
            message: "请输入供应商联系电话",
          },
        ],
        suppliers_email: [
          {
            required: false,
            trigger: "blur",
            message: "请输入电子邮件地址"
          },
        ],
        suppliers_address: [
          {
            required: false,
            trigger: "blur",
            message: "请输入供应商地址"
          },
        ],
        suppliers_country: [
          {
            required: false,
            trigger: "blur",
            message: "请输入供应商国家/地区"
          },
        ]
      },
      // 对话框flag
      visible: false,
      // 表格数据
      sqlData: [],
      // 删除数据按钮flag
      delFlag: false,
      // 加载效果
      isLoading: true,
      // 编辑的行
      nowArr: [],
      // 位置选项
      positionOptions: [],
      // 批量选中的数据
      multipleSelectRowData: [],
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
      this.Form.suppliersName = "";
      this.Form.suppliersStatus = "";
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
          ElMessage.error("添加失败，请填写必填项！")
        } else {
          this.g_reqData("/suppliers/insert_suppliers", "GET", { Authorization: this.$cookies.get("token") }, this.form, null).then((res) => {
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
          this.g_reqData("/suppliers/update_suppliers", "PUT", { Authorization: this.$cookies.get("token") }, item, null).then((res) => {
            this.getData()
          })
        })
      }
    },
    // 临时获取编辑行内容
    getRow(row) {
      let nowEdit = {
        id: "",
        yield: "",
        value: ""
      }
      nowEdit.yield = row.column.property;
      nowEdit.id = row.row.suppliers_id
      nowEdit.value = row.row[row.column.property]
      this.nowArr.push(nowEdit)

    },
    // 请求所有数据
    getData(index_start = 0, index_end = 12) {
      this.g_reqData("/suppliers/select_suppliers", "GET", { Authorization: this.$cookies.get("token") }, { startIndex: index_start, endIndex: index_end }, false).then(res => {
        this.sqlData = res.data
        this.isLoading = false
        res.data.forEach(element => {
          element.isEdit = false
        });
      })
      this.g_reqData("/base/get_data_total_count", "GET", { Authorization: this.$cookies.get("token") }, { type: "suppliers" }, false).then(res => {
        this.totalCount = Number(res.data)
        this.totalPage = Math.ceil(Number(res.data) / 12);
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
        this.g_reqData("/suppliers/delete_suppliers/" + e.suppliers_id, "DELETE", { Authorization: this.$cookies.get("token") }, null, null).then((res) => {
          if (res.code == "200") {
            ElMessage.success("删除成功！");
            this.getData()
          } else {
            ElMessage.error("删除失败，服务器错误！")
          }
        })
      }).catch(e)
    },
    // 获取存放位置
    getOptionsPosition() {
      this.g_reqData("/base/get_position_options", "GET", { Authorization: this.$cookies.get("token") }, { "options_type": "suppliers_position" }, null).then((res) => {
        this.positionOptions = res.data
      })
    },
    // 批量删除选中数据
    multipleDeleteData(e) {
      ElMessageBox.confirm('确认删除选中的所有数据吗?', {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        confirmButtonClass: "dangerButton"
      }).then((value) => {
        this.multipleSelectRowData.forEach((item, index) => {
          this.g_reqData("/suppliers/delete_suppliers/" + item.suppliers_id, "DELETE", { Authorization: this.$cookies.get("token") }, null, null).then((res) => {
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
    // 分页切换
    togglePagination(index) {
      this.getData(index * 12 - 12, (index - 1) * 12 + 12)
    }
  },
  mounted() {
    this.getData(0, 12)
    this.getOptionsPosition()
    this.$store.commit("setSearchType", "suppliers")
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
.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.dangerButton {
  background: #f78989 !important;
  border: 1px solid #f78989 !important;
}
</style>
