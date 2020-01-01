<template>
	<div class="goodslist-container">

		<!-- 小球 -->
		<transition
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter">
			<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>

		<!-- 第一个卡片视图 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :lunbotuList="lunbotu" :isFull="false"></swiper>
				</div>
			</div>
		</div>

		<!-- 商品购买区域 -->
		<div class="mui-card">
			<div class="mui-card-header">{{ goodsInfo.title }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
						市场价:<del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{ goodsInfo.sell_price }}</span>
					</p>
					<p>购买数量:<numbox @getcount="getSelectedCount" :max="goodsInfo.stock_quantity"></numbox></p>
					<p>
						<mt-button type="primary" size="small">立即购买</mt-button>
						<mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>

					</p>
				</div>
			</div>
		</div>

		<!-- 参数区域 -->
		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号:{{ goodsInfo.goods_no }}</p>
					<p>库存情况:{{ goodsInfo.stock_quantity }}</p>
					<p>上架时间:{{ goodsInfo.add_time | dateFormat }}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
				<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
			</div>
		</div>
	</div>

</template>

<script>
	import swiper from '../subcomponents/swiper.vue'
	import numbox from '../subcomponents/goodsinfo_numbox.vue'
	export default {
		data () {
			return {
				id: this.$route.params.id,
				lunbotu: [],
				goodsInfo: {},
				ballFlag: false,
				selectedCount: 1,
			}
		},
		created () {
			this.getLunbotu();
			this.getGoodsInfo();
		},
		methods: {
			getLunbotu () {
				this.$http.get('api/getthumimages/' + this.id).then(result => {
					if (result.body.status === 0) {
						result.body.message.forEach(item => {
							item.img = item.src
						})
						this.lunbotu = result.body.message
					} else {
						console.log('goodsinfo轮播图获取失败...')
					}
				});
			},
			getGoodsInfo () {
				this.$http.get('api/goods/getinfo/' + this.id).then(result => {
					if (result.body.status === 0) {
						this.goodsInfo = result.body.message[0];
					} else {
						console.log('goodsInfo获取失败')
					}
				})
			},
			goDesc (id) {
				this.$router.push('/home/goodsdesc/' + id);
			},
			goComment (id) {
				this.$router.push('/home/goodscomment/' + id);
			},
			addToShopCar () {
				this.ballFlag = !this.ballFlag;
				var goodsinfo = {
					id: this.id,
					count: this.selectedCount,
					price: this.goodsInfo.sell_price,
					selected: true
				}
				this.$store.commit('addToCar', goodsinfo)
			},
			beforeEnter (el) {
				el.style.transform = "translate(0, 0)"
			},
			enter (el, done) {
				el.offsetWidth;

				const ballPosition = this.$refs.ball.getBoundingClientRect();
				const badgePosition = document.getElementById('badge').getBoundingClientRect();

				const xDist = badgePosition.left - ballPosition.left;
				const yDist = badgePosition.top - ballPosition.top;

				el.style.transform = `translate(${xDist}px, ${yDist}px)`
				el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68)'
				done()
			},
			afterEnter (el) {
				this.ballFlag = !this.ballFlag
			},
			getSelectedCount (count) {
				this.selectedCount = count;
			}
		},
		components: {
			swiper,
			numbox
		}
	}
</script>

<style lang="scss" scoped>
	.goodslist-container {
		background-color: #eee;

		.now_price {
			color: red;
			font-size: 16px;
			font-weight: bold;
		}

		.mui-card-footer {
			display: block;

			button {
				margin: 15px 0;
			}
		}

		.ball {
			width: 15px;
			height: 15px;
			background-color: red;
			border-radius: 50%;
			position: absolute;
			top: 390px;
			left: 138px;
			z-index: 99;
		}
	}
</style>