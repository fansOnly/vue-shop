<template>
	<div class="address-box">
		<a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
			<a-form-item label='姓名' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="name"
			 :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your note!' }]}">
				<a-input />
			</a-form-item>
			<a-form-item label='电话' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="phone"
			 :fieldDecoratorOptions="{rules: [{ required: true, len: 11, message: '' }]}">
				<a-input />
			</a-form-item>
			<a-form-item label='国家' :labelCol="{ span: 5 }" :wrapperCol="{ span: 15 }" fieldDecoratorId="nation" :fieldDecoratorOptions="{rules: [{ required: true, message: '' }]}">
				<a-select  @change="handleChange" allowClear>
					<a-select-option value='china'>China</a-select-option>
					<a-select-option value='use'>U.S.A</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item label='多选' :labelCol="{ span: 5 }" :wrapperCol="{ span: 15 }" fieldDecoratorId="multi" :fieldDecoratorOptions="{rules: [{ required: true, message: '' }]}">
				<a-select mode="multiple"  @change="handleChange" >
					<a-select-option value='china'>China</a-select-option>
					<a-select-option value='use'>U.S.A</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item label='radio' :labelCol="{ span: 5 }" :wrapperCol="{ span: 15 }" fieldDecoratorId="radio" :fieldDecoratorOptions="{rules: [{ required: true, message: '' }]}">
				<a-radio-group @change="onChange" >
					<a-radio value="a">Hangzhou</a-radio>
					<a-radio value="b">Shanghai</a-radio>
					<a-radio-button value="c">Beijing</a-radio-button>
					<a-radio-button value="d">Chengdu</a-radio-button>
				  </a-radio-group>
			</a-form-item>
			<a-rate allowHalf v-model='rate' @change="rateChange" />
			<a-button type='primary' htmlType='submit'>提交</a-button>
		</a-form>
	</div>
</template>

<script>
	import {
		Form,
		Input,
		Button,
		Select,
		Radio,
		Rate
	} from 'ant-design-vue'

	export default {
		name: 'userinfo',
		components: {
			'a-form': Form,
			'a-form-item': Form.Item,
			'a-input': Input,
			'a-button': Button,
			'a-select': Select,
			'a-select-option': Select.Option,
			'a-radio': Radio,
			'a-radio-group': Radio.Group,
			'a-radio-button': Radio.Button,
			'a-rate': Rate
		},
		data() {
			return {
				formLayout: 'horizontal',
				rate: 3
			}
		},
		mounted() {
			this.user_id = 1;
		},
		methods: {
			handleSubmit(e) {
				e.preventDefault()
				this.form.validateFields((err, values) => {
					if (!err) {
						console.log('Received values of form: ', values)
					}
				})
			},
			handleChange(value) {
				console.log(`selected ${value}`);
			},
			onChange (e) {
				console.log(`checked = ${e.target.value}`)
			},
			rateChange(value){
				console.log(`rate ${value}`);
			}
		}
	}
</script>

<style scoped>
	.address-box {
		margin-top: 10px;
		padding: 10px;
		background: #fff;
	}


	/* .input-ul { padding: 0 10px; } */

	.input-li {
		position: relative;
		padding: 5px 0;
		justify-content: space-between;
		align-items: center;
	}

	.input-li:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 0;
		border-bottom: 1px solid #e5e5e5;
	}

	.weui-input {
		color: #999;
	}

	.label2 {
		min-width: 50px;
		color: #666;
	}

	.input {
		position: relative;
		width: 100%;
		padding: 0 25px 0 0;
	}

	.input-avatar {
		padding-right: 0;
		text-align: right;
	}

	.submit {
		width: 100%;
		height: 40px;
		border-radius: 3px;
		color: #fff;
		font-size: 14px;
		line-height: 40px;
	}

	.submit {
		background: #FF9500;
	}

	.thumbnail-60 {
		width: 60px;
		height: 60px;
		border-radius: 100%;
		overflow: hidden;
	}


	.phonebtn {
		width: 160px;
		padding: 5px 0;
		background: #FF9500;
		color: #fff;
		font-size: 12px;
	}
</style>