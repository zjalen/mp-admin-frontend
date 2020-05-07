/**
 * 判断中英文字符总长度
 * 中文占两个
 */
export function getLengthOfStr(str = null) {
  let len = str.length;
  let real_len = 0;
  for(let i=0; i<len; i++) {
      if ((str.charCodeAt(i) & 0xff00) != 0) {
        real_len ++;
      }
    real_len ++;
  }
  return real_len;
}

/**
* [saveAs 下载保存文件]
* @param  {[type]} fileUrl [文件地址]
* @param  {[type]} fileName [文件名称]
*/
export function saveAs(fileUrl, fileName='download') {
  if (window.navigator.msSaveOrOpenBlob) {
    // 兼容IE11 发现在微软在ie10 和ie11中有两个特有的方法：window.navigator.msSaveBlob和window.navigator.msSaveOrOpenBlob 方法，
//这两个方法的区别在于，前者只有保存，后者有保存和打开两个选项，按个人喜好使用就行
    getBlob(fileUrl).then(blob => {
      navigator.msSaveBlob(
        blob,
        decodeURIComponent(
          fileUrl
            .split("?")[1]
            .split("&")[0]
            .split("=")[1]
        )
      );
    });
  } else {
    const link = document.createElement('a')
      link.href = fileUrl
      link.setAttribute('target', '_blank')
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
  }
}

/**
   * [getBlob 获取二进制流]
   * @param  {[String]}     url     [url]
   * @param  {[Blob]}               [文件二进制]
   */
export function getBlob(url) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        }
      };
      xhr.send();
    });
}
