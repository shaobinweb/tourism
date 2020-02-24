<template>
	<view class="waterfall-component" :style="{height: height + 'px'}">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			columnCount: {
				type: Number,
				default: 4
			},
		},
		data() {
			return {
				height: 0,
				columnHeight: [],
			}
		},
		provide() {
			return {
				waterfall: this
			}
		},
		created() {
			this.$watch('columnCount', function(){
				let columnHeight = [];
				for (let i = 0; i < this.columnCount; ++i) {
					columnHeight[i] = 0;
				}
				this.columnHeight = columnHeight;
			}, {immediate: true})
		},
		mounted() {
			this.$watch('columnCount', function(){
				this.height = Math.max.apply(null, this.columnHeight);
			}, {immediate: true})
		},
	}
</script>

<style lang="scss" scoped>
.waterfall-component {
	display: flex;
	flex-wrap: wrap;
	position: relative;
	width: 100%;
}
</style>