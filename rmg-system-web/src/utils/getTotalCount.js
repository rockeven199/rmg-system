import addr from "./config";
/**
 *
 * @param {String} yield_type 查询种类
 * @returns 返回数据内容
 */
export function getTotalCount(yield_type) {
  return new Promise((resolve, reject) => {
    this.axios({
      method: "GET",
      url: "/base/get_data_total_count?type=" + yield_type,
      headers: { Authorization: this.$cookies.get("token") },
      baseURL: addr.addr.server_ip,
    })
      .then((result) => {
        resolve(result.data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
