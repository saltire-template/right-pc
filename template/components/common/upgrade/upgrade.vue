<template>
    <div class="upgrade">
        <div class="upgrade_mask"></div>
        <div class="upgrade_wrap">
            <div class="upgrade_content">
                <div class="upgrade_bg">
                    <img
                        class="iterator_img_list"
                        :src="imgurl"
                    />
                    <p class="level_text">{{ level_text }}</p>
                    <div class="upgrade_top">
                        <div class="close_container" @click="close">
                            <div class="close"></div>
                        </div>
                    </div>
                    <p class="position position_left">平台认证标识</p>
                    <p class="position position_center">主流平台免费维权服务</p>
                    <p class="position position_right">
                        每月免费监测文章<span class="size">{{ size }}</span
                        >篇
                    </p>
                    <div class="text_container">
                        <h6>恭喜你升级到{{ level_text }}！</h6>
                        <p>
                            您的当前积分值为<span>【{{ integral }}】</span>
                        </p>
                        <p>您已成功解锁以下权益</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import imglist from './imglist'

export default {
    data() {
        return {
            // 每月监测文章数量
            size: 3,
            // 定时器
            timer: null,
            // 图片列表
            imglist,
            // 图片地址
            imgurl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAAGxCAYAAADIwJIdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFzmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMTEtMDJUMTE6MTU6NTYrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMTEtMDJUMTE6MTU6NTYrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTExLTAyVDExOjE1OjU2KzA4OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI4OGMyMDZhLWIyZDgtNGYxZS05YWY1LTU0ZWNkYWVmMThhMyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmM0ODg1YmU5LWU0MTktZmM0Ny05ZWJkLTM3Yjk4MzIxZTE3NSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmExOThiOWY1LTJkMWEtNGJlZi04ZGQwLTgzNmJkZGM4YjcyNyIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmExOThiOWY1LTJkMWEtNGJlZi04ZGQwLTgzNmJkZGM4YjcyNyIgc3RFdnQ6d2hlbj0iMjAyMC0xMS0wMlQxMToxNTo1NiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4OGMyMDZhLWIyZDgtNGYxZS05YWY1LTU0ZWNkYWVmMThhMyIgc3RFdnQ6d2hlbj0iMjAyMC0xMS0wMlQxMToxNTo1NiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+guYffQAABFtJREFUeJzt07ERwCAQwLCQ/Xd+JuBcQiFN4MZrZj7g7L8dAK8zCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAkEk0AwCQSTQDAJBJNAMAmEDYiXBl/LmlG5AAAAAElFTkSuQmCC',
        };
    },
    computed: {
        integral() {
            return this.$store.state.show_upgrade.score;
        },
        level_text() {
            if (this.integral <= 3499) {
                return "LV1";
            } else if (3500 <= this.integral && this.integral <= 8499) {
                return "LV2";
            } else if (8500 <= this.integral && this.integral <= 14999) {
                return "LV3";
            } else if (15000 <= this.integral && this.integral <= 22999) {
                return "LV4";
            } else if (23000 <= this.integral && this.integral <= 32999) {
                return "LV5";
            } else if (33000 <= this.integral) {
                return "LV6";
            }

            return "LV1";
        },
    },
    methods: {
        // 禁止滑动
        forbiddenScroll() {
            $("body").css("overflow", "hidden");
        },
        // 允许滑动
        enableScroll() {
            $("body").css("overflow", "auto");
        },
        close() {
            this.enableScroll();
            this.$store.commit("SET_SHOW_UPGRADE", {
                show: false,
                score: 0,
            });
        },
        initial_top() {
            let iteratr_count = 0;

            this.timer = setInterval(() => {
                if (iteratr_count < 87) {
                    iteratr_count++;
                } else {
                    clearInterval(this.timer);
                }

                // 动画快结束时，展示等级
                if (iteratr_count === 75) {
                    $(".level_text").css("height", "auto");
                    $(".level_text").css("opacity", 1);
                }

                this.imgurl = this.imglist[iteratr_count - 1]
            }, 30);
        },
    },
    mounted() {
        this.forbiddenScroll();
        this.initial_top();
    },
    created() {
    },
};
</script>
<style scoped lang="less">
.upgrade {
    .upgrade_mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(55, 55, 55, 0.6);
        height: 100%;
        z-index: 1089;
    }
    .upgrade_wrap {
        position: fixed;
        overflow: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1089;
        -webkit-overflow-scrolling: touch;
        outline: 0;
        .upgrade_content {
            width: 633px;
            height: 347px;
            margin: 0 auto;
            position: relative;
            outline: 0;
            top: 26%;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            .upgrade_bg {
                height: 100%;
                background: url("./img/upgrade_bg.png");
                background-size: cover;
                background-repeat: no-repeat;
                position: relative;
                .iterator_img_list {
                    width: 201px;
                    height: 433px;
                    position: absolute;
                    top: -190px;
                    right: 215px;
                    z-index: 1090;
                }
                .upgrade_top {
                    width: 277px;
                    height: 174px;
                    position: absolute;
                    top: -131px;
                    left: 178px;
                    clip: rect(5px, 276px, 174px, 0);
                    background: url("./img/upgrade_gif.gif");
                    .close_container {
                        cursor: pointer;
                        position: absolute;
                        top: 8px;
                        right: 3px;
                        padding: 10px;
                        .close {
                            width: 11px;
                            height: 11px;
                            background-image: url("./img/close.png");
                            background-size: cover;
                        }
                    }
                }
                .level_text {
                    color: #fff;
                    font-weight: 600;
                    font-size: 16px;
                    top: -26px;
                    right: 303px;
                    z-index: 1091;
                    position: absolute;
                    transition: all 0.6s ease-in-out;
                    opacity: 0;
                    height: 0;
                }
                p.position {
                    color: #957159;
                    font-size: 14px;
                    z-index: 1091;
                    font-weight: 700;
                    line-height: 15px;
                    text-align: center;
                    text-shadow: #fff 1px 0 0, #fff 0 1px 0, #fff -1px 0 0,
                        #fff 0 -1px 0;
                }
                .position_left {
                    position: absolute;
                    bottom: 104px;
                    left: 153px;
                    transform: rotate3d(1, 1, 1, 15deg);
                }
                .position_center {
                    width: 90px;
                    position: absolute;
                    bottom: 85px;
                    left: 273px;
                }
                .position_right {
                    position: absolute;
                    width: 90px;
                    bottom: 89px;
                    left: 394px;
                    transform: rotate3d(1, 1, 1, -10deg);
                }
                .text_container {
                    text-align: center;
                    position: relative;
                    top: 55px;
                    h6 {
                        color: #333333;
                        font-size: 20px;
                        font-weight: 500;
                        line-height: 36px;
                    }
                    p {
                        color: #999999;
                        font-size: 14px;
                        line-height: 26px;
                        span {
                            color: #3399ff;
                            font-size: 14ppx;
                        }
                    }
                }
            }
        }
    }
}
</style>