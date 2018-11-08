<template>
	<div class="address-box">
		<a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
			<a-form-item label='Note' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="note"
			 :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your note!' }]}">
				<a-input />
			</a-form-item>
		</a-form>
	</div>
</template>

<script>
	import {
		Form
	} from 'ant-design-vue'

	export default {
		name: 'userinfo',
		components: {
			'a-form': Form
		},
		data() {
			return {
				avatar: '',
				name: '',
				phone: ''
			}
		},
		mounted() {
			console.log(this.$route)
		},
		methods: {
			handleSubmit() {},
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