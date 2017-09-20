(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Smaller = mod.exports.default;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Smaller = function () {
    /*
     * option {
     *   src: 图片地址
     *   file: 文件对象
     *   el: input[file]节点
     *   scale: 压缩比例 0 - 1
     * }
     * */
    function Smaller() {
      var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Smaller);

      this.src = option.src;
      this.file = option.file;
      this.el = option.el;
      this.scale = option.scale || 1;
      this.success = option.success;
      if (!this.src && !this.el && !this.file) return {};
      this.init();
    }

    _createClass(Smaller, [{
      key: 'init',
      value: function init() {
        this.src ? this.compressImg(this.src) : this.file ? this.fileReader(this.file) : this.fileReader(this.getFile(this.el));
      }
    }, {
      key: 'getFile',
      value: function getFile(el) {
        var file = void 0;
        try {
          if (el.files && el.files[0]) {
            file = el.files[0];
          } else if (el.files && el.files.item(0)) {
            file = el.files.item(0);
          }
          return file;
        } catch (e) {
          console.log(e);
        }
      }
    }, {
      key: 'fileReader',
      value: function fileReader(file) {
        var _this = this;

        var src = '';
        try {
          try {
            src = file.getAsDataURL();
          } catch (e) {
            src = window.URL.createObjectURL(file);
          }
          this.compressImg(src);
        } catch (e) {
          try {
            var reader = new FileReader();
            reader.onload = function (e) {
              src = e.target.result;
              _this.compressImg(src);
            };
            reader.readAsDataURL(file);
          } catch (e) {
            console.log(e);
          }
        }
      }
    }, {
      key: 'compressImg',
      value: function compressImg(src) {
        var _this2 = this;

        var image = new Image(),
            canvas = document.createElement("canvas"),
            ctx = canvas.getContext('2d');
        image.src = src;
        image.onload = function () {
          var w = image.naturalWidth,
              h = image.naturalHeight;
          canvas.width = w;
          canvas.height = h;
          ctx.drawImage(image, 0, 0, w, h, 0, 0, w, h);
          var dataURL = canvas.toDataURL("image/jpeg", _this2.scale);
          var data = dataURL.split(',')[1];
          data = window.atob(data);
          var ia = new Uint8Array(data.length);
          for (var i = 0; i < data.length; i++) {
            ia[i] = data.charCodeAt(i);
          }var blob = new Blob([ia], { type: "image/jpeg" });
          if (_this2.success) _this2.success({ url: dataURL, file: blob });
        };
      }
    }]);

    return Smaller;
  }();

  exports.default = Smaller;
});
