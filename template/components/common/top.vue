<template>
    <div id="top" class="top">
        <div class="left">
            <ul class="left-ul">
                <li class="pd-l32">
                    <a :href="$baseUrl.$_home" title="版权保护">
                        <img src="./logo.svg" alt="维权骑士" title="维权骑士" />
                    </a>
                </li>
                <li>
                    <a
                        href="javascript:;"
                        @click="Baohu($event)"
                        :class="{ active: active == 'baohu' }"
                        title="版权保护"
                        >版权保护</a
                    >
                </li>
                <li>
                    <a
                        href="javascript:;"
                        @click="YunYing($event)"
                        :class="{ active: active == 'banquan' }"
                        title="版权运营"
                        >版权运营</a
                    >
                </li>
                <li
                    :class="{ active: active == 'xueyuan' }"
                    @mouseenter="eduValue = 1"
                    @mouseleave="eduValue = -1"
                >
                    <!-- <a :href="$baseUrl.$_edu"  :class="{'active':active == 'xueyuan'}" title="骑士学院">骑士学院</a> -->
                    <span
                        class="check"
                        @click="CollegeGo"
                        :class="{ blue: eduValue == 1 }"
                        ><a :href="$baseUrl.$_edu">骑士学院</a
                        ><b
                            class="se-icon"
                            :class="{ 'se-icon-hover': eduValue == 1 }"
                        ></b
                    ></span>
                    <div class="servers-list" v-show="eduValue == 1">
                        <ul>
                            <li class="servers-list-item"><span></span></li>
                            <li class="servers-list-item">
                                <a :href="$baseUrl.$_edu + 'course/8/'"
                                    >自媒体赚钱课</a
                                >
                            </li>
                            <li class="servers-list-item">
                                <a :href="$baseUrl.$_edu + 'course/1002/'"
                                    >版权知识课</a
                                >
                            </li>
                        </ul>
                    </div>
                </li>
                <li @mouseenter="checkValue = 1" @mouseleave="checkValue = -1">
                    <span class="check" :class="{ blue: checkValue == 1 }"
                        >原创检测<b
                            class="se-icon"
                            :class="{ 'se-icon-hover': checkValue == 1 }"
                        ></b
                    ></span>
                    <div class="servers-list" v-show="checkValue == 1">
                        <ul>
                            <li class="servers-list-item"><span></span></li>
                            <li class="servers-list-item">
                                <a :href="$baseUrl.$_check">文章原创检测</a>
                            </li>
                            <li class="servers-list-item">
                                <a :href="$baseUrl.$_check + 'font/'"
                                    >字体检测</a
                                >
                            </li>
                        </ul>
                    </div>
                </li>
                <li @mouseenter="copyValue = 1" @mouseleave="copyValue = -1">
                    <!-- <a href="javascript:void(0);" @click="BanQuan" title="自助维权">自助维权</a> -->
                    <span class="check" :class="{ blue: copyValue == 1 }"
                        ><a :href="$baseUrl.$_copy">版权助手</a
                        ><b
                            class="se-icon"
                            :class="{ 'se-icon-hover': copyValue == 1 }"
                        ></b
                    ></span>
                    <div class="servers-list" v-show="copyValue == 1">
                        <ul>
                            <li class="servers-list-item"><span></span></li>
                            <li class="servers-list-item">
                                <a :href="$baseUrl.$_copy + 'registration/add/'"
                                    >确权登记</a
                                >
                            </li>
                            <li class="servers-list-item">
                                <a :href="$baseUrl.$_copy + 'copy_right/'"
                                    >著作权登记</a
                                >
                            </li>
                            <li class="servers-list-item">
                                <a :href="$baseUrl.$_copy + 'eleForensics/'"
                                    >侵权取证</a
                                >
                            </li>
                            <li class="servers-list-item">
                                <a :href="$baseUrl.$_copy + 'protection/'"
                                    >维权模板助手</a
                                >
                            </li>
                            <li class="servers-list-item">
                                <a :href="$baseUrl.$_copy + 'monitoring/'"
                                    >短视频监测</a
                                >
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a
                        :href="
                            $baseUrl.$_router +
                            'router?callback=&&returnUrl=' +
                            $baseUrl.$_router +
                            'new_home'
                        "
                        title="版权交易"
                        >版权交易</a
                    >
                </li>
            </ul>
        </div>
        <div class="right">
            <div
                class="servers"
                @mouseover="value = 1"
                @mouseout="value = -1"
                :class="{ bule: value == 1 }"
            >
                <span
                    >服务与支持<b
                        class="se-icon"
                        :class="{ 'se-icon-hover': value == 1 }"
                    ></b
                ></span>
                <div class="servers-list" v-show="value == 1">
                    <ul>
                        <li><span></span></li>
                        <li>
                            <a href="javascript:void(0);" @click="LianMeng"
                                >版权联盟</a
                            >
                        </li>
                        <li>
                            <a :href="$baseUrl.$_home + 'Business/'"
                                >商业合作</a
                            >
                        </li>
                        <li>
                            <a href="javascript:void(0);" @click="BangZhu"
                                >帮助中心</a
                            >
                        </li>
                        <li><a :href="$baseUrl.$_us">关于我们</a></li>
                    </ul>
                </div>
            </div>
            <div
                class="btn btn-bg"
                @click="userLogin"
                v-if="!$store.state.login"
            >
                注册/登录
            </div>
            <!-- <div class="btn name" v-if="$store.state.login"><span v-html="$utils.moreOverText($store.state.authorName)"></span><span class="back" @click="logout">退出</span></div> -->
            <div
                class="btn name"
                v-if="$store.state.login"
                @mouseover="value2 = 1"
                @mouseout="value2 = -1"
            >
                <span class="name-show" v-html="$store.state.authorName"></span
                ><b
                    class="name-icon"
                    :class="{ 'name-icon-hover': value2 == 1 }"
                ></b>
                <div class="name-list" v-show="value2 == 1">
                    <ul>
                        <li><span></span></li>
                        <li>
                            <a href="javascript:void(0);" @click="Person"
                                >个人中心</a
                            >
                        </li>
                        <li>
                            <a href="javascript:void(0);" @click="logout"
                                >退出登录</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
            <div class="line"></div>
            <div class="right-vip">
                <vip />
            </div>
            <div class="whaleip">
                <a
                    href="https://whaleip.com/pages/#/?fromtype=rightknights"
                    target="_blank"
                    el="nofollow"
                    >鲸版权</a
                >
            </div>
        </div>
    </div>
</template>

<script>
import vip from "@/components/common/vip/vip.vue";

export default {
    inject: ["reload"],
    name: "top",
    data() {
        return {
            value: -1,
            value2: -1,
            checkValue: -1,
            eduValue: -1,
            copyValue: -1,
        };
    },
    components: {
        vip,
    },
    props: ["active"],
    methods: {
        userLogin() {
            this.$store.commit("IS_LOGINMODAL", true);
        },
        logout() {
            let obj = {
                ticket: this.$utils.getCookie("ticket"),
            };
            this.https.post("/account/logout", obj).then((res) => {
                if (res.code == "0000") {
                    this.$store.commit("IS_LOGIN", false);
                    this.$Message.success("成功退出");
                    window.localStorage.removeItem("copy_login_flag");
                    if (this.$utils.getCookie("ticket")) {
                        this.$utils.clearCookie("ticket");
                    }
                    this.reload();
                }
            });
        },
        LianMeng() {
            var url = window.location.href;
            window.location.href =
                this.$baseUrl.$_router +
                "router?callback=" +
                url +
                "&&returnUrl=" +
                this.$baseUrl.$_router +
                "right_report";
        },
        BanQuan(val) {
            var url = window.location.href;
            if (val == "add") {
                window.location.href =
                    this.$baseUrl.$_router +
                    "router?callback=" +
                    url +
                    "&&returnUrl=" +
                    this.$baseUrl.$_router +
                    "copy_right#/registration/add";
            } else if (val == "copy") {
                window.location.href =
                    this.$baseUrl.$_router +
                    "router?callback=" +
                    url +
                    "&&returnUrl=" +
                    this.$baseUrl.$_router +
                    "copy_right#/copy_right";
            } else if (val == "ele") {
                window.location.href =
                    this.$baseUrl.$_router +
                    "router?callback=" +
                    url +
                    "&&returnUrl=" +
                    this.$baseUrl.$_router +
                    "copy_right#/eleForensics";
            } else if (val == "pro") {
                window.location.href =
                    this.$baseUrl.$_router +
                    "router?callback=" +
                    url +
                    "&&returnUrl=" +
                    this.$baseUrl.$_router +
                    "copy_right#/protection";
            }
            // window.location.href = this.$baseUrl.$_router+'router?callback='+url+'&&returnUrl='+this.$baseUrl.$_router+'copy_right'
        },
        BangZhu() {
            var url = window.location.href;
            window.location.href =
                this.$baseUrl.$_router +
                "router?callback=" +
                url +
                "&&returnUrl=" +
                this.$baseUrl.$_router +
                "FAQ";
        },
        WoMen() {
            var url = window.location.href;
            window.location.href =
                this.$baseUrl.$_router +
                "router?callback=" +
                url +
                "&&returnUrl=" +
                this.$baseUrl.$_router +
                "about_us";
        },
        JiaoYi() {
            var url = window.location.href;
            window.location.href =
                this.$baseUrl.$_router +
                "router?callback=" +
                url +
                "&&returnUrl=" +
                this.$baseUrl.$_router +
                "new_home";
        },
        Person() {
            if (this.$store.state.login) {
                window.location.href = this.$baseUrl.$_space + "contentManage";
            } else {
                this.$utils.setCookie("type", "management", 1);
                this.$store.commit("IS_LOGINMODAL", true);
            }
        },
        Baohu() {
            if (this.$store.state.login) {
                var url = window.location.href;
                window.location.href =
                    this.$baseUrl.$_space + "rightsProtect/content";
            } else {
                window.location.href = this.$baseUrl.$_home + "Protection/";
            }
        },
        YunYing() {
            if (this.$store.state.login) {
                var url = window.location.href;
                window.location.href = this.$baseUrl.$_space + "contentManage";
            } else {
                window.location.href = this.$baseUrl.$_home + "Operation/";
            }
        },
        CollegeGo() {},
    },
    mounted() {},
};
</script>

<style lang="less" scoped>
.top {
    width: 100%;
    height: 62px;
    // overflow: hidden;
    background: #fff;
    min-width: 1300px;
    line-height: 62px;

    .left {
        width: auto;
        height: 100%;
        float: left;

        .left-ul {
            width: auto;
            height: 62px;
            line-height: 32px;

            @media screen and (max-width: 1280px) {
                li {
                    padding: 15px 15px !important;
                }
            }

            li {
                width: auto;
                height: 62px;
                position: relative;
                cursor: pointer;
                line-height: 32px;
                font-size: 16px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                float: left;
                padding: 15px 23px;

                a {
                    widows: auto;
                    height: 100%;
                    color: rgba(51, 51, 51, 1);

                    img {
                        width: 100px;
                        height: 32px;
                    }
                }
                a:hover {
                    color: #3399ff;
                }
                .check {
                    .se-icon {
                        display: inline-block;
                        width: 10px;
                        height: 6px;
                        background-image: url("./icon.png");
                        background-repeat: no-repeat;
                        background-size: 10px 6px;
                        vertical-align: middle;
                        margin-bottom: 3px;
                        margin-left: 10px;
                        transform: rotate(180deg);
                        -webkit-transform: rotate(180deg);
                        -moz-transform: rotate(180deg);
                        -ms-transform: rotate(180deg);
                        -o-transform: rotate(180deg);
                    }
                    .se-icon-hover {
                        transform-origin: center center; //旋转中心要是正中间 才行
                        transform: rotate(360deg);
                        -webkit-transform: rotate(360deg);
                        -moz-transform: rotate(360deg);
                        -ms-transform: rotate(360deg);
                        -o-transform: rotate(360deg);
                        transition: transform 0.2s; //过度时间 可调
                        -moz-transition: -moz-transform 0.2s;
                        -moz-transition: -moz-transform 0.2s;
                        -o-transition: -o-transform 0.2s;
                        -ms-transition: -ms-transform 0.2s;
                    }
                }
                .blue {
                    color: #3399ff;
                }
                .check:hover {
                    color: #3399ff;
                }
                .servers-list {
                    width: 144px;
                    height: auto;
                    position: absolute;
                    top: 61px;
                    left: -15px;
                    background: #fff;
                    z-index: 100;
                    border: 1px solid rgba(227, 227, 227, 1);
                    border-top: 2px solid #3399ff;
                    box-shadow: 0px 2px 12px 0px rgba(50, 50, 50, 0.1);
                    border-radius: 0px 0px 3px 3px;
                    font-size: 16px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 1);
                    padding-bottom: 10px;

                    .servers-list-item {
                        width: 100%;
                        height: 34px;
                        line-height: 34px;
                        padding: 0 14px;
                        text-align: center;
                        position: relative;
                        cursor: pointer;

                        a {
                            color: rgba(102, 102, 102, 1);
                        }

                        span {
                            display: inline-block;
                            width: 10px;
                            height: 6px;
                            background-image: url("./icon.png");
                            background-repeat: no-repeat;
                            background-size: 10px 6px;
                            position: absolute;
                            top: -7px;
                            left: 50%;
                            margin-left: -5px;
                        }
                    }

                    .servers-list-item:nth-child(1) {
                        height: 9px;
                    }

                    .servers-list-item:hover a {
                        color: #3399ff;
                    }
                }
                .active {
                    color: #3399ff;
                }
            }

            .servers-list-item:hover a {
                color: #3399ff;
            }

            .pd-l32 {
                padding-left: 32px;
            }
        }
    }

    .right {
        width: auto;
        height: 100%;
        float: right;

        // padding: 13px 0;
        .servers {
            width: auto;
            height: 100%;
            display: inline-block;
            line-height: 62px;
            float: left;
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            position: relative;
            color: #333333;
            cursor: pointer;
            margin-right: 34px;

            .servers-list {
                width: 144px;
                min-height: 124px;
                height: auto;
                position: absolute;
                top: 62px;
                left: -27px;
                background: #fff;
                z-index: 100;
                border: 1px solid rgba(227, 227, 227, 1);
                border-top: 2px solid #3399ff;
                box-shadow: 0px 2px 12px 0px rgba(50, 50, 50, 0.1);
                border-radius: 0px 0px 3px 3px;
                font-size: 16px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                padding-bottom: 10px;

                li {
                    width: 100%;
                    height: 34px;
                    line-height: 34px;
                    padding: 0 24px;
                    position: relative;
                    cursor: pointer;

                    a {
                        color: rgba(102, 102, 102, 1);
                    }

                    span {
                        display: inline-block;
                        width: 10px;
                        height: 6px;
                        background-image: url("./icon.png");
                        background-repeat: no-repeat;
                        background-size: 10px 6px;
                        position: absolute;
                        top: -7px;
                        left: 50%;
                        margin-left: -5px;
                    }
                }

                li:nth-child(1) {
                    height: 9px;
                }

                li:hover a {
                    color: #3399ff;
                }
            }

            .se-icon {
                display: inline-block;
                width: 10px;
                height: 6px;
                background-image: url("./icon.png");
                background-repeat: no-repeat;
                background-size: 10px 6px;
                vertical-align: middle;
                margin-bottom: 3px;
                margin-left: 10px;
                transform: rotate(180deg);
                -webkit-transform: rotate(180deg);
                -moz-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                -o-transform: rotate(180deg);
            }

            .se-icon-hover {
                transform-origin: center center; //旋转中心要是正中间 才行
                transform: rotate(360deg);
                -webkit-transform: rotate(360deg);
                -moz-transform: rotate(360deg);
                -ms-transform: rotate(360deg);
                -o-transform: rotate(360deg);
                transition: transform 0.2s; //过度时间 可调
                -moz-transition: -moz-transform 0.2s;
                -moz-transition: -moz-transform 0.2s;
                -o-transition: -o-transform 0.2s;
                -ms-transition: -ms-transform 0.2s;
            }
        }

        .bule {
            color: #3399ff;
        }

        .btn {
            width: 124px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            -webkit-text-overflow: ellipsis;
            -moz-text-overflow: ellipsis;
            white-space: nowrap;
            float: left;
            font-size: 16px;
            padding: 13px 0;
        }

        .name {
            width: auto;
            position: relative;
            height: auto;
            .back {
                margin-left: 15px;
                cursor: pointer;
            }
            .name-show {
                display: inline-block;
                width: 100px;
                height: auto;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                vertical-align: top;
            }
            .name-icon {
                display: inline-block;
                width: 10px;
                height: 6px;
                background-image: url("./icon.png");
                background-repeat: no-repeat;
                background-size: 10px 6px;
                vertical-align: middle;
                margin-bottom: 3px;
                margin-left: 10px;
                transform: rotate(180deg);
                -webkit-transform: rotate(180deg);
                -moz-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                -o-transform: rotate(180deg);
            }
            .name-icon-hover {
                transform-origin: center center; //旋转中心要是正中间 才行
                transform: rotate(360deg);
                -webkit-transform: rotate(360deg);
                -moz-transform: rotate(360deg);
                -ms-transform: rotate(360deg);
                -o-transform: rotate(360deg);
                transition: transform 0.2s; //过度时间 可调
                -moz-transition: -moz-transform 0.2s;
                -moz-transition: -moz-transform 0.2s;
                -o-transition: -o-transform 0.2s;
                -ms-transition: -ms-transform 0.2s;
            }
            .name-list {
                width: 144px;
                height: auto;
                position: absolute;
                top: 60px;
                left: -5px;
                background: #fff;
                z-index: 100;
                border: 1px solid rgba(227, 227, 227, 1);
                border-top: 2px solid #3399ff;
                box-shadow: 0px 2px 12px 0px rgba(50, 50, 50, 0.1);
                border-radius: 0px 0px 3px 3px;
                font-size: 16px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);

                li {
                    width: 100%;
                    height: 34px;
                    line-height: 34px;
                    padding: 0 24px;
                    position: relative;
                    cursor: pointer;

                    a {
                        color: rgba(102, 102, 102, 1);
                    }

                    span {
                        display: inline-block;
                        width: 10px;
                        height: 6px;
                        background-image: url("./icon.png");
                        background-repeat: no-repeat;
                        background-size: 10px 6px;
                        position: absolute;
                        top: -7px;
                        left: 50%;
                        margin-left: -5px;
                    }
                }

                li:nth-child(1) {
                    height: 9px;
                }

                li:hover a {
                    color: #3399ff;
                }
                li:last-child {
                    margin-bottom: 8px;
                }
            }
        }

        .btn-bg {
            background: rgba(51, 153, 255, 1);
            border-radius: 18px;
            color: rgba(255, 255, 255, 1);
            cursor: pointer;
            padding: 0;
            margin: 13px 0;
        }

        .line {
            width: 1px;
            height: 23px;
            background: rgba(204, 204, 204, 1);
            margin: 21px 20px;
            float: left;
        }

        .right-vip {
            display: inline-block;
            margin-right: 30px;
            float: left;
        }

        .whaleip {
            width: auto;
            height: 100%;
            float: left;
            padding: 13px 0;
            padding-right: 32px;

            a {
                display: inherit;
                font-size: 16px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #333333;
                opacity: 0.8;
                width: 100%;
                height: 100%;
                line-height: 36px;
            }
        }
    }
}
</style>
