<template>
	<div>
		<div><router-link to="/test/1">go1</router-link></div>
		<div><router-link to="/test/2">go2</router-link></div>
		<div><router-link to="/test/3">go3</router-link></div>
		<div><router-link to="/test/4">go4</router-link></div>
	
		<div v-if="id == 1">111111111111111111111111111111111</div>
		<div v-if="id == 2">222222222222222222</div>
		<div v-if="id == 3">333333333333333333333</div>
		<div v-if="id == 4">44444444444444</div>
	</div>
</template>
<script>
	import { Checkbox } from 'ant-design-vue'

	// const plainOptions = ['Apple', 'Pear', 'Orange']
	// const defaultCheckedList = ['Apple', 'Orange']
	export default {
		name: 'Test',
		components: {
			'a-checkbox': Checkbox,
			'a-checkbox-group': Checkbox.Group
		},
		data() {
			return {
				id: 0
			}
		},
		watch:{
			'$route'(to, from){
				console.log(to)
				console.log(from)
				// this.id = e.params.id;
			}
		},
		mounted() {
			
		},
		methods: {
		},
	}
</script>