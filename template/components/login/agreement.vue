<template>
	<div>
		<Modal v-model="show" width='600' title="维权骑士用户注册协议" @on-ok="ok" @on-cancel="cancel">
			<div class="con">
				<h3>维权骑士用户注册协议</h3>
				<div class="fathers_box">
					<h4 class="title-2">一、特别提示</h4>
					<p>&emsp;&emsp;欢迎加入维权骑士（RightKnights）！维权骑士（RightKnights）是杭州刀豆网络科技有限公司旗下的一个版权管理和保护平台。</p>
					<p>&emsp;&emsp;<strong>为使用维权骑士（RightKnights）平台及服务，你应当阅读并遵守《维权骑士用户注册协议》（以下简称“本协议”），以及相关协议。请你务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示你注意。</strong></p>
					<p>&emsp;&emsp;<strong>如你是未成年用户，请在法定监护人的陪同下仔细阅读本使用协议，你及法定监护人应按照法律及本协议规定承担责任。</strong></p>
					<h4 class="title-2">二、协议成立及生效</h4>
					<p>&emsp;&emsp;当你勾选“我已阅读并同意《维权骑士用户注册协议》”选项时，即表示你已阅读并同意受本协议的约束。维权骑士（RightKnights）认为你已经仔细阅读并充分理解本协议的全部内容，如果你不认可本协议的任何内容或任何条款的，你应当立即停止注册账号的行为。</p>
					<h4 class="title-2">三、协议范围</h4>
					<p>&emsp;&emsp;本协议不当然构成你与维权骑士（RightKnights）之间的全部权利义务约定，你在开通其他特定服务时需与维权骑士（RightKnights）签署包括但不限于《版权维权协议》、《版权分发协议》等协议或与第三方机构签署其他设定权利义务等协议（如版权保险协议），若签署各协议之间相互冲突的，以后生效的协议为准。<strong>维权骑士（RightKnights）会对本协议随时做任何修改，若你不同意本协议及/或随时对其的修改，你应当立即停止注册和使用维权骑士（RightKnights）的服务。你决定停止使用的，你应及时联系维权骑士（RightKnights）的官方客服，告知你的诉求。</strong></p>
					<h4 class="title-2">四、作者账号的创建与使用</h4>
					<p>&emsp;&emsp;当你提交注册页面后，你即获得了维权骑士（RightKnights）的账号。你的昵称或其他账号信息（包括但不限于头像、简介等）不能含有违法或违背公序良俗的信息。基于现行法律法规及相关规定，维权骑士（RightKnights）的部分服务需要你提供真实、有效的身份信息进行认证，若你无法提供的，维权骑士（RightKnights）将暂时不为你开通相关服务。</p>
					<p>&emsp;&emsp;为保证用户信息的关联性，每一个身份信息仅能对应一个维权骑士（RightKnights）账号，故若你在维权骑士（RightKnights）注册了两个及两个以上的账号，你将无法在你的每个账号下均进行实名认证。你未经过实名认证的账户依然可以开通其他不需进行实名认证的服务。</p>
					<p>&emsp;&emsp;若你发现你的账户未经授权被使用登录维权骑士（RightKnights）或你的账户可能被人盗窃或你的账户出现了被人篡改授权等可疑情况，你可以申请维权骑士（RightKnights）对你的账号采取必要的措施。你理解并认可维权骑士（RightKnights）对你的任何请求采取行动均需要合理时间。<strong>上述维权骑士（RightKnights）采取的行动及其最后的处理结果，除存在故意或重大过失外，维权骑士（RightKnights）不承担任何责任。</strong></p>
					<h4 class="title-2">五、隐私政策</h4>
					<p>&emsp;&emsp;在你使用维权骑士（RightKnights）的过程中，维权骑士会收集你的部分信息，<strong>包括但不限于你在注册本平台账号时提供的信息（如个人姓名、手机号码、身份证信息等）；维权骑士（RightKnights）通过你绑定的自媒体平台所提取到的信息；维权骑士（RightKnights）在提供服务中获得的信息以及其他维权骑士（RightKnights）根据与你的约定可以获得的信息。</strong></p>
					<p>&emsp;&emsp;<strong>维权骑士（RightKnights）向你承诺，你的这些信息不会基于营利目的被出售或出租给第三方，但在以下情况中，维权骑士（RightKnights）可以使用、共享或公开披露你的信息：</strong></p>
					<p>&emsp;&emsp;1.在已经取得你的同意或授权的情况下；</p>
					<p>&emsp;&emsp;2.与公共安全、公共卫生、重大公共利益直接相关的；</p>
					<p>&emsp;&emsp;3.与犯罪侦查、起诉、审判和判决执行等直接相关的；</p>
					<p>&emsp;&emsp;4.出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</p>
					<p>&emsp;&emsp;<strong>5.所使用或公开披露的个人信息是你自行向社会公众公开的（如在平台主页展示你的自媒体平台昵称、头像等信息）；</strong></p>
					<p>&emsp;&emsp;6.从合法公开披露的信息中收集的你的个人信息的，如合法的新闻报道、政府信息公开等渠道；</p>
					<p>&emsp;&emsp;7.根据你的要求签订和履行合同所必需的；</p>
					<p>&emsp;&emsp;8.用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；</p>
					<p>&emsp;&emsp;9.出于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；</p>
					<p>&emsp;&emsp;10.基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露你的个人信息；</p>
					<p>&emsp;&emsp;11.与我们的关联公司共享：你的个人信息可能会与维权骑士（RightKnights）的关联公司共享。我们只会共享必要的个人信息。</p>
					<p>&emsp;&emsp;12.法律法规规定的其他情形。</p>
					<h4 class="title-2">六、通知</h4>
					<p>&emsp;&emsp;维权骑士（RightKnights）会通过站内消息的方式送达各类通知，通知的内容可能对你的权利义务产生重大影响，请你务必及时关注。</p>
					<p>&emsp;&emsp;<strong>你理解并同意，维权骑士（RightKnights）一般仅会通过站内消息的方式向你发送通知或其他各类信息，但不排除在为尽快联系到个别作者用户时会使用其他途径（如电话、微信、电子邮件等）。若你收到非以站内消息送达的通知或其他各类信息，请你务必和维权骑士（RightKnights）官方客服联系确认信息的真实性。维权骑士（RightKnights）对第三人假借“维权骑士（RightKnights）”或“杭州刀豆网络科技有限公司”名义发出的通知或其他各类信息不承担任何责任。</strong></p>
					<h4 class="title-2">七、其他</h4>
					<p>&emsp;&emsp;<strong>你使用本平台即视为你已阅读并同意受本协议的约束。</strong></p>
					<p>&emsp;&emsp;<strong>本协议的签订地为中华人民共和国浙江省杭州市。</strong></p>
					<p>&emsp;&emsp;<strong>若你和维权骑士（RightKnights）之间发生任何纠纷或争议，首先应协商解决；协商不成的，你同意将纠纷或争议提交至本协议签订地有管辖权的人民法院管辖。</strong></p>
					<br>
					<br>
					<p style="text-align: right;"> 杭州刀豆网络科技有限公司</p>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		name: 'agreement',
		props: ['status'],
		data() {
			return {
				show: false,
			}
		},
		computed: {
			open() {
				return this.status
			}
		},
		watch: {
			open(nval, oval) {
				if (nval) {
					this.show = nval
				}

			}
		},
		methods: {
			ok() {
				this.$emit('m', false)
			},
			cancel() {
				this.$emit('m', false)
			}
		},
		mounted() {

		},
		created() {

		},
		destroyed() {

		}
	}
</script>

<style lang="less" scoped>
	.con {
		width: 100%;
		height: auto;
		overflow-y: auto;
		max-height: 500px;
		h3{
			text-align: center;
			margin-bottom: 10px;
		}
		.fathers_box{
			p{
				margin-bottom: 10px;
			}
			.title-2{
				    font-size: 17px;
				    color: #323232;
				    margin: 20px 0 10px 0;
			}
		}
	}
</style>
