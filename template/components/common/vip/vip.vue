<template>
    <div class="rights-vip-box" v-if="level && $store.state.login">
        <div class="rights-vip-icon"></div>
        <Tooltip :content="pointTip" theme="light">
            <div class="rights-vip-level" @click="to_pointermanage">
                <span class="level-icon" :class="'v' + lv"></span>
                <div class="level-progress">
                    <Progress
                        hide-info
                        :percent="percent"
                        :stroke-width="6"
                        status="active"
                    />
                </div>
            </div>
            <div slot="content">
                <span class="now_score">{{now_score}}</span>
                <span class="next_score">{{next_score}}</span>
            </div>
        </Tooltip>
        <div class="vip-detail" v-show="show">
            <div class="vip-detail-con">
                <div id="vip_number" style="height: 40px"></div>
                <div class="vip-detail-line">/</div>
                <div id="vip_lv" style="height: 40px"></div>
            </div>
            <div class="vip-detail-icon">
                <div class="vip-detail-icon-gray"></div>
                <div class="vip-detail-icon-fff"></div>
            </div>
        </div>
    </div>
</template>

<script>
import "../../../assets/js/numbergd/index.js";

export default {
    name: "rights-vip",
    data() {
        return {
            lv: -1,
            show: false,
            level: false,
            percent: 0,
            // 鼠标悬浮上去时，当前积分提示
            pointTip: "",
            level_list: [
                {
                    max: 3500,
                    min: 0,
                    max_min: 3500,
                },
                {
                    max: 8500,
                    min: 3500,
                    max_min: 5000,
                },
                {
                    max: 15000,
                    min: 8500,
                    max_min: 6500,
                },
                {
                    max: 23000,
                    min: 15000,
                    max_min: 8000,
                },
                {
                    max: 33000,
                    min: 23000,
                    max_min: 10000,
                },
                {
                    max: 99999,
                    min: 33000,
                    max_min: 66999,
                },
            ],
            // 记录位数
            m_digit: 3,
            n_digit: 3,
        };
    },
    computed: {
        status() {
            return this.$store.state.vip_integral;
        },
        status_dispatch() {
            return this.$store.state.vip_integral_dispatch;
        },
    },
    watch: {
        status(nval, oval) {
            let _this = this;
            this.init_level();
        },
        // 当外界传入更改积分需求时，请求获取积分变化项目的接口，响应变化
        status_dispatch() {
            this.dispatch_status();
        },
        m_digit(nval, oval) {},
        n_digit(nval, oval) {},
    },
    methods: {
        // 跳转至会员积分管理页面
        to_pointermanage() {
            window.location.href = this.$baseUrl.$_space + "pointmanage";
        },
        lv_check(num, addNum) {
            let _this = this;
            let nowNumber = num + addNum;
            for (let i = 0; i < this.level_list.length; i++) {
                if (
                    nowNumber >= this.level_list[i].min &&
                    nowNumber < this.level_list[i].max
                ) {
                    this.lv = i;
                    this.percent =
                        ((nowNumber - this.level_list[i].min) /
                            this.level_list[i].max_min) *
                        100;

                    // 位数4-5变化时  初始化dom
                    if (
                        this.check_digit(nowNumber) > this.n_digit &&
                        $("#vip_number").find(".dataNums").length >= 0
                    ) {
                        this.n_digit = this.check_digit(nowNumber);
                        $("#vip_number").html("");
                    }

                    if (
                        this.check_digit(this.level_list[i].max) >
                            this.m_digit &&
                        $("#vip_lv").find(".dataNums").length >= 0
                    ) {
                        this.m_digit = this.check_digit(this.level_list[i].max);
                        $("#vip_lv").html("");
                    }

                    $("#vip_number").rollNum({
                        deVal: nowNumber,
                        digit: _this.check_digit(nowNumber),
                    });
                    $("#vip_lv").rollNum({
                        deVal: _this.level_list[i].max,
                        digit: _this.check_digit(_this.level_list[i].max),
                    });

                    setTimeout(() => {
                        _this.show = false;
                    }, 3000);
                }
            }
        },
        check_digit(number) {
            // 位数
            return (number + "").length;
        },
        init_level() {
            let _this = this;

            this.https.get("/space/integral/num", {}).then((res) => {
                if (!this.$store.state.vip_integral.init) {
                    this.show = true;
                    this.$store.state.vip_integral.arr.forEach((item) => {
                        this.$vipMessage.info({
                            content: item.name,
                            integral: item.add,
                        });
                    });
                    this.$store.state.vip_integral.arr = [];
                }

                if (!res.data) return;

                this.now_score = res.data.integral
                this.next_score = '/' + this.computeMax(res.data.integral) 

                this.level = true;

                const add = this.$store.state.vip_integral.add || 0;

                //
                this.$nextTick(() => {
                    this.lv_check(res.data.integral - add, add);
                });
            });
        },
        // 该方法负责获取上一段时间和当前时间间隔内的积分变化
        async dispatch_status() {
            const url = "/pay/integral/notShowIntegralRecord";

            const res = await this.https.get(url);

            if (res.code == "0014") {
                return;
            }

            if (res.code != "0000") {
                return this.$Message.error(res.msg);
            }

            const list = res.data.list;
            const sum = list.reduce((acc, cur) => {
                return acc + cur.integral;
            }, 0);
            // 上一次的分数
            const lastScore = res.data.integral - sum;
            const first = list[0];

            if (list.length === 1) {
                this.$store.commit("SET_VIP_INTEGRAL", {
                    init: false,
                    arr: [
                        {
                            add: first.integral,
                            name: first.actionMemo,
                        },
                    ],
                });
            } else if (list.length > 1) {
                const arr = list.map((item) => {
                    return {
                        add: item.integral,
                        name: item.actionMemo,
                    };
                });
                this.$store.commit("SET_VIP_INTEGRAL", {
                    arr,
                    init: false,
                });
            }

            this.isLevelUp(lastScore, res.data.integral);
        },
        // 根据变化之前的分数和当前分数判断是否升级，升级则弹出升级弹窗
        isLevelUp(previous, now) {
            const previousLevel = this.computelevel(previous);
            const nowLevel = this.computelevel(now);

            if (nowLevel <= previousLevel) return;

            setTimeout(() => {
                this.$store.commit("SET_SHOW_UPGRADE", {
                    show: true,
                    score: now,
                });
            }, 2000);
        },
        // 计算会员等级
        computelevel(integral) {
            if (integral <= 3499) {
                return 1;
            } else if (3500 <= integral && integral <= 8499) {
                return 2;
            } else if (8500 <= integral && integral <= 14999) {
                return 3;
            } else if (15000 <= integral && integral <= 22999) {
                return 4;
            } else if (23000 <= integral && integral <= 32999) {
                return 5;
            } else if (33000 <= integral) {
                return 6;
            }

            return 1;
        },
        // 计算当前等级的最大值
        computeMax(integral) {
            if (integral <= 3499) {
                return 3500;
            } else if (3500 <= integral && integral <= 8499) {
                return 8500;
            } else if (8500 <= integral && integral <= 14999) {
                return 15000;
            } else if (15000 <= integral && integral <= 22999) {
                return 23000;
            } else if (23000 <= integral && integral <= 32999) {
                return 33000;
            } else if (33000 <= integral) {
                return 99999;
            }

            return 3500;
        },
    },
    mounted() {},
    created() {
        this.init_level();
    },
};
</script>

<style lang="less">
@import "../../../assets/js/numbergd/globle.min.css";

.rights-vip-box {
    height: 61px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .ivu-tooltip-rel {
        top: -7px;
        right: -10px;
    }
    .now_score{
        display: inline-block;
        color: #333333;
        font-size: 13px;
        font-weight: bolder;
    }
    .next_score{
        display: inline-block;
        color: #999999;
        font-weight: bold;
        font-size: 13px;
    }
}
.vip-detail {
    width: auto;
    min-width: 106px;
    height: 40px;
    border: 1px solid #e3e3e3;
    background: #fff;
    box-shadow: 0px 3px 8px 0px rgba(48, 48, 48, 0.2);
    border-radius: 18px;
    position: absolute;
    bottom: -30px;
    left: -5px;
    z-index: 200;
    .vip-detail-con {
        width: 100%;
        height: 40px;
        padding: 0 15px;
        padding-right: 11px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .vip-detail-line {
            margin: 0 2px;
        }
    }
    .vip-detail-icon {
        width: 14px;
        height: 14px;
        background: #fff;
        position: relative;
        left: 50%;
        margin-left: -7px;
        bottom: 52px;
        .vip-detail-icon-gray {
            width: 0;
            height: 0;
            border: 7px solid transparent;
            border-bottom-color: #e3e3e3;
            position: absolute;
            left: 0;
            z-index: 1;
        }
        .vip-detail-icon-fff {
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-bottom-color: #fff;
            position: absolute;
            left: 1px;
            bottom: 0px;
            z-index: 2;
        }
    }
}
.rights-vip-icon {
    width: 21px;
    height: 20px;
    background-size: 21px 20px;
    background-image: url("~@/assets/imges/vip-message/vip.png");
    margin-right: 3px;
}
.rights-vip-level {
    width: 68px;
    height: auto;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    .level-icon {
        display: inline-block;
        width: 32px;
        height: 9px;

        background-size: 32px 9px;
        margin-bottom: 5px;
    }
    .v0 {
        background-image: url("~@/assets/imges/vip-message/lv1.png");
    }
    .v1 {
        background-image: url("~@/assets/imges/vip-message/lv2.png");
    }
    .v2 {
        background-image: url("~@/assets/imges/vip-message/lv3.png");
    }
    .v3 {
        background-image: url("~@/assets/imges/vip-message/lv4.png");
    }
    .v4 {
        background-image: url("~@/assets/imges/vip-message/lv5.png");
    }
    .v5 {
        background-image: url("~@/assets/imges/vip-message/lv6.png");
    }

    .level-progress {
        width: 68px;
        height: 6px;
        line-height: 0;
    }
}
</style>
