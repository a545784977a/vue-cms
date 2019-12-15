<template>
	<div class="photoinfo-container">
		<h3>{{ photoInfo.title }}</h3>
		<p class="subtitle">
			<span>发表时间:{{ photoInfo.add_time | dateFormat }}</span>
			<span>点击:{{ photoInfo.click }}次</span>
		</p>

			<vue-preview :slides="slide1" @close="handleClose"></vue-preview>

		<div class="content" v-html="photoInfo.content"></div>

		<cmt-box :id="id"></cmt-box>

	</div>
</template>

<script>
	import { Toast } from 'mint-ui';

	import comment from '../subcomponents/comment.vue'

	export default {
		data () {
			return {
				id: this.$route.params.id,
				photoInfo: {},
				slide1 : []
			}
		},

		created () {
			this.getPhotoInfo();
			this.getThumbs();
		},

		methods: {
			// 获取图片详情
			getPhotoInfo () {
				this.$http.get('api/getimageInfo/' + this.id).then(result => {
					if (result.body.status === 0) {
						this.photoInfo = result.body.message[0];
					} else {
						Toast('图片信息获取失败')
					}
				})
			},
			getThumbs () {
			getThumbs () {
				this.$http.get('api/getthumimages/' + this.id).then(result => {
					if (result.body.status === 0) {
						result.body.message.forEach((item, i) => {
							item.msrc = result.body.message[i].src;
							item.w = 600;
							item.h = 400;
						});
						this.slide1 = result.body.message;
					}
				})
			},
			handleClose () {
				console.log('close event')
			}
		},
		components: {
			'cmt-box': comment
		}
	}
</script>

<style lang="scss" scoped>
	.photoinfo-container {
		padding: 3px;
		h3 {
			color: #26A2FF;
			font-size: 15px;
			text-align: center;
			margin: 15px 0;
		}
		.subtitle {
			display: flex;
			justify-content: space-between;
			font-size: 13px;
		}
		.content {
			font-size: 13px;
			line-height: 30px;
		}
		.my-gallery {
			img {
				wight: 100px;
				height: 100px;
			}
		}
	}
</style>