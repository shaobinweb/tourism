<template>
	<view class="waterfall-item-component" :style="{width: columnWidth, left: left, top: top + 'px'}">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		inject: ['waterfall'],
		data() {
			return {
				top: undefined,
				left: undefined,
				height: undefined
			}
		},
		computed: {
			columnWidth() {
				return `${100 / this.waterfall.columnCount}%`;
			}
		},
		created() {
			this.selector = uni.createSelectorQuery().in(this);
		},
		mounted() {
			this.selector.select('.waterfall-item-component').fields({size: true});
			
			this.$watch('waterfall.columnCount', function(){
				this.selector.exec(data=>{
					let min = Math.min.apply(null, this.waterfall.columnHeight);
					let index = this.waterfall.columnHeight.indexOf(min);
					
					this.top = min;
					this.left = 100 / this.waterfall.columnCount * index + '%';
					
					this.waterfall.columnHeight[index] +=  data[0].height;
					
					this.$emit('output',this.top);
				})
			},{immediate: true})
		}
	}
</script>

<style lang="scss" scoped>
.waterfall-item-component {
	box-sizing: border-box;
	position: absolute;
	// width: 48% !important;
}
</style>