<template>
  <div class="hospitalselect">
    <el-tabs v-model="activeName">
      <el-tab-pane label="选择省" name="1">
        <div class="citylist">
          <div class="cityitem" v-for="(i,index) in pro" :class='{current:index==current1}' @click="changepro(i,index)" :title="i.name">
            {{i.name}}
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="选择市" name="2" v-if="current1 != null">
        <div class="citylist">
          <div class="cityitem" v-for="(i,index) in city" :class='{current:index==current2}' @click="changecity(i,index)" :title="i.name">
            {{i.name}}
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="选择医院" name="3" v-if="current2 != null">
        <div class="citylist">
          <div class="hospitalnull" v-if="hospitalnull">该城市暂无医院数据</div>
          <div class="cityitem" v-for="(i,index) in hospitals" :class='{current:index==current3}' @click="changehospital(i,index)" :title="i.name">
            {{i.name}}
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { get } from '@/request'
import qs from 'qs'

export default {
  data: () => ({
    activeName: '1',
    area: {},
    pro: '',
    city: '',
    hospitals: '',
    current1: null,
    current2: null,
    current3: null,
    hospitalnull: false,
    change: false
  }),

  watch: {
    'areaVal.dialogVisible': 'dialogChange'
  },
  mounted() {
    if (this.isChange) {
      this.change = qs.stringify({
        isSwitchHospital: true
      })
    }
    this.getArea()
  },
  methods: {
    getArea() {
      get(`auth/cities/json?${this.isChange ? this.change : ''}`).then(d => {
        this.area = d.data
        this.pro = this.area.pro.map(({ id, name, organizationId }) => ({
          id: id,
          organizationId: organizationId,
          name: unescape(name.replace(/\\/g, "%"))
        }))
      })
    },
    dialogChange() {
      if (!this.areaVal.dialogVisible) {
        this.activeName = '1'
        this.city = ''
        this.hospitals = ''
        this.current1 = null
        this.current2 = null
        this.current3 = null
      }
    },
    changepro(i, index) {
      this.city = this.area.city[i.id].length != 0 ? this.area.city[i.id].map(({ id, name, organizationId }) => ({
        id: id,
        organizationId: organizationId,
        name: unescape(name.replace(/\\/g, "%"))
      })) : [{
        id: i.id,
        organizationId: i.organizationId,
        name: `${this.pro.find(a => a.id == id)['name']}`
      }]
      this.areaVal.organizationId = i.organizationId
      this.areaVal.name = i.name
      if (this.isChange) {
        this.areaVal.id = ''
      }
      this.current1 = index
      this.current2 = null
      this.current3 = null
      this.activeName = '2'
    },
    changecity(i, index) {
      get(`auth/hospitals/city/${i.id}?${this.isChange ? this.change : ''}`).then(d => {
        this.hospitals = d.data
        this.hospitalnull = d.data.length == 0 ? true : false
      }).then(() => {
        this.areaVal.organizationId = i.organizationId
        this.areaVal.name = i.name
        if (this.isChange) {
          this.areaVal.id = ''
        }
        this.current2 = index
        this.current3 = null
        this.activeName = '3'

      })
    },
    changehospital(i, index) {
      this.areaVal.organizationId = i.organizationId
      this.areaVal.name = i.name
      this.current3 = index
      if (this.isChange) {
        this.areaVal.id = i.id
      }
    }
  },
  props: ['areaVal', 'isChange']
}
</script>
<style lang="scss">
.el-dialog.el-dialog--small {
  width: 505px;
}

.hospitalnull {
  width: 100%;
  text-align: center;
  padding-top: 30px;
  color: #999;
}

.hospitalselect {
  min-height: 360px;
  .citylist {
    display: flex;
    flex-wrap: wrap;
    .cityitem {
      height: 35px;
      background: #f5f5f5;
      color: #333;
      text-align: center;
      line-height: 35px;
      overflow: hidden;
      margin-left: 8px;
      margin-bottom: 8px;
      cursor: pointer;
      padding: 0px 10px;
      &:hover {
        background: #58B7FF;
        color: #fff;
      }
      &.current {
        color: #fff;
        background: #20A0FF;
      }
    }
  }
}
</style>
