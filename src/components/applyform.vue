<template>
	<div class="wrap clear">
		<nav class="breadNav">
			<a href="#">首页</a>
			<a href="#">我的会诊列表</a>
			<a href="#">申请会诊</a>
		</nav>
		<form class="applyForm">
			<div class="padding20X borderBtm1">
				<span class="fontsize2 color-111">患者信息</span>
				<span class="floatRight">送检医生：<span class="color-blue">当前用户</span></span>
			</div>
			<section>
				<div class="marginTop20 flex-baseline">
					<label class="infoLabel"><i class="color-red">*</i>病理号：</label>
					<input class="marginLeft30 formInput-320" required />
				</div>
				<div class="marginTop20 flex-baseline">
					<label class="infoLabel"><i class="color-red">*</i>患者姓名：</label>
					<input class="marginLeft30 formInput-320" required />
				</div>
				<div class="marginTop20 flex-baseline">
					<label class="infoLabel"><i class="color-red">*</i>性别：</label>
					<div class="marginLeft30">
						<label class="relative paddingLeft20 cursorPointer">
							<input type="radio" name="gender" class="displayNone" v-model="gender" value="男" />
							<span class="radioStyle" :class="{'checked': gender=='男'}"></span>
							<span>男</span>
						</label>
						<label class="relative paddingLeft20 cursorPointer marginLeft30">
							<input  type="radio" name="gender" class="displayNone" v-model="gender" value="女" />
							<span class="radioStyle" :class="{'checked': gender=='女'}"></span>
							<span>女</span>
						</label>
					</div>
				</div>
				<div class="marginTop20 flex-baseline">
					<label class="infoLabel"><i class="color-red">*</i>年龄：</label>
					<input class="marginLeft30 formInput-320" required />
				</div>
				<div class="marginTop20 flex-baseline">
					<label class="infoLabel"><i class="color-red">*</i>送检部位：</label>
					<select class="marginLeft30 formInput-110">
						<option>常规</option>
						<option>冰冻</option>
						<option>细胞</option>
					</select>
					<input class="formInput-260 marginLeft30" required />
					<span class="marginLeft30 color-blue borderBtm1-blue">甲状腺病理</span>
				</div>
				<div class="marginTop20 flex-baseline">
					<label class="infoLabel">联系电话：</label>
					<input class="marginLeft30 formInput-320" />
				</div>
				<div class="marginTop20 flex-baseline">
					<label class="infoLabel">病情介绍：</label>
					<textarea class="marginLeft30 formTextarea-510" rows="3"></textarea>
				</div>
				<div class="marginTop20 flex-baseline">
					<label class="infoLabel"><i class="color-red">*</i>会诊专家：</label>
					<div class="marginLeft30 flex-align">
						<div class="textAlignCenter">
							<div class="relative">
								<input type="file" class="formImg-120 color-transparent" id="addFile" />
								<input type="button" class="fileStyle" onclick="$('#addFile').trigger('click');" />
							</div>
							<p class="marginTop5 fontsize-2">选择专家</p>
						</div>
						<div class="exptWrap marginLeft30 textAlignCenter">
							<div class="exptPhoto relative">
								<img class="formImg-120" alt="专家头像" />
								<button type="button" class="exptdelBtn" onclick="$(this).parents('.exptWrap').remove();"></button>
							</div>
							<p class="marginTop5 fontsize-2">王大明</p>
						</div>
					</div>
				</div>
			</section>
			<div class="marginTop50 borderBtm1 flex-baseline">
				<span class="fontsize2 color-111">病理资料</span>
				<ul class="marginLeft50">
					<li class="tabTitleLi cur">我已对数字切片扫描设备</li>
					<li class="tabTitleLi marginLeft30">直接寄送</li>
				</ul>
			</div>
			<section class="marginLeft90 marginTop50" id="tc_0">
				<div class="flex-baseline">
					<label class="infoLabel"><i class="color-red">*</i>添加切片：</label>
					<div class="marginLeft30 flex-align">
						<div class="textAlignCenter">
							<div class="relative">
								<input type="file" class="formImg-120 color-transparent" id="addFile" />
								<input type="button" class="fileStyle" onclick="$('#addFile').trigger('click');" />
							</div>
							<p class="marginTop5 fontsize-2">选择切片</p>
						</div>
						<div class="exptWrap marginLeft30 textAlignCenter">
							<div class="exptPhoto relative">
								<img class="formImg-120" alt="专家头像" />
								<button type="button" class="exptdelBtn" onclick="$(this).parents('.exptWrap').remove();"></button>
							</div>
							<p class="marginTop5 fontsize-2">上传完成</p>
						</div>
					</div>
				</div>
				<div class="marginTop30 flex-baseline">
					<label class="infoLabel"><i class="color-red">*</i>上传病历：</label>
					<div class="marginLeft30 textAlignCenter">
						<div class="relative">
							<input type="file" class="formImg-120 color-transparent" id="addFile" />
							<input type="button" class="photoStyle" onclick="$('#addFile').trigger('click');" />
						</div>
						<p class="marginTop5 fontsize-2">选择病历</p>
					</div>
				</div>
			</section>
			<section class="marginLeft90 marginTop50" id="tc_1">
				<div class="flex-baseline">
					<label class="infoLabel itemflex-00auto">收件信息：</label>
					<div class="marginLeft10 paddingX20 bgcolor-body color-999">
						<p class="color-transparent">占行</p>
						<p>收件地址：杭州市江干区天城路68号万事利大厦A座8楼</p>
						<p class="margin10X">收件人：病理会诊中心</p>
						<p>电话：13588134736</p>
						<p class="color-transparent">占行</p>
					</div>
				</div>
				<div class="marginTop30 flex-baseline">
					<label class="infoLabel itemflex-00auto"><i class="color-red">*</i>回寄地址：</label>
					<div class="marginLeft10 marginRight50 width100">
						<div class="marginTop30 relative flex-spacebetween" v-for="(addritem, index) in addrlist" >
							<label class="flex-spacebetween paddingLeft30 cursorPointer">
								<input type="radio" name="address" class="displayNone" v-model="addrnum" :value="index" />
								<span class="radioStyle" :class="{'checked': addrnum==index}"></span>
								<div>
									<p class="marginBtm5"><span>{{addritem.province}}</span><span>{{addritem.city}}</span><span>{{addritem.detladdr}}</span></p>
									<span>{{addritem.name}}</span>
									<span>{{addritem.telephone}}</span>
								</div>
							</label>
							<div class="marginLeft10 itemflex-00auto">
								<button type="button" class="addrBtn" @click="editAddr(index)">编辑</button>
								<button type="button" class="marginLeft30 addrBtn" @click="delAddr(index)">删除</button>
							</div>
						</div>
						<button type="button" class="marginTop40 btn-ow" v-show="addbtnshow" @click="addAddr">+新增地址</button>
						<div class="color-transparent">占行</div>
						<div class="bgcolor-body border1 padding20X paddingRight20" v-show="!addbtnshow">
							<div class="flex-baseline">
								<label class="infoLabel itemflex-00auto"><i class="color-red">*</i>所在地：</label>
								<div data-toggle="distpicker">
									<areaselect></areaselect>
								    <!-- <select class="border1 padding5X color-333" data-province="选择省份" v-model="formdata.province" required></select>
								    <select class="marginLeft15 border1 padding5X color-333" data-city="选择城市" v-model="formdata.city" required></select> -->
								</div>
							</div>
							<div class="marginTop20 flex-baseline">
								<label class="infoLabel itemflex-00auto"><i class="color-red">*</i>详细地址：</label>
								<textarea class="width100 border1" rows="3" v-model="formdata.detladdr" required></textarea>
							</div>
							<div class="marginTop20 flex-baseline">
								<label class="infoLabel itemflex-00auto"><i class="color-red">*</i>联系人：</label>
								<div class="width100 flex-align-spacebetween">
									<input class="border1 padding5X" v-model="formdata.name" required/>
									<label class="relative cursorPointer paddingLeft20" 
									v-if="!((addrlist.length == 0)||(savetype  == 'edit' && addrlist.length == 1))">
										<input type="checkbox" class="displayNone" v-model="isoften">
										<span class="radioStyle" :class="{'checked': isoften == true}"></span>
										<span>设置为常用地址</span>
									</label>
								</div>		
							</div>
							<div class="marginTop20 flex-baseline">
								<label class="infoLabel itemflex-00auto"><i class="color-red">*</i>联系电话：</label>
								<input class="border1 padding5X" v-model="formdata.telephone" required />
							</div>
							<div class="marginTop30 marginLeft20">
								<button type="button" class="btn-ow" @click="saveAddr">保存</button>
								<button type="button" class="marginLeft40 btn-w6" @click="cancelAddr">取消</button>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div class="marginTop70 borderBtm1"></div>
			<div class="marginTop50 marginLeft90">
				<button type="button" class="btn-bw">保存并支付</button>
				<button type="button" class="marginLeft70 btn-wb">保存</button>
			</div>
		</form>

		<aside class="applyAside">
			<div class="marginBtm10 padding20X fontsize2 color-111">会诊流程</div>
			<div>
				<p>填写会诊申请单</p>
				<p>线上支付会诊费用</p>
				<p>专家阅片并编辑诊断意见</p>
				<p>打印报告</p>
			</div>
		</aside>
	</div>
</template>

<script>
import areaselect from './areaselect.vue'

export default {
    data () {
	    return {
		 	gender: '',
		    addrnum: '0',
		    addrlist: [],
		    formdata: {
			 	province: '',
				city: '',
				detladdr: '',
				name: '',
				telephone: ''
		    },
		    isoften: false,   //是否为常用地址
		    addbtnshow: true,  //新增地址按钮显示隐藏
		    savetype: '',       //保存类型，新增保存or编辑保存
		    editindex: ''     //savetype='edit'时，即保存类型为编辑保存的话，获取当前地址的index
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
			this.formdata={
				province:this.addrlist[index].province,
				city:this.addrlist[index].city,
				detladdr:this.addrlist[index].detladdr,
				name:this.addrlist[index].name,
				telephone:this.addrlist[index].telephone
			}

			this.addbtnshow=false;
		},
		saveAddr: function(){
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
		    this.formdata = {};
			this.savetype="";
			this.addbtnshow=true;
			this.isoften=false;
		},
		cancelAddr:function(){
		    this.formdata = {};
			this.savetype="";
			this.addbtnshow=true;
			this.isoften=false;
		}
	},

	components: {
		'areaselect': areaselect
	}
}
</script>