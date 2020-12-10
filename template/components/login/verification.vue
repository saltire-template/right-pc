<template>
	<div class="r-item">
		<div class="r-verification" v-if="!isSuccess">
			<div class="r-verification-bg" @click="start">
				点击开始验证
				<img src="~@/components/login/img/code.gif" alt="">
			</div>
		</div>
		<div class="r-verification" v-if="isSuccess">
			<div class="r-success">
				<span></span>
				验证成功
			</div>
		</div>
		<div class="ve-box" v-show="modal">
			<div class="ve-modal">
				<div class="ve-outer">
					<div class="ve-title">请完成安全验证<span @click="close"></span></div>
					<div id="captcha"></div>
				</div>
			</div>
		</div>
	</div>
	<!--  -->
</template>

<script>
	// var $ = require('jquery');
	// 
	// import '~/plugins/verification/lib/jquery/jquery.min.js'
	// import '~/plugins/verification/disk/longbow.slidercaptcha.js'
	// import sliderCaptcha from './disk/longbow.slidercaptcha.js'

	export default {
		name: 'verification',
		data() {
			return {
				modal: false,
				isSuccess: false,
				isVal: false,
				isType: "",
				val: '',
			}
		},
		props: {
			isInput: {
				type: Object
			}
		},
		computed: {
			status() {
				return this.modal
			},
			isIpt() {
				return this.isInput
			}
		},
		watch: {
			status(nval, oval) {
				if (nval) {
					this.draw();
				}
			},
			isIpt: {
				handler(newValue, oldValue) {
					this.val = newValue
				},
				deep: true
			}
		},
		methods: {
			draw() {
				var _this = this
				var $captcha = $('#captcha').sliderCaptcha({
					repeatIcon: 'fa fa-redo',
					setSrc: function() {
						return 'https://rk-secure-base.oss-cn-qingdao.aliyuncs.com/font/image/image' + Math.round(Math.random() * 1400) + '.jpg';
					},
					onSuccess: function() { //成功事件
						var handler = setTimeout(function() {
							window.clearTimeout(handler);
							_this.isSuccess = true;
							_this.modal = false;
							_this.$emit('isOk', true)
							// $captcha.sliderCaptcha('reset');
						}, 500);
					}
				});
			},
			start() {
				if (this.val.value == '') {
					if (this.val.type == 'phone') {
						this.$Message.warning("请填写手机号码");
						return false
					} else if (this.val.type == 'Email') {
						this.$Message.warning("请填写邮箱");
						return false
					}
				} else {
					if (this.val.type == 'phone') {
						if (!this.$utils.checkPhone(this.val.value)) {
							this.$Message.warning('请填写正确的手机号码');
							return false;
						}
					}
					if (this.val.type == 'Email') {
						if (!this.$utils.checkMail(this.val.value)) {
							this.$Message.warning('请填写正确的邮箱地址');
							this.flag = true;
							return false;
						}
					}
					this.modal = true;
				}

			},
			close() {
				this.modal = false;
				// $('#captcha').sliderCaptcha('reset')
			},
		},
		mounted() {

		},
		created() {
				var SliderCaptcha = function(element, options) {
					this.$element = $(element);
					this.options = $.extend({}, SliderCaptcha.DEFAULTS, options);
					this.$element.css({
						'position': 'relative',
						'width': this.options.width + 'px',
						'margin': '0 auto'
					});
					this.init();
				};

				SliderCaptcha.VERSION = '1.0';
				SliderCaptcha.Author = '';
				SliderCaptcha.DEFAULTS = {
					width: 320, // canvas宽度
					height: 160, // canvas高度
					PI: Math.PI,
					sliderL: 42, // 滑块边长
					sliderR: 9, // 滑块半径
					offset: 5, // 容错偏差
					loadingText: '正在加载中...',
					failedText: '再试一次',
					barText: '向右滑动填充拼图',
					repeatIcon: 'fa fa-repeat',
					maxLoadCount: 3,
					localImages: function() {
						return 'images/Pic' + Math.round(Math.random() * 4) + '.jpg';
					},
					verify: function(arr, url) {
						var ret = false;
						$.ajax({
							url: url,
							data: JSON.stringify(arr),
							async: false,
							cache: false,
							type: 'POST',
							contentType: 'application/json',
							dataType: 'json',
							success: function(result) {
								ret = result;
							}
						});
						return ret;
					},
					remoteUrl: null
				};

				function Plugin(option) {
					return this.each(function() {
						var $this = $(this);
						var data = $this.data('lgb.SliderCaptcha');
						var options = typeof option === 'object' && option;

						if (data && !/reset/.test(option)) return;
						if (!data) $this.data('lgb.SliderCaptcha', data = new SliderCaptcha(this, options));
						if (typeof option === 'string') data[option]();
					});
				}

				$.fn.sliderCaptcha = Plugin;
				$.fn.sliderCaptcha.Constructor = SliderCaptcha;

				var _proto = SliderCaptcha.prototype;
				_proto.init = function() {
					this.initDOM();
					this.initImg();
					this.bindEvents();
				};

				_proto.initDOM = function() {
					var createElement = function(tagName, className) {
						var elment = document.createElement(tagName);
						elment.className = className;
						return elment;
					};

					var createCanvas = function(width, height) {
						var canvas = document.createElement('canvas');
						canvas.width = width;
						canvas.height = height;
						return canvas;
					};

					var canvas = createCanvas(this.options.width - 2, this.options.height); // 画布
					var block = canvas.cloneNode(true); // 滑块
					var sliderContainer = createElement('div', 'sliderContainer');
					var refreshIcon = createElement('i', 'refreshIcon ' + this.options.repeatIcon);
					var sliderMask = createElement('div', 'sliderMask');
					var sliderbg = createElement('div', 'sliderbg');
					var slider = createElement('div', 'slider');
					var sliderIcon = createElement('i', 'fa fa-arrow-right sliderIcon');
					var text = createElement('span', 'sliderText');

					block.className = 'block';
					text.innerHTML = this.options.barText;

					var el = this.$element;
					el.append($(canvas));
					el.append($(refreshIcon));
					el.append($(block));
					slider.appendChild(sliderIcon);
					sliderMask.appendChild(slider);
					sliderContainer.appendChild(sliderbg);
					sliderContainer.appendChild(sliderMask);
					sliderContainer.appendChild(text);
					el.append($(sliderContainer));

					var _canvas = {
						canvas: canvas,
						block: block,
						sliderContainer: $(sliderContainer),
						refreshIcon: refreshIcon,
						slider: slider,
						sliderMask: sliderMask,
						sliderIcon: sliderIcon,
						text: $(text),
						canvasCtx: canvas.getContext('2d'),
						blockCtx: block.getContext('2d')
					};

					if ($.isFunction(Object.assign)) {
						Object.assign(this, _canvas);
					} else {
						$.extend(this, _canvas);
					}
				};

				_proto.initImg = function() {
					var that = this;
					var isIE = window.navigator.userAgent.indexOf('Trident') > -1;
					var L = this.options.sliderL + this.options.sliderR * 2 + 3; // 滑块实际边长
					var drawImg = function(ctx, operation) {
						var l = that.options.sliderL;
						var r = that.options.sliderR;
						var PI = that.options.PI;
						var x = that.x;
						var y = that.y;
						ctx.beginPath();
						ctx.moveTo(x, y);
						ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
						ctx.lineTo(x + l, y);
						ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
						ctx.lineTo(x + l, y + l);
						ctx.lineTo(x, y + l);
						ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
						ctx.lineTo(x, y);
						ctx.lineWidth = 2;
						ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
						ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
						ctx.stroke();
						ctx[operation]();
						ctx.globalCompositeOperation = isIE ? 'xor' : 'destination-over';
					};

					var getRandomNumberByRange = function(start, end) {
						return Math.round(Math.random() * (end - start) + start);
					};
					var img = new Image();
					img.crossOrigin = "Anonymous";
					var loadCount = 0;
					img.onload = function() {
						// 随机创建滑块的位置
						that.x = getRandomNumberByRange(L + 10, that.options.width - (L + 10));
						that.y = getRandomNumberByRange(10 + that.options.sliderR * 2, that.options.height - (L + 10));
						drawImg(that.canvasCtx, 'fill');
						drawImg(that.blockCtx, 'clip');

						that.canvasCtx.drawImage(img, 0, 0, that.options.width - 2, that.options.height);
						that.blockCtx.drawImage(img, 0, 0, that.options.width - 2, that.options.height);
						var y = that.y - that.options.sliderR * 2 - 1;
						var ImageData = that.blockCtx.getImageData(that.x - 3, y, L, L);
						that.block.width = L;
						that.blockCtx.putImageData(ImageData, 0, y + 1);
						that.text.text(that.text.attr('data-text'));
					};
					img.onerror = function() {
						loadCount++;
						if (window.location.protocol === 'file:') {
							loadCount = that.options.maxLoadCount;
							console.error("can't load pic resource file from File protocal. Please try http or https");
						}
						if (loadCount >= that.options.maxLoadCount) {
							that.text.text('加载失败').addClass('text-danger');
							return;
						}
						img.src = that.options.localImages();
					};
					img.setSrc = function() {
						var src = '';
						loadCount = 0;
						that.text.removeClass('text-danger');
						if ($.isFunction(that.options.setSrc)) src = that.options.setSrc();
						if (!src || src === '') src = 'https://picsum.photos/' + that.options.width + '/' + that.options.height +
							'/?image=' + Math.round(Math.random() * 20);
						if (isIE) { // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
							var xhr = new XMLHttpRequest();
							xhr.onloadend = function(e) {
								var file = new FileReader(); // FileReader仅支持IE10+
								file.readAsDataURL(e.target.response);
								file.onloadend = function(e) {
									img.src = e.target.result;
								};
							};
							xhr.open('GET', src);
							xhr.responseType = 'blob';
							xhr.send();
						} else img.src = src;
					};
					img.setSrc();
					this.text.attr('data-text', this.options.barText);
					this.text.text(this.options.loadingText);
					this.img = img;
				};

				_proto.clean = function() {
					this.canvasCtx.clearRect(0, 0, this.options.width, this.options.height);
					this.blockCtx.clearRect(0, 0, this.options.width, this.options.height);
					this.block.width = this.options.width;
				};

				_proto.bindEvents = function() {
					var that = this;
					this.$element.on('selectstart', function() {
						return false;
					});

					$(this.refreshIcon).on('click', function() {
						that.text.text(that.options.barText);
						that.reset();
						if ($.isFunction(that.options.onRefresh)) that.options.onRefresh.call(that.$element);
					});

					var originX, originY, trail = [],
						isMouseDown = false;

					var handleDragStart = function(e) {
						if (that.text.hasClass('text-danger')) return;
						originX = e.clientX || e.touches[0].clientX;
						originY = e.clientY || e.touches[0].clientY;
						isMouseDown = true;
					};

					var handleDragMove = function(e) {
						if (!isMouseDown) return false;
						var eventX = e.clientX || e.touches[0].clientX;
						var eventY = e.clientY || e.touches[0].clientY;
						var moveX = eventX - originX;
						var moveY = eventY - originY;
						if (moveX < 0 || moveX + 40 > that.options.width) return false;
						that.slider.style.left = (moveX - 1) + 'px';
						var blockLeft = (that.options.width - 40 - 20) / (that.options.width - 40) * moveX;
						that.block.style.left = blockLeft + 'px';

						that.sliderContainer.addClass('sliderContainer_active');
						that.sliderMask.style.width = (moveX + 4) + 'px';
						trail.push(Math.round(moveY));
					};

					var handleDragEnd = function(e) {
						if (!isMouseDown) return false;
						isMouseDown = false;
						var eventX = e.clientX || e.changedTouches[0].clientX;
						if (eventX === originX) return false;
						that.sliderContainer.removeClass('sliderContainer_active');
						that.trail = trail;
						var data = that.verify();
						if (data.spliced && data.verified) {
							that.sliderContainer.addClass('sliderContainer_success');
							if ($.isFunction(that.options.onSuccess)) that.options.onSuccess.call(that.$element);
						} else {
							that.sliderContainer.addClass('sliderContainer_fail');
							if ($.isFunction(that.options.onFail)) that.options.onFail.call(that.$element);
							setTimeout(function() {
								that.text.text(that.options.failedText);
								that.reset();
							}, 1000);
						}
					};

					this.slider.addEventListener('mousedown', handleDragStart);
					this.slider.addEventListener('touchstart', handleDragStart);
					document.addEventListener('mousemove', handleDragMove);
					document.addEventListener('touchmove', handleDragMove);
					document.addEventListener('mouseup', handleDragEnd);
					document.addEventListener('touchend', handleDragEnd);

					document.addEventListener('mousedown', function() {
						return false;
					});
					document.addEventListener('touchstart', function() {
						return false;
					});
					document.addEventListener('swipe', function() {
						return false;
					});
				};

				_proto.verify = function() {
					var arr = this.trail; // 拖动时y轴的移动距离
					var left = parseInt(this.block.style.left);
					var verified = false;
					if (this.options.remoteUrl !== null) {
						verified = this.options.verify(arr, this.options.remoteUrl);
					} else {
						var sum = function(x, y) {
							return x + y;
						};
						var square = function(x) {
							return x * x;
						};
						var average = arr.reduce(sum) / arr.length;
						var deviations = arr.map(function(x) {
							return x - average;
						});
						var stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
						verified = stddev !== 0;
					}
					return {
						spliced: Math.abs(left - this.x) < this.options.offset,
						verified: verified
					};
				};

				_proto.reset = function() {
					this.sliderContainer.removeClass('sliderContainer_fail sliderContainer_success');
					this.slider.style.left = '2px';
					this.block.style.left = 0;
					this.sliderMask.style.width = 0;
					this.clean();
					this.text.attr('data-text', this.text.text());
					this.text.text(this.options.loadingText);
					this.img.setSrc();
				};
			
		},
		destroyed() {
			this.val = ''
		}
	}
</script>
<style>
	body {
		overflow-x: hidden;
	}

	.ve-modal .block {
		position: absolute;
		left: 0;
		top: 0;
	}

	.ve-modal .sliderContainer {
		position: relative;
		text-align: center;
		line-height: 34px;
		background: #f7f9fa;
		color: #45494c;
		border-radius: 2px;
		margin-top: 10px;
	}

	.ve-modal .sliderbg {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		background-color: #F5F5F5;
		height: 32px;
		border-radius: 2px;
	}

	.ve-modal .sliderContainer_active .slider {
		top: 3px;
		border: 1px solid #1991FA;
		background: #3295FA;
		color: #fff;
	}

	.ve-modal .sliderContainer_active .sliderMask {
		border-width: 1px 0 1px 1px;
	}

	.ve-modal .sliderContainer_success .slider {
		top: 3px;
		background-color: #66CC33 !important;
		color: #fff !important;
	}

	.ve-modal .sliderContainer_success .sliderMask {
		/* border: 1px solid #52CCBA; */
		border-width: 1px 0 1px 1px;
		background-color: rgba(102, 204, 51, 0.2) !important;
	}

	.ve-modal .sliderContainer_success .sliderIcon:before {
		content: "\f00c";
	}

	.ve-modal .sliderContainer_fail .slider {
		top: 3px;
		/* border: 1px solid #f57a7a; */
		background-color: #FF6666 !important;
		color: #fff !important;
	}

	.ve-modal .sliderContainer_fail .sliderMask {
		/* border: 1px solid #f57a7a; */
		border-width: 1px 0 1px 1px;
		background-color: rgba(255, 102, 102, 0.2) !important;
	}

	.ve-modal .sliderContainer_fail .sliderIcon:before {
		content: "\f00d";
	}

	.ve-modal .sliderContainer_active .sliderText,
	.sliderContainer_success .sliderText,
	.sliderContainer_fail .sliderText {
		display: none;
	}

	.ve-modal .sliderMask {
		position: absolute;
		left: 0;
		top: 0;
		height: 34px;
		background: rgba(51, 153, 255, 0.2);
		border-radius: 2px;
	}

	.ve-modal .slider {
		position: absolute;
		top: 3px;
		left: 2px;
		width: 28px;
		height: 28px;
		background: #fff;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
		cursor: pointer;
		transition: background .2s linear;
		border-radius: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #666;
	}

	.ve-modal .slider:hover {
		/* background: #1991FA; */
	}

	.ve-modal .slider:hover .sliderIcon {
		background-position: 0 -13px;
	}

	.ve-modal .sliderText {
		position: relative;
	}

	.ve-modal .sliderIcon {}

	.ve-modal .refreshIcon {
		position: absolute;
		right: 0;
		top: 0;
		cursor: pointer;
		margin: 6px;
		color: rgba(0, 0, 0, .25);
		font-size: 1rem;
		z-index: 5;
		transition: color .3s linear;
	}

	.ve-modal .refreshIcon:hover {
		color: #6c757d;
	}
</style>
<style lang="less" scoped>
	.r-item {
		width: 100%;
		height: 40px;
		display: inline-block;
		padding: 0 26px;
		margin-bottom: 9px;

		.ve-box {
			position: fixed;
			height: 100%;
			width: 100%;
			top: 0;
			left: 0;

			.ve-modal {
				width: 350px;
				height: 312px;
				position: absolute;
				background: #fff;
				z-index: 100;
				top: 30%;
				left: 47%;
				border: 1px solid #e3e3e3;
				box-shadow: 0px 5px 40px 0px rgba(122, 123, 141, 0.28);
				border-radius: 3px;

				.ve-outer {
					width: 100%;
					height: 100%;
					padding: 15px;

					.ve-title {
						font-size: 14px;
						font-family: Source Han Sans CN;
						color: #666666;
						position: relative;
						margin-bottom: 25px;
						line-height: 14px;

						span {
							display: inline-block;
							width: 13px;
							height: 13px;
							position: absolute;
							z-index: 1;
							background-image: url('~@/components/login/img/close.png');
							background-size: 13px 13px;
							right: 0;
							top: 0;
							cursor: pointer;
						}
					}
				}
			}
		}


		input {
			width: 100%;
			height: 40px;
			border: none;
			outline: none;
			padding: 6px;
			font-size: 14px;
			border-bottom: 1px solid #E3E3E3;
		}

		.r-ipt-code {
			width: 50%;
			float: left;
		}

		.r-spn-code {
			display: inline-block;
			width: 50%;
			text-align: right;
			line-height: 27px;
			font-size: 14px;
			height: 100%;
			float: right;
			border-bottom: 1px solid #E3E3E3;
			padding: 6px;

			span {
				display: inline-block;
				width: auto;
				height: auto;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #666666;
				cursor: pointer;
			}
		}

		.r-verification {
			width: 100%;
			height: 100%;
			padding: 0 2px 7px 2px;
			border-bottom: 1px solid #E3E3E3;
			border-radius: 3px;

			.r-success {
				width: 100%;
				height: 100%;
				background-color: rgba(102, 204, 51, 0.1);
				padding: 9px;
				font-size: 14px;
				font-family: Source Han Sans CN;
				color: #66cc33;
				line-height: 14px;

				span {
					display: inline-block;
					width: 14px;
					height: 14px;
					margin-right: 6px;
					background-image: url('~@/components/login/img/complete.png');
					background-size: 14px 14px;
					float: left;
				}
			}

			.r-verification-bg {
				width: 100%;
				height: 100%;
				position: relative;
				display: inline-block;
				background: #F5F5F5;
				cursor: pointer;
				text-align: center;
				line-height: 28px;
				color: #CCCCCC;
				padding: 2px;

				img {
					display: inline-block;
					width: 28px;
					height: 28px;
					background: #fff;
					border-radius: 3px;
					position: absolute;
					left: 2px;
					// background-image: url('');
					// background-size: 28px 28px;
					// background-position: center center;
					// background-repeat: no-repeat;
				}

				// img:hover{
				// 	background-image: url('/resources/copyright/components/login/img/code.gif');
				// }
			}
		}
	}
</style>
