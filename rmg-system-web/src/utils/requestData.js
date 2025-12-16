import addr from "./config";

/**
 * @param {String} dataUrl 请求路径
 * @param {String} method 请求方法
 * @param {Json} reqData 请求数据
 * @param {JSON} header 请求头
 * @param {String} resType 响应数据类型
 * @param {Boolean} showFullData 是否返回完整数据
 */
export function requestData(
  dataUrl,
  method = "GET",
  header = null,
  reqData = "",
  resType,
  showFullData = false
) {
  return new Promise((resolve, reject) => {
    this.axios({
      method: method,
      url: dataUrl,
      headers: header,
      responseType: resType,
      params: reqData,
      baseURL: addr.addr.server_ip,
    })
      .then((result) => {
        showFullData == false ? resolve(result.data) : resolve(result);
        if (result.data.code == 403) {
          this.$router.push("/");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
