import Notification from '../base/notification';

const prefixCls = 'vip-message';
const iconPrefixCls = 'ivu-icon';
const prefixKey = 'ivu_message_key_';

const defaults = {
    top: 46,
    duration: 4
};

let messageInstance;
let name = 1;

const iconTypes = {
    'info': 'ios-information-circle',
    'success': 'ios-checkmark-circle',
    'warning': 'ios-alert',
    'error': 'ios-close-circle',
    'loading': 'ios-loading'
};

function getMessageInstance () {
    messageInstance = messageInstance || Notification.newInstance({
        prefixCls: prefixCls,
        styles: {
            top: `${defaults.top}px`
        }
    });

    return messageInstance;
}

function notice (content = '', integral = '', type, onClose = function () {}, closable = false, render = function () {}, background = false) {
    const iconType = iconTypes[type];

    // if loading
    const loadCls = type === 'loading' ? ' ivu-load-loop' : '';

    let instance = getMessageInstance();

    instance.notice({
        name: `${prefixKey}${name}`,
        duration: defaults.duration,
        styles: {},
        transitionName: 'move-up',
        content: `
            <div class="${prefixCls}-custom-content ${prefixCls}-${type}">
                恭喜完成【<span>${content}</span>】，获得【<span>${integral}</span>】积分<b></b>
            </div>
        `,
        render: render,
        onClose: onClose,
        closable: closable,
        type: 'message',
        msgType: type,
        background: background
    });

    // 用于手动消除
    return (function () {
        let target = name++;

        return function () {
            instance.remove(`${prefixKey}${target}`);
        };
    })();
}

export default {
    name: 'Message',

    info (options) {
        return this.message('info', options);
    },
    success (options) {
        return this.message('success', options);
    },
    warning (options) {
        return this.message('warning', options);
    },
    error (options) {
        return this.message('error', options);
    },
    loading (options) {
        return this.message('loading', options);
    },
    message(type, options){
        if (typeof options === 'object') {
            options = {
                content: options.content,
				integral: options.integral
            };
        }
        return notice(options.content, options.integral,  type, options.onClose, options.closable, options.render, options.background);
    },
    config (options) {
        if (options.top || options.top === 0) {
            defaults.top = options.top;
        }
        if (options.duration || options.duration === 0) {
            defaults.duration = options.duration;
        }
    },
    destroy () {
        let instance = getMessageInstance();
        messageInstance = null;
        instance.destroy('ivu-message');
    }
};
