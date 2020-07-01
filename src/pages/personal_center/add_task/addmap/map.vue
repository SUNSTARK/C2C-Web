<template>
  <div style="width: 550px;height: 390px">
    <el-form ref="addForm" v-model="addForm" :rules="addRules">
      <el-form-item label="任务地址：" prop="sname" s>
        <el-input id="sname" v-model.trim="addForm.sname" type="text"
                  @input="placeAutoInput('sname')" @keyup.delete.native="deletePlace('sname')"
                  placeholder="请输入任务地址">
          <i class="el-icon-location-outline el-input__icon"
            slot="suffix" title="任务地址">
          </i>
        </el-input>
        <div>
          <el-button type="text" size="mini" v-if="!snameMapShow" @click.stop="snameMapShow = true">展开<i class="el-icon-caret-bottom"></i></el-button>
          <el-button type="text" size="mini" v-else @click.stop="snameMapShow = false">收起<i class="el-icon-caret-top"></i></el-button>
        </div>
        <div v-show="snameMapShow" class="map-wrapper">
          <div id="sNameMap" class="map-self"></div></div>
        <p style="margin-top: 5px">任务地址：{{addForm.sname}}</p><p style="margin-top: -25px">经度：{{addForm.slon}} ，纬度：{{addForm.slat}}</p>
      </el-form-item>
      <el-form-item v-if="infoVisible">
      </el-form-item>
    </el-form>
    <!--地址模糊搜索子组件-->
    <place-search
      class="place-wrap"
      ref="placeSearch"
      v-if="resultVisible"
      :result="result"
      :left="offsetLeft"
      :top="offsetTop"
      :width="inputWidth"
      :height="inputHeight"
      @getLocation="getPlaceLocation">
    </place-search>
  </div>
</template>
<script>
  import AMap from 'AMap'
  import placeSearch from './child/placeSearch'

  export default {
    name:'Gdmap',
    data() {
      let validatePlace = (rules, value, callback) => {
        if (rules.field === 'sname') {
          if (value === '') {
            callback(new Error('请输入地点'));
          } else {
            if (!this.addForm.slat || this.addForm.slat === 0) {
              callback(new Error('请搜索并选择有经纬度的地点'));
            } else {
              callback();
            }
          }
        }
      };
      return {
        addForm: {
          sname: '', // 地点
          slat: 0, // 地点纬度
          slon: 0 // 地点经度
        },
        addRules: {
          sname: [{required: true, validator: validatePlace, trigger: 'change'}]
        },
        inputId: '', // 地址搜索input对应的id
        result: [], // 地址搜索结果
        resultVisible: false, // 地址搜索结果显示标识
        inputWidth: 0, // 搜索框宽度
        inputHeight: 0, // 搜索框高度
        offsetLeft: 0, // 搜索框的左偏移值
        offsetTop: 0, // 搜索框的上偏移值
        snameMap: null,  // 地点地图选址
        snameMapShow: true,  // 地点地图选址显示
        infoVisible: false // 选中地址信息显示
      }
    },
    components: {
      'place-search': placeSearch
    },
    mounted() {
      // document添加onclick监听，点击时隐藏地址下拉浮窗
      document.addEventListener("click", this.hidePlaces, false);
      // window添加onresize监听，当改变窗口大小时同时修改地址下拉浮窗的位置
      window.addEventListener("resize", this.changePos, false)
    },
    methods: {
      placeAutoInput(inputId) {
        let currentDom = document.getElementById(inputId);// 获取input对象
        let keywords = currentDom.value;
        if(keywords.trim().length === 0) {
          this.resultVisible = false;
        }
        AMap.plugin('AMap.Autocomplete', () => {
          // 实例化Autocomplete
          let autoOptions = {
            city: '全国'
          };
          let autoComplete = new AMap.Autocomplete(autoOptions); // 初始化autocomplete
          // 开始搜索
          autoComplete.search(keywords, (status, result) => {
            // 搜索成功时，result即是对应的匹配数据
            if(result.info === 'OK') {
              let sizeObj = currentDom.getBoundingClientRect(); // 取得元素距离窗口的绝对位置
              this.inputWidth = currentDom.clientWidth;// input的宽度
              this.inputHeight = currentDom.clientHeight + 2;// input的高度，2是上下border的宽
              // input元素相对于页面的绝对位置 = 元素相对于窗口的绝对位置
              this.offsetTop = sizeObj.top + this.inputHeight; // 距顶部
              this.offsetLeft = sizeObj.left; // 距左侧
              this.result = result.tips;
              this.inputId = inputId;
              this.resultVisible = true;
            }
          })
        })
      },
      // 隐藏搜索地址下拉框
      hidePlaces(event) {
        let target = event.target;
        // 排除点击地址搜索下拉框
        if(target.classList.contains("address")) {
          return;
        }
        this.resultVisible = false;
      },
      // 修改搜索地址下拉框的位置
      changePos() {
        if(this.inputId && this.$refs['placeSearch']) {
          let currentDom = document.getElementById(this.inputId);
          let sizeObj = currentDom.getBoundingClientRect(); // 取得元素距离窗口的绝对位置
          // 元素相对于页面的绝对位置 = 元素相对于窗口的绝对位置
          let inputWidth = currentDom.clientWidth;// input的宽度
          let inputHeight = currentDom.clientHeight + 2;// input的高度，2是上下border的宽
          let offsetTop = sizeObj.top + inputHeight; // 距顶部
          let offsetLeft = sizeObj.left; // 距左侧
          this.$refs['placeSearch'].changePost(offsetLeft, offsetTop, inputWidth, inputHeight);
        }
      },
      // 获取子组件返回的位置信息
      getPlaceLocation(item) {
        if(item) {
          this.resultVisible = false;
          if(item.location && item.location.getLat()) {
            this.pickAddress(this.inputId, item.location.getLng(), item.location.getLat());
            this.$refs.addForm.validateField(this.inputId);
          } else {
            this.geocoder(item.name, this.inputId);
          }
        }
      },
      // 地图选址
      pickAddress(inputId, lon, lat) {
        if(inputId === "sname") {
          this.snameMapShow = true;
          AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
            this.snameMap = new AMap.Map('sNameMap', {
              zoom: 16,
              scrollWheel: false,
              center: [lon,lat]
            });
            let positionPicker = new PositionPicker({
              mode: 'dragMap',
              map: this.snameMap
            });
            positionPicker.on('success', (positionResult) => {
              this.addForm.slat = positionResult.position.lat;
              this.addForm.slon = positionResult.position.lng;
              this.addForm.sname = positionResult.address;
            });
            positionPicker.on('fail', (positionResult) => {
              this.$message.error("地址选取失败");
            });
            positionPicker.start();
            this.snameMap.addControl(new AMap.ToolBar({
              liteStyle: true
            }));
          });
        }
      },
      // 地理编码
      geocoder(keyword, inputValue) {
        let geocoder = new AMap.Geocoder({
          //city: "010", //城市，默认：“全国”
          radius: 1000 //范围，默认：500
        });
        //地理编码,返回地理编码结果
        geocoder.getLocation(keyword, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            let geocode = result.geocodes;
            if (geocode && geocode.length > 0) {
              if (inputValue === "sname") {
                this.addForm.slat = geocode[0].location.getLat();
                this.addForm.slon = geocode[0].location.getLng();
                this.addForm.sname = keyword;
                // 如果地理编码返回的粗略经纬度数据不需要在地图上显示，就不需要调用地图选址，且要隐藏地图
                // this.pickAddress("sname", geocode[0].location.getLng(), geocode[0].location.getLat());
                this.snameMapShow = false;
                this.$refs.addForm.validateField("sname");
              }
            }
          }
        });
      },
      // 做删除操作时还原经纬度并验证字段
      deletePlace(inputId) {
        if (inputId === "sname") {
          this.addForm.slat = 0;
          this.addForm.slon = 0;
          this.$refs.addForm.validateField("sname");
        }
      }
    },
    beforeDestroy() {
      document.removeEventListener("click", this.hidePlaces, false);
    },

  }
</script>
<style>
  .map-wrapper .map-self{
    height: 200px;
  }
</style>
