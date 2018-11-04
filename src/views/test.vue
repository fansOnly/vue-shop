<template>
	<div>
		<div :style="{ marginTop:'50px' }">
			<a-checkbox @change="onCheckAllChange" :checked="checkAll">
				Check all
			</a-checkbox>
		</div>
		<br />
		<a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
	</div>
</template>
<script>
	import { Checkbox } from 'ant-design-vue'

	// const plainOptions = ['Apple', 'Pear', 'Orange']
	// const defaultCheckedList = ['Apple', 'Orange']
	export default {
		name: 'test',
		components: {
			'a-checkbox': Checkbox,
			'a-checkbox-group': Checkbox.Group
		},
		data() {
			return {
				checkedList: [],
				indeterminate: true,
				checkAll: false,
				plainOptions: [],
			}
		},
		mounted() {
			// this.plainOptions = ['Apple', 'Pear', 'Orange']
			this.getData();
		},
		methods: {
			onChange(checkedList) {
				// this.indeterminate = !!checkedList.length && (checkedList.length < plainOptions.length)
				this.checkAll = checkedList.length === this.plainOptions.length
			},
			onCheckAllChange(e) {
				Object.assign(this, {
					checkedList: e.target.checked ? this.plainOptions : [],
					// indeterminate: false,
					checkAll: e.target.checked,
				})
			},
			getData(){
				// this.plainOptions = ['Apple', 'Pear', 'Orange']
				this.$api.get('Cart/GetUserCart', {
						user_id: 1
					})
				// this.$api.get('category/index', {})
					.then(res => {
						console.log("getCategory", res);
						this.plainOptions = ['Appl1e', 'Pear1', 'Orange1']
					})
				
			}
		},
	}
</script>