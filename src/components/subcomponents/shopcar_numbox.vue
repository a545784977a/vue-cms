<template>
	<div class="mui-numbox" data-numbox-min='1' style="height:25px;width:110px;">
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly />
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js'
	export default {
		props: ["initcount", "goodsId"],
		mounted () {
			mui(".mui-numbox").numbox();
		},
		methods: {
			countChanged () {
				this.$store.commit("updateGoodsInfo", {
					id: this.goodsId,
					count: this.$refs.numbox.value
				})
			}
		},
	}
</script>

<style lang="scss">
</style>