<template>
  <div class="w-full h-full">
    <!-- 添加对话框 -->
    <el-dialog title="添加位置" width="700" v-model="visible" :draggable="true">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="位置编号" prop="position_id">
          <el-input placeholder="自动填写" :maxLength="20" v-model="form.position_id" disabled></el-input>
        </el-form-item>
        <el-row :gutter="5">
          <el-col :span="11">
            <el-form-item label="位置名" prop="position_name">
              <el-input placeholder="请填写位置名" :maxLength="20" v-model="form.position_name" clearable
                style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="位置状态" prop="position_state">
              <el-select v-model="form.position_state" placeholder="请选择位置状态" clearable>
                <el-option v-for="item in state" :label="item" :value="item" style="width: 100%;" />
              </el-select>
            </el-form-item></el-col>
        </el-row>
        <el-form-item label="位置描述" prop="position_description">
          <el-input v-model="form.position_desc" :rows="5" type="textarea" placeholder="请选择输入位置描述" />
        </el-form-item>
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
          <el-button type="primary" @click="() => { this.visible ? this.visible = false : this.visible = true }"
            size="small">添加位置</el-button>
          <el-button type="danger" @click="multipleDeleteData" size="small" v-show="delFlag">删除数据</el-button>
        </el-col>
      </el-row>
    </el-row>
    <!-- 数据表格 -->
    <el-table :data="sqlData" :style="{ width: '100%', height: '88%' }" :row-style="{ height: '60px' }" :fit="true"
      :highlight-current-row="true" size="large" v-loading="isLoading" @selection-change="selectRow" :border="true">
      <el-table-column type="selection" :resizable="false" />
      <el-table-column prop="position_id" label="位置编号" width="150" sortable align="left" />
      <el-table-column prop="position_name" label="位置名称" align="left" sortable>
        <template #default="scope">
          <el-input v-model="scope.row.position_name" v-if="scope.row.isEdit" @blur="getRow(scope)"></el-input>
          <span v-else>{{ scope.row.position_name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="position_state" label="位置状态" sortable align="left">
        <template #default="scope">
          <el-select v-model="scope.row.position_state" placeholder="状态" @change="getRow(scope)"
            v-if="scope.row.isEdit">
            <el-option v-for="(item, index) in state" :key="index" :label="item" :value="item"></el-option>
          </el-select>
          <span v-else>{{ scope.row.position_state }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="position_description" label="位置描述" align="left">
        <template #default="scope">
          <el-input v-model="scope.row.position_description" v-if="scope.row.isEdit" @blur="getRow(scope)"></el-input>
          <span v-else>{{ scope.row.position_description }}</span>
        </template>
      </el-table-column>
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
    <div class="w-full flex justify-center fixed bottom-[5px] z-10 left-[-5px]">
      <el-pagination layout="prev, pager, next" :page-count="totalPage" :background="true" :total="totalCount"
        @current-change="togglePagination" />
    </div>
  </div>
</template>
<script>
import { Delete, Edit, Save, Search } from '@icon-park/vue-next';
import { ElDialog, ElMessage, ElMessageBox } from 'element-plus';

export default {
  components: { Delete, Edit, Save, Search },
  data() {
    return {
      // 状态信息
      state: [],
      // 提交表单
      form: {
        position_id: "",
        position_name: "",
        position_state: "",
        position_desc: ""
      },
      // 表单验证
      rules: {
        position_name: [
          {
            required: true,
            trigger: "blur",
            message: "请输入位置名",
          },
        ],
        position_state: [
          {
            required: true,
            trigger: "blur",
            message: "请选择存放位置状态",
          },
        ],
        position_description: [
          {
            required: false,
            trigger: "blur",
            message: "请输入存放位置描述信息",
          },
        ],
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
      search: ""
    };
  },
  methods: {
    // 重置
    reset() {
      this.Form.positionName = "";
      this.Form.positionStatus = "";
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
          this.g_reqData("/position/insert_position", "GET", { Authorization: this.$cookies.get("token") }, this.form, null).then((res) => {
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
      row.isEdit = row.isEdit ? false : true
      if (!row.isEdit) {
        this.nowArr.forEach(item => {
          this.g_reqData("/position/update_position", "PUT", { Authorization: this.$cookies.get("token") }, item, null).then((res) => {
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
      nowEdit.id = row.row.position_id
      nowEdit.value = row.row[row.column.property]
      this.nowArr.push(nowEdit)

    },
    // 数据状态
    tableRowClassName(row) {
      if (row.row.position_state == "正常") { return 'success-row' }
      if (row.row.position_state == "禁用") { return 'danger-row' }
      if (row.row.position_state == "已满") { return 'warning-row' }
      if (row.row.position_state == "空置") { return 'primary-row' }
      // 正常,禁用,已满,空置
    },
    // 请求所有数据
    getData(index_start = 0, index_end = 12) {
      this.g_reqData("/position/select_position", "GET", { Authorization: this.$cookies.get("token") }, { startIndex: index_start, endIndex: index_end }, null, false).then(res => {
        this.sqlData = res.data
        this.isLoading = false

        res.data.forEach(element => {
          element.isEdit = false
        });
      })

      this.g_reqData("/base/get_data_total_count", "GET", { Authorization: this.$cookies.get("token") }, { type: "position" }, false).then(res => {
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
        this.g_reqData("/position/delete_position/" + e.position_name, "DELETE", { Authorization: this.$cookies.get("token") }, null, null).then((res) => {
          if (res.code == "200") {
            ElMessage.success(res.msg);
            this.getData()
          }
          if (res.code == "500") {
            ElMessage.error(res.msg)
          }
        })
      }).catch(e)
    },
    // 获取状态
    getOptionsState() {
      this.g_reqData("/base/get_options", "GET", { Authorization: this.$cookies.get("token") }, { "options_type": "position_state" }, null).then((res) => {
        this.state = res.data[0].position_state.split(",");
      })
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

          this.g_reqData("/position/delete_position/" + item.postiion_name, "DELETE", { Authorization: this.$cookies.get("token") }, null, null).then((res) => {
            if (res.code == "200") {
              ElMessage.success(res.msg);
              this.getData()
            }
            if (res.code == "500") {
              ElMessage.error(res.msg)
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
    this.getData()
    this.getOptionsState()
    this.$store.commit("setSearchType", "position")
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
.el-input__wrapper .el-input__inner {
  text-align: left;
}

.dangerButton {
  background: #f78989 !important;
  border: 1px solid #f78989 !important;
}
</style>
