<template>
  <div class="w-full h-full">
    <!-- 添加对话框 -->
    <el-dialog title="添加资产" width="700px" v-model="visible" :draggable="true">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="资产编号" prop="resource_id">
          <el-input placeholder="自动填写" :maxLength="20" v-model="form.resource_id" disabled></el-input>
        </el-form-item>
        <el-row :gutter="5">
          <el-col :span="11">
            <el-form-item label="资产名" prop="resource_name">
              <el-input placeholder="请填写资产名称" :maxLength="20" v-model="form.resource_name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="资产数量" prop="resource_count" required>
              <el-input-number placeholder="请设置资产数量" :model-value="Number(form.resource_count)"
                v-model="form.resource_count" style="width: 100%;" :min="0" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="11">
            <el-form-item label="资产状态" prop="resource_state">
              <el-select v-model="form.resource_state" placeholder="请选择资产状态" clearable>
                <el-option v-for="item in state" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="存放位置" prop="resource_position" required>
              <el-select v-model="form.resource_position" placeholder="请选择资产位置" clearable>
                <el-option v-for="(item, index) in positionOptions" :key="index" :label="item.position_name"
                  :value="item.position_name"
                  :disabled="(item.position_state_code == '禁用' || item.position_state_code == '已满') ? true : false"></el-option>
              </el-select>
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
          <el-button type="primary" @click="() => { this.visible ? this.visible = false : this.visible = true }"
            size="small">添加资产</el-button>
          <el-button type="danger" @click="deleteData" size="small" v-show="delFlag">删除数据</el-button>
        </el-col>
      </el-row>
    </el-row>
    <!-- 数据表格 -->
    <el-table :data="sqlData" :style="{ width: '100%', height: '88%' }" :row-style="{ height: '60px' }" :fit="true"
      :highlight-current-row="true" size="large" v-loading="isLoading" @selection-change="selectRow" :border="true">
      <el-table-column type="selection" />
      <el-table-column prop="resource_id" label="资产编号" sortable align="left" />
      <el-table-column prop="resource_name" label="资产名称" align="left">
        <template #default="scope">
          <el-input v-model="scope.row.resource_name" v-if="scope.row.isEdit" @blur="getRow(scope)"></el-input>
          <span v-else>{{ scope.row.resource_name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="resource_count" label="资产数量">
        <template #default="scope">
          <el-input-number placeholder="请设置资产数量" :model-value="scope.row.resource_count"
            v-model="scope.row.resource_count" v-if="scope.row.isEdit" class="w-full" style="width: 100%;"
            @change="getRow(scope)"></el-input-number>
          <span v-else>{{ scope.row.resource_count }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="resource_state" label="资产状态" sortable align="left">
        <template #default="scope">
          <el-select v-model="scope.row.resource_state" placeholder="请选择资产状态" @change="getRow(scope)"
            v-if="scope.row.isEdit">
            <el-option v-for="(item, index) in state" :key="index" :label="item" :value="item"></el-option>
          </el-select>
          <span v-else>{{ scope.row.resource_state }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="resource_position" label="存放位置" align="left">
        <template #default="scope">
          <el-select v-model="scope.row.resource_position" placeholder="请选择资产位置" @change="getRow(scope)"
            v-if="scope.row.isEdit">
            <el-option v-for="(item, index) in positionOptions" :key="index" :label="item.position_name"
              :value="item.position_name"></el-option>
          </el-select>
          <span v-else>{{ scope.row.resource_position }}</span>
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
import { Delete, Edit, Save } from '@icon-park/vue-next';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
  components: { Delete, Edit, Save },
  data() {
    return {
      // 状态信息
      state: ["正常", "已满", "警告", "启用", "禁用"],
      // 提交表单
      form: {
        resource_id: "",
        resource_name: "",
        resource_state: "",
        resource_count: 0,
        resource_position: ""
      },
      // 表单验证
      rules: {
        resource_name: [
          {
            required: true,
            trigger: "blur",
            message: "请输入资产名",
          },
        ],
        resource_state: [
          {
            required: true,
            trigger: "blur",
            message: "请选择存放资产状态",
          },
        ],
        resource_count: [
          {
            required: false,
            trigger: "blur",
            message: "请设置资产数量"
          },
        ],
        resource_position: [
          {
            required: false,
            trigger: "blur",
            message: "请选择资产位置"
          },
        ]
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
      // 位置选项
      positionOptions: [],
      // 数据总量
      totalCount: 0,
      // 分页总量
      totalPage: 0,
      // 分页索引缓存
      cacheIndex: 0
    };
  },
  methods: {
    // 重置
    reset() {
      this.Form.resourceName = "";
      this.Form.resourceStatus = "";
    },
    // 选中表格数据
    selectRow(value) {
      value.length ? this.delFlag = true : this.delFlag = false
    },
    // 删除选中数据
    deleteData() {
      this.delDialog = true
    },
    // 添加数据
    addData() {
      this.$refs.form.validate((a, b) => {
        if (a == false) {
          ElMessage.error("添加失败，请填写必填项！")
        } else {
          this.g_reqData("/resource/insert_resource", "GET", { Authorization: this.$cookies.get("token") }, this.form, null).then((res) => {
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
          this.g_reqData("/resource/update_resource", "PUT", { Authorization: this.$cookies.get("token") }, item, null).then((res) => {
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
      nowEdit.id = row.row.resource_id
      nowEdit.value = row.row[row.column.property]
      this.nowArr.push(nowEdit)

    },
    // 请求数据
    getData(index_start = 0, index_end = 12) {
      this.g_reqData("/resource/select_resource", "GET", { Authorization: this.$cookies.get("token") }, { startIndex: index_start, endIndex: index_end }, null, false).then(res => {
        this.sqlData = res.data
        this.isLoading = false
        res.data.forEach(element => {
          element.isEdit = false
          element.resource_count = Number(element.resource_count)
        });
      })
      this.g_reqData("/base/get_data_total_count", "GET", { Authorization: this.$cookies.get("token") }, { type: "resource" }, false).then(res => {
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
        this.g_reqData("/resource/delete_resource/" + e.resource_id, "DELETE", { Authorization: this.$cookies.get("token") }, null, null).then((res) => {
          if (res.code == "200") {
            ElMessage.success("删除成功！");
            this.getData()
          } else {
            ElMessage.error("删除失败，服务器错误！")
          }
        })
      }).catch(e)
    },
    // 获取状态
    getOptionsState() {
      this.g_reqData("/base/get_options", "GET", { Authorization: this.$cookies.get("token") }, { "options_type": "resource_state" }, null).then((res) => {
        this.state = res.data[0].resource_state.split(",");
      })
    },
    // 获取存放位置
    getOptionsPosition() {
      this.g_reqData("/base/get_position_options", "GET", { Authorization: this.$cookies.get("token") }, null, null).then((res) => {
        this.positionOptions = res.data
      })
    },
    // 分页切换
    togglePagination(index) {
      this.getData(index * 12 - 12, (index - 1) * 12 + 12)
      this.cacheIndex = index
    },
  },
  mounted() {
    this.getData()
    this.getOptionsState()
    this.getOptionsPosition()
    this.$store.commit("setSearchType", "resource")
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
