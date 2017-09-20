/**
 * Created by liw on 2017/9/19.
 */
export default class Smaller {
  /*
   * option {
   *   src: 图片地址
   *   file: 文件对象
   *   el: input[file]节点
   *   scale: 压缩比例 0 - 1
   * }
   * */
  constructor(option = {}) {
    this.src = option.src
    this.file = option.file
    this.el = option.el
    this.scale = option.scale || 1
    this.success = option.success
    if (!this.src && !this.el && !this.file) return {}
    this.init()
  }

  init() {
    this.src ? this.compressImg(this.src) : (this.file ? this.fileReader(this.file) : this.fileReader(this.getFile(this.el)))
  }

  getFile(el) {
    let file
    try {
      if (el.files && el.files[0]) {
        file = el.files[0]
      } else if (el.files && el.files.item(0)) {
        file = el.files.item(0)
      }
      return file
    } catch (e) {
      console.log(e)
    }
  }

  fileReader(file) {
    let src = ''
    try {
      try {
        src = file.getAsDataURL()
      } catch (e) {
        src = window.URL.createObjectURL(file)
      }
      this.compressImg(src)
    } catch (e) {
      try {
        let reader = new FileReader();
        reader.onload = (e) => {
          src = e.target.result
          this.compressImg(src)
        }
        reader.readAsDataURL(file)
      } catch (e) {
        console.log(e)
      }
    }
  }

  compressImg(src) {
    var image = new Image(),
      canvas = document.createElement("canvas"),
      ctx = canvas.getContext('2d')
    image.src = src
    image.onload = () => {
      const w = image.naturalWidth,
        h = image.naturalHeight
      canvas.width = w
      canvas.height = h
      ctx.drawImage(image, 0, 0, w, h, 0, 0, w, h)
      let dataURL = canvas.toDataURL("image/jpeg", this.scale)
      let data = dataURL.split(',')[1]
      data = window.atob(data)
      let ia = new Uint8Array(data.length)
      for (var i = 0; i < data.length; i++)
        ia[i] = data.charCodeAt(i)
      let blob = new Blob([ia], {type: "image/jpeg"})
      if (this.success) this.success({url: dataURL, file: blob})
    }
  }
}
