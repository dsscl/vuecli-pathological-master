<template>
	<div class="wrap clear">
		<nav class="breadNav">
			<a href="#">首页</a>
			<a href="#">我的会诊列表</a>
			<a href="#">申请会诊</a>
		</nav>
		<el-form class="applyForm" id="applyForm">
			<div class="marginX20 padding20X borderBtm1">
				<span class="fontsize2 color-111">患者信息</span>
				<span class="floatRight">送检医生：<span class="color-blue">当前用户</span></span>
			</div>
			<section class="marginX20">
				<el-form-item class="marginTop20" label="病理号：" :rules="{required: true, message: '请输入病理号', trigger: 'change'}">
					<input class="formInput-320" required />
				</el-form-item>
				<el-form-item class="marginTop20" label="患者姓名：" :rules="{required: true, message: '请输入患者姓名', trigger: 'change'}">
					<input class="formInput-320" required />
				</el-form-item>
				<el-form-item class="marginTop20" label="性别：" :rules="{required: true, message: '请输入性别', trigger: 'change'}">
					<div class="marginLeft30">
						<el-radio label="男" v-model="gender" value="男" >男</el-radio>
						<el-radio label="女" v-model="gender" value="女" >女</el-radio>
					</div>
				</el-form-item>
				<el-form-item class="marginTop20" label="年龄：" :rules="{required: true, message: '请输入年龄', trigger: 'change'}">
					<input class="formInput-320" required />
				</el-form-item>
				</el-form-item>
				<el-form-item class="marginTop20" label="送检部位：" :rules="{required: true, message: '请输入送检部位', trigger: 'change'}">
					<select class="formInput-110">
						<option>常规</option>
						<option>冰冻</option>
						<option>细胞</option>
					</select>
					<input class="formInput-260 marginLeft30" required />
					<span class="color-blue borderBtm1-blue">甲状腺病理</span>
				</el-form-item>
				<el-form-item class="marginTop20" label="联系电话：" :rules="{required: false, message: '请输入联系电话', trigger: 'change'}">
					<input class="formInput-320" />
				</el-form-item>
				<el-form-item class="marginTop20" label="病情介绍：" :rules="{required: false, message: '请输入病情介绍', trigger: 'change'}">
					<textarea class="formTextarea-510" rows="3"></textarea>
				</el-form-item>
				<el-form-item class="marginTop20 picWrap" label="会诊专家：" :rules="{required: true, message: '请输入会诊专家', trigger: 'change'}">
					<div class="floatLeft marginBtm10 marginRight30 textAlignCenter cursorPointer">
						<div class="formImg-120"><img src="../assets/img/icon-addfile_03.jpg" width="120" height="120" /></div>
						<p class="marginTop5 fontsize-2">选择专家</p>
					</div>
					<div class="exptWrap floatLeft marginBtm10 marginRight30 textAlignCenter">
						<div class="exptPhoto relative">
							<img class="formImg-120" alt="专家头像" />
							<button type="button" class="exptdelBtn" onclick="$(this).parents('.exptWrap').remove();"></button>
						</div>
						<p class="marginTop5 fontsize-2">王大明</p>
					</div>
				</el-form-item>
			</section>
			<div class="marginTop50 marginX20 borderBtm1 flex-baseline">
				<span class="fontsize2 color-111">病理资料</span>
				<ul class="marginLeft50">
					<li class="tabTitleLi" :class="{'cur':tabshow==true}" @click="tabshow=!tabshow">我已对数字切片扫描设备</li>
					<li class="tabTitleLi marginLeft30" :class="{'cur':tabshow==false}" @click="tabshow=!tabshow">直接寄送</li>
				</ul>
			</div>
			<section class="marginTop50 marginLeft90 marginRight20 clear" v-show="tabshow">
				<el-form-item class="marginBtm30 clear picWrap" label="添加切片：" :rules="{required: true, message: '请添加切片', trigger: 'change'}">
					<div class="floatLeft marginBtm10 marginRight30 textAlignCenter">
						<div class="relative">
							<input type="file" class="formImg-120 color-transparent" style="height: 116px" id="addFile" />
							<input type="button" class="fileStyle" onclick="$('#addFile').trigger('click');" />
						</div>
						<p class="marginTop5 fontsize-2">选择切片</p>
					</div>
					<div class="exptWrap floatLeft marginBtm10 marginRight30 textAlignCenter">
						<div class="exptPhoto relative">
							<img class="formImg-120" alt="病理切片" />
							<button type="button" class="exptdelBtn" onclick="$(this).parents('.exptWrap').remove();"></button>
						</div>
						<p class="marginTop5 fontsize-2">上传完成</p>
					</div>
				</el-form-item>
				<el-form-item class="clear picWrap" label="上传病历：" :rules="{required: true, message: '请上传病历', trigger: 'change'}">
					<div class="floatLeft marginBtm10 marginRight30 textAlignCenter">
						<div class="relative">
							<input type="file" class="formImg-120 color-transparent" style="height: 116px" id="addCuter" />
							<input type="button" class="photoStyle" onclick="$('#addCuter').trigger('click');" />
						</div>
						<p class="marginTop5 fontsize-2">选择病历</p>
					</div>
					<div class="exptWrap floatLeft marginBtm10 marginRight30 textAlignCenter">
						<div class="exptPhoto relative">
							<img class="formImg-120" alt="病历" />
							<button type="button" class="exptdelBtn" onclick="$(this).parents('.exptWrap').remove();"></button>
						</div>
						<p class="marginTop5 fontsize-2">上传完成</p>
					</div>
				</el-form-item>
			</section>
			<section v-show="!tabshow">
				<div class="marginTop50 marginLeft90 marginRight20">
					<el-form-item class="marginBtm30" label="收件信息：" :rules="{required: false, message: '请选择回寄地址', trigger: 'change'}">
						<div class="floatLeft width660 padding10X paddingX15 bgcolor-body color-999">
							<p>收件地址：杭州市江干区天城路68号万事利大厦A座8楼</p>
							<p>收件人：病理会诊中心</p>
							<p>电话：13588134736</p>
						</div>
					</el-form-item>
					<el-form-item label="回寄地址：" :rules="{required: true, message: '请选择回寄地址', trigger: 'change'}">
                        <div class="floatLeft width660 padding5X paddingX15">
                            <div class="marginBtm10 flex-spacebetween" v-for="(addritem, index) in addrlist" >
                                <label class="flex-spacebetween paddingLeft30 relative cursorPointer">
                                    <input type="radio" class="displayNone" v-model="addrnum" v-bind:value="index" />
                                    <span class="radioStyle" :class="{'checked': addrnum==index}"></span>
                                    <div>
                                        <p>{{addritem.provinceScore}}{{addritem.cityScore}}{{addritem.detladdr}}</p>
                                        <span>{{addritem.name}}</span>
                                        <span>{{addritem.telephone}}</span>
                                    </div>
                                </label>
                                <div class="marginLeft10 itemflex-00auto">
                                    <button type="button" class="addrBtn" @click="editAddr(index)">编辑</button>
                                    <button type="button" class="marginLeft30 addrBtn" @click="delAddr(index)">删除</button>
                                </div>
                            </div>
                            <button type="button" class="marginTop30 btn-ow" v-show="addbtnshow" @click="addAddr">+新增地址</button>
                        </div>
                    </el-form-item>
				</div>
				<div class="areaEditing" v-show="!addbtnshow">

					<div class="marginXauto width80">
						<el-form-item label="所在地：" :rules="{required: true, message: '请选择所在地', trigger: 'change'}">
								<pt-area-select class="floatLeft width60" :area-val="formdata"></pt-area-select>
						</el-form-item>
						<el-form-item label="详细地址：" :rules="{required: true, message: '请输入详细地址', trigger: 'change'}">
							<textarea class="border1 width80" rows="3" v-model="formdata.detladdr" required></textarea>
						</el-form-item>
						<el-form-item class="width100 flex-align" label="联系人：" :rules="{required: true, message: '请输入联系人', trigger: 'change'}">
							<input class="border1 padding5X" v-model="formdata.name" required/>
							<el-checkbox class="relative cursorPointer paddingLeft20" 
							v-if="!((addrlist.length == 0)||(savetype  == 'edit' && addrlist.length == 1))" v-model="isoften" >设置为常用地址</el-checkbox>
						</el-form-item>
						<el-form-item label="联系电话：" :rules="{required: true, message: '请输入联系电话', trigger: 'change'}">
							<input class="border1 padding5X" v-model="formdata.telephone" required />
						</el-form-item>
						<div class="marginTop30 marginLeft20">
							<button type="button" class="btn-ow" @click="saveAddr">保存</button>
							<button type="button" class="marginLeft40 btn-w6" @click="cancelAddr">取消</button>
						</div>
					</div>
				</div>
			</section>	
			<div class="marginTop70 borderBtm1"></div>
			<div class="marginTop50 marginLeft90">
				<button type="button" class="btn-bw">保存并支付</button>
				<button type="button" class="marginLeft70 btn-wb">保存</button>
			</div>
		</el-form>

		<aside class="applyAside">
			<div class="padding20X fontsize2 color-111">会诊流程</div>
			<div class="paddingBtm40">
				<img src="../assets/img/pic-step1_03.png" width="191" height="228">
			</div>
			<div class="borderBtm1"></div>
			<div class="padding20X fontsize2 color-111">常见问题</div>
			<ul>
				<li class="marginBtm15 color-666"><i class="marginRight10 color-666">●</i>申请病理会诊需要准备哪些材料？</li>
				<li class="marginBtm15 color-666"><i class="marginRight10 color-666">●</i>平台上的会诊专家来自哪些医院？</li>
				<li class="marginBtm15 color-666"><i class="marginRight10 color-666">●</i>专家阅片并编辑诊断意见</li>
				<li class="marginBtm15 color-666"><i class="marginRight10 color-666">●</i>专家阅片并编辑诊断意见</li>
			</ul>
		</aside>
		<div class="alert-wrapper displayNone">
			<article class="alert-seltExpt" id="alert-seltExpt">
				<header class="flex-align">
					<i class="close-alert" onclick="$('.alert-wrapper,#alert-seltExpt').hide()">×</i>
					<nav>
						<span class="marginRight30 cursorPointer cur">默认</span>
						<span class="marginRight30 cursorPointer">会诊量<img class="marginLeft5" src="../assets/img/icon-sort.png" height="11" width="7" /></span>
						<span class="marginRight70 cursorPointer">价格<img class="marginLeft5" src="../assets/img/icon-sort.png" height="11" width="7" /></span>
					</nav>
					<div class="searchDiv flex-align">
						<input class="width100 borderNone" placeholder="请输入专家名/团队/医院" />
						<img class="searchIcon" src="../assets/img/icon-search.png">
					</div>
				</header>
				<section>
					<div class="seltexptLiWrap">
						<div class="seltexptLi flex-align-spacebetween">
							<div class="flex-align-spacebetween relative">
								<img alt="专家头像" src="../assets/img/photo-expt.png" height="60" width="60" />
								<div class="marginLeft15 width380">
									<p class="lineEllipsis"><span class="marginRight15 color-blue">丁华野</span><span>主任医师</span></p>
									<p class="marginTop15 lineEllipsis">北京协和医院</p>
								</div>
							</div>
							<div class="marginLeft10 itemflex-00auto textAlignRight">
								<p class="fontsize8 color-orange">¥420</p>
								<p class="fontsize-2 color-666">(会诊量：280)</p>
							</div>
						</div>
					</div>
					<div class="seltexptLiWrap">
						<div class="seltexptLi flex-align-spacebetween">
							<div class="flex-align-spacebetween relative">
								<img class="proLogo" alt="专家团队" src="../assets/img/logo-professional.png" height="34" width="27">
								<img alt="专家头像" src="../assets/img/photo-expt.png" height="60" width="60" />
								<div class="marginLeft15 width380">
									<p class="lineEllipsis"><span class="marginRight15 color-blue">丁华野</span><span>主任医师</span></p>
									<p class="marginTop15 lineEllipsis">北京协和医院</p>
								</div>
							</div>
							<div class="marginLeft10 itemflex-00auto textAlignRight">
								<p class="fontsize8 color-orange">¥420</p>
								<p class="fontsize-2 color-666">(会诊量：280)</p>
							</div>
						</div>	
					</div>
				</section>
			</article>
		</div>
	</div>
</template>

<script>
import areaselect from '@/components/areaselect.vue'
import { area_data } from '@/components/area_data.js'

export default {
    data () {
	    return {
		 	gender: '',
		    addrnum: '0',
		    addrlist: [],
		    formdata: {
				provinceScore: '',
				cityScore: '',
				detladdr: '',
				name: '',
				telephone: ''
		    },
		    isoften: false,   //是否为常用地址
		    addbtnshow: true,  //新增地址按钮显示隐藏
		    savetype: '',       //保存类型，新增保存or编辑保存
		    editindex: '',     //savetype='edit'时，即保存类型为编辑保存的话，获取当前地址的index
		    tabshow: true,
    		area_data: area_data
	    }
    },

	methods: {
		addAddr: function(){
			this.addbtnshow = false;
		},
		delAddr: function(index){
			this.addrlist.splice(index,1);
		},
		editAddr: function(index){
			this.savetype="edit";
			this.editindex = index;
			let provid = this.area_data.prov.find((a) => a.name == this.addrlist[index].provinceScore)['id']
			let cityid = this.area_data.city[provid].find((a) => a.name == this.addrlist[index].cityScore)['id']
			this.formdata={
				provinceScore: provid,
				cityScore: cityid,
				detladdr:this.addrlist[index].detladdr,
				name:this.addrlist[index].name,
				telephone:this.addrlist[index].telephone
			}
			this.addbtnshow=false;
		},
		saveAddr: function(){
			let provid = this.formdata.provinceScore;
			let provname = ''
			let cityname = ''
			if(provid==!''){
				console.log(provid)
				provname = this.area_data.prov.find((a) => a.id == this.formdata.provinceScore)['name']
				cityname = this.area_data.city[provid].find((a) => a.id == this.formdata.cityScore)['name']
			}
			this.formdata = {
		        provinceScore: provname,
		        cityScore: cityname,
		        detladdr: this.formdata.detladdr,
				name: this.formdata.name,
				telephone: this.formdata.telephone
	    	}
	    	// 判断是否有空字段
			if(this.formdata.provinceScore==''){
				alert('请选择省份')
			}else if(this.formdata.cityScore==''){
				alert('请选择城市')
			}else if(this.formdata.detladdr==''){
				alert('请输入详细地址')
			}else if(this.formdata.name==''){
				alert('请输入联系人')
			}else if(this.formdata.telephone==''){
				alert('请输入手机号码')
			}else{
				//判断是否为编辑保存
				if(this.savetype=="edit"){
					//判断是否为常用地址，若勾选常用地址，置顶；否则替换数组中第editindex条地址
					if(this.isoften==true){
						this.addrlist.splice(this.editindex,1);
						this.addrlist.unshift(this.formdata);
					}else{
						this.addrlist.splice(this.editindex,1,this.formdata);
					}
				}else{
					if(this.isoften==true){
						this.addrlist.unshift(this.formdata);
					}else{
						this.addrlist.push(this.formdata);
					}
				}
			}
		    this.formdata = {
				provinceScore:'',
				cityScore:'',
				detladdr:'',
				name:'',
				telephone:''
		    };
			this.savetype="";
			this.addbtnshow=true;
			this.isoften=false;
		},
		cancelAddr:function(){
		    this.formdata = {
				provinceScore:'',
				cityScore:'',
				detladdr:'',
				name:'',
				telephone:''
		    };
			this.savetype="";
			this.addbtnshow=true;
			this.isoften=false;
		}
	},

	components: {
		'pt-area-select': areaselect
	}
}
</script>