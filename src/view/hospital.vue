<template>
	<div class="hospital">
		<div class="title">医院应用</div>
		<div class="pt-panel-gray">
			<el-input class="searchinput" v-model="searchinput" :maxlength="500" v-on:keyup.enter.native="searchRole" placeholder="请输入医院名称/级别/区域/应用类型">
			</el-input>
			<el-button type="primary" @click="searchRole">搜索</el-button>
		</div>
		<div class="pt-box">
			共计：
			<span class="large orange">{{ tabelData.totalElements }}</span> 家医院应用
			<el-button class="toright" type="primary" icon="plus" @click="dialogVisible = true">添加医院</el-button>
		</div>
		<el-table  @row-click="hospitalchange">
			<el-table-column type="index" label="序号" width="80">
			</el-table-column>
			<el-table-column prop="name" label="医院名称">
			</el-table-column>
			<el-table-column prop="level" label="级别" width="100">
			</el-table-column>
			<el-table-column label="区域">
				<template scope="scope">
					<span>
						{{scope.row.province}} {{scope.row.city}}
					</span>
				</template>
			</el-table-column>
			<el-table-column prop="businesss" label="应用类型">
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" width="120">
			</el-table-column>
		</el-table>
		<div class="pagediv">
			<el-pagination @current-change="handleCurrentChange" :current-page="currentpage" :page-size="10" layout="prev, pager, next" :total="tabelData.totalElements">
			</el-pagination>
		</div>
		<el-dialog title="添加医院" v-model="dialogVisible" size="tiny" :close-on-click-modal="false" :before-close="exitForm">
			<el-form label-width="80px" :model="formData" ref="validateForm">
				<div class="pt-panel-gray">
					<el-form-item label="医院名称" prop="name" :rules="{required: true, message: '医院名不能为空', trigger: 'blur'}">
						<el-input v-model="formData.name" :maxlength="16" placeholder="请输入医院名称"></el-input>
					</el-form-item>
					<el-form-item label="等级" prop="level" :rules="{required: true, message: '请选择医院等级', trigger: 'change'}">
						<el-select v-model="formData.level" placeholder="请选择" style="width: 45%">
							<el-option :key="i" v-for="i in levels" :label="i.label" :value="i.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="所在区域" prop="cityScore" :rules="{required: true, message: '请选择区域', trigger: 'change'}">
						<pt-area-select :area-val="formData"></pt-area-select>
					</el-form-item>
				</div>
				<div class="dialogform">
					<el-checkbox style="padding: 8px 10px 8px 0px" v-model="formData.hasBranch" label="设置多院区"></el-checkbox>
					<el-button type="text" @click="addDomain" v-if="formData.hasBranch"> 新增</el-button>
					<div v-if="formData.hasBranch">
						<el-form-item v-for="(i,index) in formData.tHospitalList" :rules="{required: true, message: '院区名不能为空', trigger: 'blur'}" :prop="'tHospitalList.'+index+'.name'" :key="i.key" class="multilist" label-width="0px">
							<el-input v-model="i.name" :maxlength="16" placeholder="请输入院区名"></el-input>
							<el-button @click.prevent="removeDomain(i)" type="text">删除</el-button>
						</el-form-item>
					</div>
					<div class="title">应用类型</div>
					<div class="hasimg">
						<el-checkbox label="APP" v-model="formData.isApp">
							<img :src="app" />APP
						</el-checkbox>
						<br/>
						<el-checkbox label="支付宝服务窗" v-model="formData.isAlipay">
							<img :src="zfb" />支付宝服务窗
						</el-checkbox>
						<br/>
						<el-checkbox label="微信公众号" v-model="formData.isWechat">
							<img :src="wx" />微信公众号
						</el-checkbox>
					</div>
				</div>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="exitForm">取 消</el-button>
				<el-button type="primary" @click="submitform('validateForm')">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import areaselect from '@/components/areaselect.vue'
import { levels } from '@/assets/testdata.js'
import app from '@/assets/images/app.png'
import zfb from '@/assets/images/zfb.png'
import wx from '@/assets/images/wx.png'
import { get, post } from '@/request'

export default {
	data: () => ({
		searchinput: '',
		currentpage: 1,
		dialogVisible: false,
		tabelData: {},
		app: app,
		zfb: zfb,
		wx: wx,
		levels: levels,
		formData: {
			name: '',
			level: '',
			hasBranch: false,
			isApp: false,
			isAlipay: false,
			isWechat: false,
			tHospitalList: [{
				name: '',
				key: ''
			}],
			provinceScore: '',
			cityScore: ''
		}
	}),
	mounted() {
		this.getHospitalDate({
			page: 1,
			size: 10
		})
	},
	methods: {
		async getHospitalDate(obj) {
			let d = await get('auth/hospitals', obj)
			for (let m of d.data.content) {
				let f = new Date(m.createTime)
				let businesss = []
				if (m.isApp)
					businesss.push('APP')
				if (m.isWechat)
					businesss.push('微信')
				if (m.isAlipay)
					businesss.push('支付宝')
				m.businesss = businesss.join(' | ')
				m.createTime = `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()}`
			}
			this.currentpage = d.data.number + 1
			this.tabelData = d.data
		},
		hospitalchange(data) {
			this.$router.push(`hospital/hospitalchange/${data.id}`)
		},
		exitForm() {
			this.dialogVisible = false
			this.formData = {
				name: '',
				level: '',
				hasBranch: false,
				isApp: false,
				isAlipay: false,
				isWechat: false,
				tHospitalList: [{
					name: '',
					key: ''
				}],
				provinceScore: '',
				cityScore: ''
			}
			setTimeout(() => {
				this.$refs['validateForm'].resetFields()
			})
		},
		removeDomain(item) {
			var index = this.formData.tHospitalList.indexOf(item)
			if (index !== -1) {
				this.formData.tHospitalList.splice(index, 1)
			}
			if (this.formData.tHospitalList.length == 0) {
				this.formData.hasBranch = false
				this.addDomain()
			}
		},
		addDomain() {
			this.formData.tHospitalList.push({
				name: '',
				key: Date.now()
			});
		},
		handleCurrentChange(val) {
			this.getHospitalDate({
				page: val,
				size: 10,
				search: this.searchinput.replace(/(^\s*)|(\s*$)/g, "")
			})
			this.searchinput = this.searchinput.replace(/(^\s*)|(\s*$)/g, "")
		},
		submitform(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					post('auth/hospitals', Object.assign({}, this.formData, {
						hasBranch: this.formData.hasBranch ? 1 : 0,
						isAlipay: this.formData.isAlipay ? 1 : 0,
						isApp: this.formData.isApp ? 1 : 0,
						isWechat: this.formData.isWechat ? 1 : 0,
						cityScore: this.formData.provinceScore == this.formData.cityScore ? '' : this.formData.cityScore
					}), true).then(d => {
						if (d.data.code == 200) {
							this.$message({
								message: d.data.msg,
								type: 'success'
							})
							this.exitForm()
							this.getHospitalDate()
						} else {
							this.$message.error(d.data.msg)
						}
					})
				} else {
					return false
				}
			})
		},
		searchRole() {
			this.getHospitalDate({
				page: 1,
				size: 10,
				search: this.searchinput.replace(/(^\s*)|(\s*$)/g, "")
			})
			this.currentpage = 1
			this.searchinput = this.searchinput.replace(/(^\s*)|(\s*$)/g, "")
		}
	},
	components: {
		'pt-area-select': areaselect
	}
}
</script>